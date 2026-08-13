const player=document.querySelector('#specialPlayer');
const backgroundPlayer=document.querySelector('#specialBgPlayer');
const backgroundLayer=document.querySelector('.player-video-bg');
const playerZone=document.querySelector('.player-zone');
const ambientToggle=document.querySelector('#ambientToggle');
const external=document.querySelector('#watchExternal');
const tracks=[...document.querySelectorAll('.special-track')];
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let ambientEnabled=true;

const backgroundUrl=videoId=>`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`;

function sizeBackground(){
  if(!backgroundPlayer||!playerZone)return;
  const width=playerZone.clientWidth;
  const height=playerZone.clientHeight;
  const ratio=16/9;
  const frameWidth=width/height>ratio?width:height*ratio;
  const frameHeight=width/height>ratio?width/ratio:height;
  backgroundPlayer.style.width=`${Math.ceil(frameWidth)}px`;
  backgroundPlayer.style.height=`${Math.ceil(frameHeight)}px`;
}

function updateAmbientControl(){
  if(!ambientToggle)return;
  const playing=ambientEnabled&&!reduceMotion.matches;
  ambientToggle.setAttribute('aria-pressed',String(playing));
  ambientToggle.textContent=playing?'배경 영상 끄기':'배경 영상 켜기';
  ambientToggle.disabled=reduceMotion.matches;
}

function syncBackground(videoId){
  if(!backgroundPlayer)return;
  backgroundPlayer.dataset.video=videoId;
  if(!ambientEnabled||reduceMotion.matches){
    backgroundPlayer.removeAttribute('src');
    backgroundLayer?.classList.remove('is-playing');
    updateAmbientControl();
    return;
  }
  backgroundPlayer.src=backgroundUrl(videoId);
  backgroundLayer?.classList.add('is-playing');
  sizeBackground();
  updateAmbientControl();
}

tracks.forEach((track,index)=>track.addEventListener('click',()=>{
  tracks.forEach((item,i)=>{item.classList.toggle('active',i===index);item.setAttribute('aria-pressed',String(i===index))});
  if(player)player.src=`https://www.youtube-nocookie.com/embed/${track.dataset.video}?rel=0&autoplay=1`;
  if(external)external.href=`https://www.youtube.com/watch?v=${track.dataset.video}`;
  syncBackground(track.dataset.video);
}));

ambientToggle?.addEventListener('click',()=>{
  ambientEnabled=!ambientEnabled;
  syncBackground(backgroundPlayer?.dataset.video||tracks[0]?.dataset.video);
});

if(backgroundPlayer){
  const initial=tracks.find(track=>track.classList.contains('active'))?.dataset.video||backgroundPlayer.dataset.video;
  syncBackground(initial);
  if('ResizeObserver' in window)new ResizeObserver(sizeBackground).observe(playerZone);
  else window.addEventListener('resize',sizeBackground,{passive:true});
  reduceMotion.addEventListener?.('change',()=>syncBackground(backgroundPlayer.dataset.video));
}
