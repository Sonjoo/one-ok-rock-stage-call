const player=document.querySelector('#player');
const tracks=[...document.querySelectorAll('.track')];
const queue=tracks.map(track=>track.dataset.video);

function setActive(index){
  tracks.forEach((track,i)=>{
    const on=i===index;
    track.classList.toggle('active',on);
    track.setAttribute('aria-pressed',String(on));
  });
}
function playTrack(index,autoplay=true){
  const id=queue[index];
  if(!id||!player)return;
  player.src=`https://www.youtube-nocookie.com/embed/${id}?rel=0${autoplay?'&autoplay=1':''}`;
  setActive(index);
}
function playAll(){
  if(!queue.length||!player)return;
  const rest=queue.slice(1).join(',');
  player.src=`https://www.youtube-nocookie.com/embed/${queue[0]}?rel=0&autoplay=1${rest?`&playlist=${rest}`:''}`;
  setActive(0);
  document.querySelector('#playlist')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}
tracks.forEach((track,index)=>track.addEventListener('click',()=>playTrack(index)));
document.querySelector('#playAll')?.addEventListener('click',playAll);
document.querySelector('#playAllTop')?.addEventListener('click',playAll);
