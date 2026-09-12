// Compact styles handle normal screens; fitting covers short browser viewports
// and enlarged text without clipping controls or introducing a scroll surface.
(() => {
  const root=document.getElementById('app');
  let frame, previous="";
  function fit(){
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      const screen=root.querySelector('.screen');if(!screen)return;
      const signature=root.clientWidth+'x'+root.clientHeight+root.textContent;
      if(signature===previous)return;previous=signature;
      screen.style.transform='';screen.style.width='100%';
      screen.style.minHeight=root.clientHeight+'px';
      let scale=1;
      for(let i=0;i<4;i++){
        const required=screen.scrollHeight;
        const candidate=Math.min(1,root.clientHeight/required);
        if(Math.abs(candidate-scale)<.002)break;
        scale=candidate;
        screen.style.width=(100/scale)+'%';
        screen.style.minHeight=(root.clientHeight/scale)+'px';
      }
      scale=Math.min(scale,root.clientHeight/screen.scrollHeight);
      screen.style.transform=`scale(${scale})`;
    });
  }
  // Only content mutations matter; fitting styles do not retrigger this observer.
  new MutationObserver(fit).observe(root,{childList:true,subtree:true});
  new ResizeObserver(fit).observe(root);
  window.visualViewport?.addEventListener('resize',fit);
  document.fonts?.ready.then(()=>{previous="";fit()});
  fit();
})();
