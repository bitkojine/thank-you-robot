/* Original procedural score: a small four-note memory, gradually left alone. */
(() => {
  'use strict';
  let ctx, master, music, effects, reverb, timer, enabled=false, blocked=false;
  let mood='intro', step=0, next=0, generation=0, failed=false;
  const voices=new Set(), envelopes=new Set();
  const scores={
    intro:{bpm:64,chords:[[50,57,61,66],[47,54,59,62],[43,50,57,59],[45,52,57,61]],melody:[74,null,69,73,null,66,69,null],pad:.035},
    0:{bpm:72,chords:[[50,57,61,66],[43,50,57,59],[47,54,59,62],[45,52,57,61]],melody:[74,null,69,73,null,66,69,null],pad:.03},
    1:{bpm:76,chords:[[47,54,59,62],[43,50,57,59],[50,57,61,66],[45,52,57,61]],melody:[74,null,69,73,null,66,69,null],pad:.035},
    2:{bpm:62,chords:[[47,54,59,62],[43,50,54,59],[40,47,54,55],[45,52,59,61]],melody:[74,null,null,73,null,66,69,null],pad:.042},
    3:{bpm:66,chords:[[47,54,60,62],[43,50,54,61],[40,47,53,59],[45,52,58,61]],melody:[74,null,null,73,null,65,null,null],pad:.04,pulse:true},
    4:{bpm:58,chords:[[35,47,54,60],[31,43,50,54],[28,40,47,53],[35,47,54,60]],melody:[74,null,null,null,73,null,null,null],pad:.045,pulse:true},
    judgment:{bpm:48,chords:[[47,54,59,62],[43,50,54,59]],melody:[74,null,null,null,69,null,null,null],pad:.025},
    old:{bpm:52,chords:[[50,57,61,66],[47,54,59,62],[43,50,57,59],[45,52,57,61]],melody:[74,null,null,73,null,null,69,null],pad:.018},
    birthday:{bpm:44,chords:[[50,57,61,66],[43,50,57,59]],melody:[74,null,null,null,73,null,null,null],pad:0},
    won:{bpm:44,chords:[[50,57,61,66],[47,54,59,62]],melody:[74,null,null,null,null,null,69,null],pad:.009},
    lost:{bpm:44,chords:[[47,54,59,62],[40,47,54,55]],melody:[71,null,null,null,null,null,66,null],pad:.018}
  };
  const hz=n=>440*Math.pow(2,(n-69)/12);
  function setup(){
    if(ctx)return;
    const Audio=window.AudioContext||window.webkitAudioContext;
    if(!Audio)throw new Error('Audio unavailable');
    ctx=new Audio();master=ctx.createGain();master.gain.value=0;
    const limiter=ctx.createDynamicsCompressor();limiter.threshold.value=-18;limiter.knee.value=18;limiter.ratio.value=5;limiter.attack.value=.008;limiter.release.value=.3;
    master.connect(limiter);limiter.connect(ctx.destination);
    music=ctx.createGain();music.gain.value=.7;music.connect(master);
    effects=ctx.createGain();effects.gain.value=.55;effects.connect(master);
    reverb=ctx.createConvolver();const length=Math.floor(ctx.sampleRate*2.5),ir=ctx.createBuffer(2,length,ctx.sampleRate);
    let seed=17;for(let c=0;c<2;c++){let data=ir.getChannelData(c);for(let i=0;i<length;i++){seed=(seed*16807)%2147483647;data[i]=(seed/1073741823.5-1)*Math.pow(1-i/length,3)*.35;}}
    reverb.buffer=ir;const wet=ctx.createGain();wet.gain.value=.3;reverb.connect(wet);wet.connect(master);
  }
  function note(n,at,duration,volume,kind='key',bus=music){
    if(!ctx||!enabled||blocked||document.hidden)return;
    const amp=ctx.createGain();envelopes.add(amp);amp.gain.setValueAtTime(0,at);
    const attack=kind==='pad'?.7:.012;
    amp.gain.linearRampToValueAtTime(volume,at+attack);
    amp.gain.exponentialRampToValueAtTime(.0001,at+duration);
    amp.connect(bus);if(kind!=='cue')amp.connect(reverb);
    const partials=kind==='key'?[[1,1],[2,.18],[3,.045]]:[[1,1]];
    partials.forEach(([ratio,level])=>{
      const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=hz(n)*ratio;g.gain.value=level;o.connect(g);g.connect(amp);voices.add(o);
      o.onended=()=>{voices.delete(o);o.disconnect();g.disconnect();if(!amp.numberOfInputs)amp.disconnect()};o.start(at);o.stop(at+duration+.05);
    });
    // Disconnect the envelope after its final source ends, without retaining timers.
    const tail=ctx.createConstantSource();tail.offset.value=0;tail.connect(amp);tail.onended=()=>{tail.disconnect();amp.disconnect();envelopes.delete(amp)};tail.start(at);tail.stop(at+duration+.1);
  }
  function schedule(){
    if(!enabled||blocked||document.hidden||ctx.state!=='running')return;
    const s=scores[mood]||scores.intro,beat=60/s.bpm;
    if(next<ctx.currentTime-.2)next=ctx.currentTime+.05;
    while(next<ctx.currentTime+.25){
      const chord=s.chords[Math.floor(step/8)%s.chords.length],position=step%8;
      if(position===0&&s.pad)chord.forEach(n=>note(n,next,beat*7.8,s.pad,'pad'));
      const pitch=s.melody[position];if(pitch!==null)note(pitch,next,3.6,mood==='birthday'?.095:.07);
      if((mood==='intro'||mood===0||mood===1||mood==='old')&&position%2===0)note(chord[(position/2)%4]+12,next+.08,2.6,.035);
      if(s.pulse&&position%2===0)note(chord[0]-12,next,.65,.065,'cue');
      step++;next+=beat;
    }
  }
  function silence(){
    clearInterval(timer);timer=null;
    if(!ctx)return;
    master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(0,ctx.currentTime,.035);
    voices.forEach(o=>{try{o.stop(ctx.currentTime+.12)}catch{}});
    const token=++generation;setTimeout(()=>{if(token===generation&&(!enabled||blocked||document.hidden))ctx.suspend().catch(()=>{})},160);
  }
  async function start(){
    const token=++generation;
    try{
      setup();await ctx.resume();
      if(token!==generation||!enabled||blocked||document.hidden)return;
      master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(.65,ctx.currentTime,.25);
      if(!timer){next=ctx.currentTime+.08;timer=setInterval(schedule,100);schedule()}
    }catch{failed=true;enabled=false;silence();}
    refresh();
  }
  function refresh(){document.querySelectorAll('[data-sound]').forEach(b=>{b.textContent=failed?'Sound unavailable':enabled?'♪ Sound on':'♪ Sound off';b.setAttribute('aria-pressed',String(enabled));b.setAttribute('aria-label',failed?'Sound unavailable in this browser':enabled?'Mute music and sounds':'Unmute music and sounds');b.disabled=failed})}
  function release(){envelopes.forEach(amp=>{const t=ctx.currentTime;if(amp.gain.cancelAndHoldAtTime)amp.gain.cancelAndHoldAtTime(t);else amp.gain.cancelScheduledValues(t);amp.gain.setTargetAtTime(0,t,.04)});voices.forEach(o=>{try{o.stop(ctx.currentTime+.18)}catch{}})}
  function setMood(value){if(mood===value)return;mood=value;step=0;if(ctx){release();next=ctx.currentTime+.2;}schedule()}
  function cue(type,index=0){
    if(!ctx||!enabled||blocked||document.hidden||ctx.state!=='running')return;
    const t=ctx.currentTime+.01;
    if(type==='ready'){note(76+index*2,t,.18,.085,'cue',effects);note(83+index*2,t+.1,.25,.055,'cue',effects)}
    if(type==='thanks'){note(74,t,.5,.1,'key',effects);note(81,t+.11,.65,.065,'key',effects)}
    if(type==='miss'){note(47,t,1.4,.095,'cue',effects);note(48,t+.13,1.2,.055,'cue',effects)}
    if(type==='human')note(69,t,1.4,.06,'key',effects);
  }
  document.addEventListener('click',e=>{if(!e.target.closest('[data-sound]'))return;enabled=!enabled;refresh();if(enabled&&!blocked&&!document.hidden)start();else silence()});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)silence();else if(enabled&&!blocked)start()});
  window.addEventListener('pagehide',silence);
  document.addEventListener('pointerdown',e=>{if(enabled&&!blocked&&!document.hidden&&ctx?.state!=='running'&&!e.target.closest('[data-sound]'))start()});
  window.RobotAudio={
    button:()=>`<button class="quiet sound" data-sound aria-pressed="${enabled}" aria-label="${enabled?'Mute':'Unmute'} music and sounds">♪ Sound ${enabled?'on':'off'}</button>`,
    mood:setMood,cue,
    pause:()=>{blocked=true;silence()},
    resume:()=>{blocked=false;if(enabled&&!document.hidden)start()},
    refresh
  };
})();
