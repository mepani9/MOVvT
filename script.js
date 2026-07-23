
const state={colors:[],improvements:[],use:[]};let current=1;
const steps=[...document.querySelectorAll('.step')],next=document.getElementById('nextBtn'),back=document.getElementById('backBtn'),bar=document.getElementById('progressBar');

document.querySelectorAll('.science').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.science').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
 document.getElementById('scienceTitle').textContent=btn.dataset.title;
 document.getElementById('scienceCopy').textContent=btn.dataset.copy;
 document.getElementById('scienceImg').src=btn.dataset.img;
}));

document.querySelectorAll('#swatches button').forEach(btn=>btn.addEventListener('click',()=>{
 const v=btn.dataset.value, i=state.colors.indexOf(v);
 if(i>=0){state.colors.splice(i,1);btn.classList.remove('selected')}
 else if(state.colors.length<4){state.colors.push(v);btn.classList.add('selected')}
}));

document.querySelectorAll('.choices').forEach(group=>group.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
 const key=group.dataset.key, v=btn.textContent, i=state[key].indexOf(v);
 if(i>=0){state[key].splice(i,1);btn.classList.remove('selected')}
 else{state[key].push(v);btn.classList.add('selected')}
})));

function showStep(n){
 steps.forEach(s=>s.classList.toggle('active',+s.dataset.step===n));
 current=n; back.disabled=n===1; next.style.display=n===6?'none':'inline-flex';
 next.textContent=n===5?'Build my profile':'Next'; bar.style.width=`${Math.min(n,5)*20}%`;
}
function buildResult(){
 state.compression=document.getElementById('compression').value;
 state.feel=document.getElementById('feel').value;
 state.coverage=document.getElementById('coverage').value;
 state.wish=document.getElementById('wish').value.trim();
 state.firstName=document.getElementById('firstName').value.trim();
 state.city=document.getElementById('city').value.trim();
 const name=state.firstName?`${state.firstName}'s`:'Your';
 document.getElementById('resultTitle').textContent=`${name} movement profile`;
 const lines=[
  `COLOR DIRECTION: ${state.colors.length?state.colors.join(', '):'Open to new palettes'}`,
  `FIX FIRST: ${state.improvements.length?state.improvements.join(', '):'No priorities selected'}`,
  `MADE FOR: ${state.use.length?state.use.join(', '):'Versatile movement'}`,
  `FEEL: Compression ${state.compression}/5 · Sleekness ${state.feel}/5 · Coverage ${state.coverage}/5`,
  state.city?`CITY: ${state.city}`:'',
  state.wish?`ONE THING TO UNDERSTAND: ${state.wish}`:''
 ].filter(Boolean);
 document.getElementById('resultText').textContent=lines.join('\n\n');
 localStorage.setItem('movvtFeedback',JSON.stringify(state));
}
next.addEventListener('click',()=>{if(current<5)showStep(current+1);else{buildResult();showStep(6)}});
back.addEventListener('click',()=>{if(current>1)showStep(current-1)});
document.getElementById('copyResult').addEventListener('click',async()=>{
 const text='MOVvT CO-CREATION FEEDBACK\n\n'+document.getElementById('resultText').textContent;
 try{await navigator.clipboard.writeText(text);document.getElementById('copyResult').textContent='Copied ✓'}
 catch{prompt('Copy your MOVvT feedback:',text)}
});
document.getElementById('year').textContent=new Date().getFullYear();
