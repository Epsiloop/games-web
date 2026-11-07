// Animated particle network (same as epsiloop.io)
const c=document.getElementById('bg'),x=c.getContext('2d');
let W,H,P=[],m={x:-999,y:-999};
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
function size(){W=c.width=innerWidth;H=c.height=innerHeight;
  P=Array.from({length:Math.min(90,Math.floor(W*H/16000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))}
function draw(){
  x.clearRect(0,0,W,H);
  const light=matchMedia('(prefers-color-scheme:light)').matches&&document.documentElement.dataset.theme!=='dark'||document.documentElement.dataset.theme==='light';
  const dot=light?'128,0,32':'255,90,122',line=light?'128,0,32':'163,21,58';
  for(const p of P){
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
    x.fillStyle=`rgba(${dot},.6)`;x.beginPath();x.arc(p.x,p.y,1.6,0,7);x.fill();
  }
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){
    const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);
    if(d<130){x.strokeStyle=`rgba(${line},${.35*(1-d/130)})`;x.beginPath();x.moveTo(P[i].x,P[i].y);x.lineTo(P[j].x,P[j].y);x.stroke()}
  }
  for(const p of P){const d=Math.hypot(p.x-m.x,p.y-m.y);
    if(d<160){x.strokeStyle=`rgba(${dot},${.5*(1-d/160)})`;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(m.x,m.y);x.stroke()}}
  if(!reduce)requestAnimationFrame(draw);
}
addEventListener('resize',size);size();draw();

// Cursor glow
const glow=document.querySelector('.glow');
addEventListener('pointermove',e=>{m={x:e.clientX,y:e.clientY};glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});

// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target)}),{threshold:.05});
const observe=root=>root.querySelectorAll('.reveal:not(.in)').forEach((el,i)=>{el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
observe(document);

// ---------- Catalog ----------
const GAMES=window.GAMES||[];
const STATUS={live:['Live','success'],beta:['Beta','warning'],soon:['Coming soon','info']};
const el={grid:document.getElementById('games'),q:document.getElementById('q'),genres:document.getElementById('genres'),
  status:document.getElementById('status'),empty:document.getElementById('empty'),count:document.getElementById('count'),reset:document.getElementById('reset')};
const state={q:'',status:'all',genre:'all'};

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function card(g){
  const [label,tone]=STATUS[g.status]||STATUS.soon;
  const playable=g.status!=='soon'&&g.url;
  const tag=playable?'a':'div';
  const href=playable?` href="${esc(g.url)}"`:'';
  const hue=Number.isFinite(g.hue)?g.hue:345;
  const colors=['#ff3d9a','#2fa8ff','#ffc83d','#ff7a59','#7be0a0'];
  const confetti=g.confetti?`<span class="game__confetti" aria-hidden="true">${Array.from({length:18},(_,i)=>{
    const a=(-100+i*(120/17)+(i%2?6:-6))*Math.PI/180, d=110+(i*37%90);
    return `<i style="--dx:${Math.round(Math.cos(a)*d*1.3)}px;--dy:${Math.round(Math.sin(a)*d)}px;--r:${(i*83%720)-360}deg;--c:${colors[i%5]};--t:${(i%6)*30}ms;--w:${i%3?6:10}px"></i>`}).join('')}</span>`:'';
  const cover=g.cover?`<img src="${esc(g.cover)}" alt="" loading="lazy">${confetti}`:`<span class="game__letter" aria-hidden="true">${esc(g.title.trim().charAt(0).toUpperCase())}</span>`;
  const meta=[...(g.genres||[]).map(t=>`<span class="ep-badge">${esc(t)}</span>`),g.year?`<span class="ep-badge">${esc(g.year)}</span>`:''].join('');
  return `<${tag} class="ep-card ep-card--interactive game game--${esc(g.status)} reveal"${href} style="--h:${hue}">
    <div class="game__cover">${cover}<span class="game__status ep-badge ep-badge--dot ep-badge--${tone}">${label}</span></div>
    <div class="game__body">
      <h3 class="ep-card__title">${esc(g.title)}</h3>
      <p>${esc(g.tagline||'')}</p>
      <div class="game__meta">${meta}</div>
      <span class="game__cta">${playable?'Play →':'In development'}</span>
    </div>
  </${tag}>`;
}

function matches(g){
  if(state.status!=='all'&&g.status!==state.status)return false;
  if(state.genre!=='all'&&!(g.genres||[]).includes(state.genre))return false;
  const q=state.q.trim().toLowerCase();
  return !q||[g.title,g.tagline,...(g.genres||[])].join(' ').toLowerCase().includes(q);
}

function render(){
  const list=GAMES.filter(matches);
  el.grid.innerHTML=list.map(card).join('');
  el.empty.hidden=list.length>0;
  el.count.textContent=list.length;
  observe(el.grid);
  el.grid.querySelectorAll('.ep-card--interactive').forEach(tilt);
}

function tilt(card){
  card.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse')return;
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',(e.clientX-r.left)/r.width*100+'%');
    card.style.setProperty('--my',(e.clientY-r.top)/r.height*100+'%');
  });
}

function renderGenres(){
  const all=['all',...new Set(GAMES.flatMap(g=>g.genres||[]))];
  el.genres.innerHTML=all.map(g=>`<button type="button" class="ep-chip" data-genre="${esc(g)}" aria-pressed="${g===state.genre}">${g==='all'?'All genres':esc(g)}</button>`).join('');
}

function sync(){
  el.status.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.status===state.status));
  el.genres.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.genre===state.genre));
  render();
}

// Catalog UI only exists on the home page; other pages (e.g. terms.html, privacy.html) share this script.
if(el.grid){
el.q.addEventListener('input',()=>{state.q=el.q.value;render()});
el.status.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;state.status=b.dataset.status;sync()});
el.genres.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;state.genre=b.dataset.genre;sync()});
el.reset.addEventListener('click',()=>{state.q='';state.status='all';state.genre='all';el.q.value='';sync()});

renderGenres();render();
}
// Per-game privacy list (privacy.html)
const pg=document.getElementById('game-privacy');
if(pg&&window.GAMES){
  const e=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  pg.innerHTML=GAMES.map(g=>{
    const p=g.privacy||{},d=p.data||[];
    const body=d.length
      ?`<ul>${d.map(x=>`<li>${e(x)}</li>`).join('')}</ul>`
      :`<p>${g.status==='soon'?'This game is not released yet and collects no data. Its privacy policy will be published here before launch.':'No privacy details have been published for this game yet. Contact us at <a href="mailto:info@epsiloop.io">info@epsiloop.io</a>.'}</p>`;
    const link=p.url?`<p><a href="${e(p.url)}" target="_blank" rel="noopener">Read the full ${e(g.title)} privacy policy &rarr;</a></p>`:'';
    const upd=p.updated?`<p class="game-privacy__meta">Last updated: ${e(p.updated)}</p>`:'';
    return `<article class="game-privacy" id="${e(g.id)}"><h3>${e(g.title)} <span class="ep-badge">${e(g.status)}</span></h3>${body}${link}${upd}</article>`;
  }).join('');
}
document.getElementById('y').textContent=new Date().getFullYear();

// Apps menu
const ab=document.querySelector('.apps-btn'),am=document.querySelector('.apps-menu');
const setApps=o=>{am.classList.toggle('open',o);ab.setAttribute('aria-expanded',o)};
ab.addEventListener('click',e=>{e.stopPropagation();setApps(!am.classList.contains('open'))});
addEventListener('click',e=>{if(!am.contains(e.target))setApps(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')setApps(false)});
