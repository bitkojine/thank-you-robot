const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../dist/i18n.js'),'utf8');
const box={window:{},document:{documentElement:{},querySelector:()=>null,addEventListener(){},dispatchEvent(){}},localStorage:{getItem:()=> 'lt',setItem(){}},CustomEvent:class{}};
vm.createContext(box);
vm.runInContext(source.replace('window.RobotI18n={','window.catalog=data;window.RobotI18n={'),box);
const {en,lt}=box.window.catalog;
function check(a,b,p=''){
 assert.deepEqual(Object.keys(b).sort(),Object.keys(a).sort(),'Missing translation at '+p);
 for(const k of Object.keys(a)){if(a[k]&&typeof a[k]==='object')check(a[k],b[k],p+'.'+k);else{assert.equal(typeof b[k],'string');assert(b[k].length);assert.deepEqual(a[k].match(/\{\w+\}/g)||[],b[k].match(/\{\w+\}/g)||[],'Placeholder mismatch '+k);}}
}
check(en,lt);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist/releases.js'),'utf8'),box);
for(const r of box.window.RobotRelease.entries){assert(r.lt?.title);assert.equal(r.changes.length,r.lt.changes.length);assert(r.lt.changes.every(Boolean));}
assert.equal(box.document.documentElement.lang,'lt');assert.equal(box.document.title,'Ačiū, robote');
console.log('PASS: complete dictionary/scene shape, interpolation placeholders, every release translation, Lithuanian document metadata');
