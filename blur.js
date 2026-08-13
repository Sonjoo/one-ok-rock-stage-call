(()=>{
  if(document.querySelector('.sonic-easter'))return;
  const link=document.createElement('a');
  const script=document.currentScript;
  const root=script?new URL('.',script.src):new URL('./',location.href);
  link.href=new URL('special/vandalize-run/',root).href;
  link.className='sonic-easter';
  link.setAttribute('aria-label','Sonic을 따라간다 — Sonic Frontiers × ONE OK ROCK 스페셜');
  const runner=new URL('assets/sonic/sonic-run.webp',root).href;
  const peeker=new URL('assets/sonic/sonic-peek.webp',root).href;
  link.innerHTML=`<img class="sonic-runner" src="${runner}" alt=""><img class="sonic-peeker" src="${peeker}" alt=""><span class="sonic-signal" aria-hidden="true">FOLLOW</span>`;
  document.body.append(link);

  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let scheduleTimer,peekTimer,lastDirection='ltr',lastY=42;
  const clearTimers=()=>{clearTimeout(scheduleTimer);clearTimeout(peekTimer)};
  const schedule=(first=false)=>{
    clearTimeout(scheduleTimer);
    if(reduced.matches)return;
    const delay=first?4200+Math.random()*5200:18000+Math.random()*27000;
    scheduleTimer=setTimeout(run,delay);
  };
  const hidePeek=()=>{
    link.classList.remove('is-peeking','peek-left','peek-right');
    schedule();
  };
  const armPeekExit=(delay=5000)=>{
    clearTimeout(peekTimer);
    peekTimer=setTimeout(hidePeek,delay);
  };
  const showPeek=()=>{
    link.classList.remove('is-running','ltr','rtl');
    link.style.setProperty('--peek-y',`${Math.min(lastY,68)}vh`);
    link.classList.add('is-peeking',lastDirection==='ltr'?'peek-right':'peek-left');
    armPeekExit(5000);
  };
  const run=()=>{
    if(document.hidden){schedule();return;}
    clearTimeout(peekTimer);
    link.classList.remove('is-running','is-peeking','ltr','rtl','peek-left','peek-right');
    void link.offsetWidth;
    lastY=18+Math.random()*54;
    lastDirection=Math.random()>.5?'ltr':'rtl';
    link.style.setProperty('--dash-y',`${lastY}vh`);
    link.style.setProperty('--dash-time',`${900+Math.random()*360}ms`);
    link.classList.add('is-running',lastDirection);
  };
  link.addEventListener('animationend',event=>{
    if(event.target===link&&link.classList.contains('is-running'))showPeek();
  });
  link.addEventListener('mouseenter',()=>{if(link.classList.contains('is-peeking'))clearTimeout(peekTimer)});
  link.addEventListener('mouseleave',()=>{if(link.classList.contains('is-peeking'))armPeekExit(1500)});
  link.addEventListener('focus',()=>{if(link.classList.contains('is-peeking'))clearTimeout(peekTimer)});
  link.addEventListener('blur',()=>{if(link.classList.contains('is-peeking'))armPeekExit(1500)});
  reduced.addEventListener?.('change',()=>{clearTimers();link.classList.remove('is-running','is-peeking','ltr','rtl','peek-left','peek-right');schedule(true)});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimers();else schedule(true)});
  schedule(true);
})();
