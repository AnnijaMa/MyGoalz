const fs=require('fs');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8')).questions;
const missing=new Set(['meza_zoss_m.jpg','stirna_reals.jpg']);
const hideFemale=new Set([719,728,730,732,733,734,738,742,743,744,748]);
const clean=s=>String(s).replace(/\s+/g,' ').trim();
const out=[];
for(const q of d){
  const opts=q.options.map(clean);
  const a=typeof q.answer==='number'?q.answer:opts.indexOf(clean(q.answer));
  if(a<0||a>=opts.length) throw new Error('bad '+q.id);
  const pics=[];
  const add=(p,l,after)=>{ if(!p) return; const f=p.replace(/^img\//,''); if(missing.has(f)) return; pics.push(after?[f,l,1]:[f,l]); };
  add(q.imageTrack,'Pēdas'); add(q.imageScat,'Izkārnījumi'); add(q.imageReal,'Dzīvnieks',true);
  add(q.imageMale,'Tēviņš ♂'); add(q.imageFemale,hideFemale.has(q.id)?'':'Mātīte ♀');
  const pic=pics.length>0;
  const o={u:(pic?'p':'q')+q.id,n:q.id,q:clean(q.question),o:opts,a};
  if(pic) o.i=pics;
  out.push(o);
}
out.sort((x,y)=>(x.u[0]===y.u[0]?x.n-y.n:(x.u[0]==='q'?-1:1)));
fs.writeFileSync(process.argv[3],'// Mednieku eksāmena jautājumi (VMD), avots: medības.lv\nwindow.QUESTIONS='+JSON.stringify(out)+';\n');
console.log(out.length, out.filter(x=>x.i).length, new Set(out.map(x=>x.u)).size);
