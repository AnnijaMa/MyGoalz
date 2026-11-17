// node build.js <questions.json from extract.js> <out questions.js>
// Applies fixes.json (corrections checked against the official VMD file) and
// sections.json (official VMD topic of each question).
const fs = require('fs'), path = require('path');
const d = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).questions;
const fixes = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixes.json'), 'utf8'));
const secOf = JSON.parse(fs.readFileSync(path.join(__dirname, 'sections.json'), 'utf8'));
const missing = new Set(['meza_zoss_m.jpg', 'stirna_reals.jpg']);
const hideFemale = new Set([719, 728, 730, 732, 733, 734, 738, 742, 743, 744, 748]);
const clean = s => String(s).replace(/\s+/g, ' ').trim();
const SECTIONS = [];
const secIdx = s => { if (!s) return undefined; s = clean(s); let i = SECTIONS.indexOf(s); if (i < 0) { SECTIONS.push(s); i = SECTIONS.length - 1; } return i; };

const out = [];
for (const q of d) {
  let opts = q.options.map(clean);
  let ans = typeof q.answer === 'number' ? opts[q.answer] : clean(q.answer);
  const pics = [];
  const add = (p, l, after) => { if (!p) return; const f = p.replace(/^img\//, ''); if (missing.has(f)) return; pics.push(after ? [f, l, 1] : [f, l]); };
  add(q.imageTrack, 'Pēdas'); add(q.imageScat, 'Izkārnījumi'); add(q.imageReal, 'Dzīvnieks', true);
  add(q.imageMale, 'Tēviņš ♂'); add(q.imageFemale, hideFemale.has(q.id) ? '' : 'Mātīte ♀');
  const pic = pics.length > 0;
  let text = clean(q.question), note;
  const f = !pic && fixes.fix[q.id];
  if (f) {
    const oldAns = ans, oldIdx = opts.indexOf(ans);
    if (f.q) text = f.q;
    if (f.o) { opts = f.o.map(clean); if (!f.a) ans = opts[oldIdx]; }
    if (f.a) ans = clean(f.a);
    if (f.note) note = f.note;
    if (ans !== oldAns && !f.o) {} // answer changed
  }
  const a = opts.indexOf(ans);
  if (a < 0) throw new Error('bad answer ' + q.id);
  const o = { u: (pic ? 'p' : 'q') + q.id, n: q.id, q: text, o: opts, a };
  if (pic) o.i = pics;
  if (!pic) o.s = secIdx(secOf[q.id]);
  if (note) o.x = note;
  out.push(o);
}
for (const x of fixes.add) {
  const o = { u: 'q' + x.n, n: x.n, q: x.q, o: x.o, a: x.o.indexOf(x.a), s: secIdx(x.sec), x: x.note };
  if (o.a < 0) throw new Error('bad add ' + x.n);
  const at = out.findIndex(q => q.u === 'q' + x.after);
  out.splice(at + 1, 0, o);
}
const pics = out.filter(q => q.i), text = out.filter(q => !q.i);
const all = text.concat(pics);
if (new Set(all.map(q => q.u)).size !== all.length) throw new Error('duplicate ids');
fs.writeFileSync(process.argv[3],
  '// Mednieku eksāmena jautājumi (VMD), avots: medības.lv, labojumi: tools/fixes.json\n' +
  'window.SECTIONS=' + JSON.stringify(SECTIONS) + ';\n' +
  'window.QUESTIONS=' + JSON.stringify(all) + ';\n');
console.log(all.length, 'questions,', pics.length, 'picture,', all.filter(q => q.x).length, 'with notes,', SECTIONS.length, 'sections');
