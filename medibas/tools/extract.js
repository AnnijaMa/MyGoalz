const fs=require('fs'),vm=require('vm');
const src=fs.readFileSync(process.argv[2],'utf8');
function grab(name){
  const i=src.indexOf('const '+name+' = [');
  let j=src.indexOf('[',i),d=0,k=j,inS=null;
  for(;k<src.length;k++){const c=src[k];
    if(inS){ if(c==='\\'){k++;continue;} if(c===inS) inS=null; continue;}
    if(c==='"'||c==="'"||c==='`'){inS=c;continue;}
    if(c==='/'&&src[k+1]==='/'){k=src.indexOf('\n',k);continue;}
    if(c==='[')d++; else if(c===']'){d--; if(!d)break;}}
  return vm.runInNewContext('('+src.slice(j,k+1)+')',{}, {timeout:1000});
}
const q=grab('allQuestions'), g=grab('images');
fs.writeFileSync(process.argv[3],JSON.stringify({questions:q,gallery:g},null,1));
console.log(q.length,g.length);
const keys={};q.forEach(x=>Object.keys(x).forEach(k=>keys[k]=(keys[k]||0)+1));console.log(keys);
console.log(JSON.stringify(g.slice(0,3)));
const ids=q.map(x=>x.id);console.log('min',Math.min(...ids),'max',Math.max(...ids),'dupes',ids.length-new Set(ids).size);
const oc={};q.forEach(x=>oc[x.options.length]=(oc[x.options.length]||0)+1);console.log(oc);
console.log(JSON.stringify(q.filter(x=>x.image).slice(0,3)));
