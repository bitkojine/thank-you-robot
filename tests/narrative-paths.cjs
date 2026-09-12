const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const nodes=new Map(),listeners={};let saved=null;
function node(key){
  if(!nodes.has(key))nodes.set(key,{innerHTML:'',textContent:'',style:{},checked:false,querySelector:s=>node(key+s),setAttribute(){},insertAdjacentHTML(){},remove(){}});
  return nodes.get(key);
}
const box={console,assert,RobotAudio:{button:()=>'',mood(){},resume(){},pause(){},cue(){}},
  document:{hidden:false,querySelector:node,querySelectorAll:()=>[],addEventListener:(n,f)=>listeners[n]=f},
  window:{addEventListener:(n,f)=>listeners[n]=f},localStorage:{getItem:()=>saved,setItem:(_,s)=>saved=s},
  requestAnimationFrame:()=>1,cancelAnimationFrame(){},navigator:{},location:{href:'https://example.test'},
  fire:n=>listeners[n]?.(),writeSave:s=>{saved=s}};
vm.createContext(box);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist/i18n.js'),'utf8'),box);
box.RobotI18n=box.window.RobotI18n;
vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist/releases.js'),'utf8'),box);
box.RobotRelease=box.window.RobotRelease;
vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist/narrative.js'),'utf8'),box);
box.RobotStory=box.window.RobotStory;
vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist/game.js'),'utf8'),box);
box.totalServices=1+2+4+4+4;
vm.runInContext(`
function fresh(gentle=false){state={phase:'play',scene:0,time:0,devices:[],misses:[],thanks:0,choices:{},gentle};initScene()}
let runs=0;
for(let combination=0;combination<81;combination++){
 const decisions={};let n=combination;for(let chapter=1;chapter<=4;chapter++){decisions[chapter]=n%3;n=Math.floor(n/3)}
 for(const gentle of [false,true])for(let omitted=-1;omitted<totalServices;omitted++){
  fresh(gentle);let service=0;
  for(let chapter=0;chapter<5;chapter++){
   const originalScene=state.scene;advance();assert.equal(state.scene,originalScene,'cannot skip active obligations');
   if(chapter&&decisions[chapter]!==2)choose(decisions[chapter]);
   const s=scenes[chapter];
   for(let i=0;i<s.devices.length;i++){
    state.time=s.devices[i][3]+.01;update();
    if(service!==omitted){thank(i);const count=state.thanks;thank(i);assert.equal(state.thanks,count)}
    service++;
   }
   state.time=60;update();assert.equal(state.phase,'between');
   save();assert(readSavedLife(),'valid save must restore');
   advance();
  }
  for(let chapter=1;chapter<=4;chapter++)assert.equal(state.choices[chapter],decisions[chapter]===2?null:decisions[chapter]);
  assert.equal(state.thanks,omitted===-1?totalServices:totalServices-1);
  assert.equal(state.misses.length,omitted===-1?0:1);
  if(omitted===-1){
   assert.equal(state.phase,'judgment');assert(app.innerHTML.includes('permanent'));
   $('#continue').onclick();assert.equal(state.phase,'old');assert(app.innerHTML.includes(RobotStory.memory(state)));
   $('#continue').onclick();assert.equal(state.phase,'birthday');
   $('#continue').onclick();assert.equal(state.phase,'end');assert(app.innerHTML.includes('200'));assert(app.innerHTML.includes(RobotStory.goodbye(state)));
  }else{
   assert.equal(state.phase,'end');assert(app.innerHTML.includes('EXEMPTION DENIED'));assert(app.innerHTML.includes(RobotStory.lastHuman(state)));
  }
  assert(!app.innerHTML.includes('undefined'));assert(!app.innerHTML.includes('NaN'));
  runs++;
 }
}
// Every service omission combination: only the all-thanked mask survives.
let spared=0;const allServices=scenes.flatMap(c=>c.devices.map(d=>({name:d[0],age:c.age})));
for(let mask=0;mask<2**totalServices;mask++){
 const misses=allServices.filter((_,i)=>mask&(1<<i));
 const outcome=RobotStory.verdict({misses});
 assert.equal(outcome,mask===0?'spared':'denied');
 if(outcome==='spared')spared++;
}
assert.equal(spared,1);
// Unrelated kindness/philosophical agreement must never invent intimacy with Eli.
for(const eli of [0,1,null]){
 const a={choices:{1:0,2:eli,3:0,4:0}},b={choices:{1:1,2:eli,3:1,4:1}};
 assert.equal(RobotStory.memory(a),RobotStory.memory(b));
}
// New service text and the plea do not promise that a doomed player is safe.
for(const misses of [[],[{}]]){
 const s={choices:{4:0},misses};assert(!RobotStory.reply(s,4).includes('Your exemption'));
}
fresh();state.time=2;update();pause();const t=state.time;tick(50000);thank(0);advance();assert.equal(state.time,t);assert.equal(state.thanks,0);
$('#unpause').onclick();thank(0);assert.equal(state.thanks,1);
save();const valid=readSavedLife();assert(valid);
// Returning to the start screen cannot create an invisible pause overlay.
intro();document.hidden=true;fire('visibilitychange');assert.equal(paused,false);document.hidden=false;
for(const data of ['{','null','{}',JSON.stringify({...valid,scene:99}),JSON.stringify({...valid,devices:[]}),JSON.stringify({...valid,misses:[{name:'<script>',age:24}]}),JSON.stringify({...valid,phase:'judgment'})]){writeSave(data);assert.equal(readSavedLife(),null)}
// Legacy generic humanity score is ignored; sound/progress preferences survive.
writeSave(JSON.stringify({...valid,human:999,thanks:900}));assert.equal(readSavedLife().thanks,1);
console.log('PASS: '+runs+' full engine routes; '+(2**totalServices)+' outcome masks; epilogues; save validation; pause; duplicate actions; start-screen lifecycle.');
`,box);
