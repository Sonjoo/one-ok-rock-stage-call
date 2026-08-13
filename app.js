const sourceDialog=document.querySelector('#sources');
const openSources=document.querySelector('#openSources');
const closeSources=document.querySelector('#closeSources');
if(sourceDialog&&openSources){
  openSources.addEventListener('click',()=>sourceDialog.showModal());
  closeSources?.addEventListener('click',()=>sourceDialog.close());
  sourceDialog.addEventListener('click',e=>{if(e.target===sourceDialog)sourceDialog.close()});
}

const cues=[...document.querySelectorAll('.cue')];
const activate=cue=>{
  cues.forEach(item=>item.classList.toggle('is-current',item===cue));
  const n=cue?.dataset.cue;
  if(n)document.documentElement.style.setProperty('--live-signal',cue.dataset.color||'#ef3b35');
};
cues.forEach(cue=>{
  cue.addEventListener('mouseenter',()=>activate(cue));
  cue.addEventListener('focusin',()=>activate(cue));
});
if(cues[0])activate(cues[0]);
