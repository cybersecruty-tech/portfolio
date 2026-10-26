const roles=["Kiberxavfsizlik mutaxassisi","Veb-dasturchi","Dasturchi","FDTU talabasi"];

// typing effect
(()=>{const el=document.getElementById("typed");let r=0,i=0,del=false;
(function tick(){const w=roles[r];el.textContent=w.slice(0,i);
 if(!del&&i<w.length)i++;else if(del&&i>0)i--;else if(!del){del=true;return setTimeout(tick,1600)}else{del=false;r=(r+1)%roles.length}
 setTimeout(tick,del?45:90)})()})();

// reveal + skill bars + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add("in");
 t.querySelectorAll(".fill").forEach(f=>f.style.width=f.dataset.w+"%");
 t.querySelectorAll("[data-count]").forEach(c=>{const n=+c.dataset.count;let k=0;const s=setInterval(()=>{k++;c.textContent=k+(k>=n?"+":"");if(k>=n)clearInterval(s)},1200/n)});
 io.unobserve(t)}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

// project filter
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
 document.querySelectorAll("#filters button").forEach(x=>x.classList.toggle("on",x===b));
 document.querySelectorAll(".proj").forEach(p=>p.style.display=(b.dataset.f==="all"||p.dataset.cat===b.dataset.f)?"":"none")});

// 3D tilt on cards
document.querySelectorAll(".proj,.skill").forEach(c=>{
 c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`});
 c.addEventListener("mouseleave",()=>c.style.transform="")});

// mobile menu
const links=document.getElementById("links");
document.getElementById("burger").onclick=()=>links.classList.toggle("open");
links.querySelectorAll("a").forEach(a=>a.onclick=()=>links.classList.remove("open"));

// theme toggle
const root=document.documentElement,tb=document.getElementById("theme");
function setTheme(t){root.dataset.theme=t;tb.textContent=t==="light"?"🌙":"☀️";try{localStorage.setItem("theme",t)}catch(e){}}
let saved;try{saved=localStorage.getItem("theme")}catch(e){}
setTheme(saved||"dark");tb.onclick=()=>setTheme(root.dataset.theme==="light"?"dark":"light");

// contact form (Netlify Forms via AJAX)
document.getElementById("cform").addEventListener("submit",e=>{e.preventDefault();const f=e.target;
 fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(new FormData(f)).toString()})
 .finally(()=>{f.reset();const t=document.getElementById("toast");t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3500)})});

document.getElementById("yr").textContent=new Date().getFullYear();

// particle network background
(()=>{const c=document.getElementById("bg"),x=c.getContext("2d");let W,H,P=[];
function size(){W=c.width=innerWidth;H=c.height=innerHeight;const n=Math.min(90,Math.floor(W*H/16000));
 P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
size();addEventListener("resize",size);const m={x:-999,y:-999};addEventListener("mousemove",e=>{m.x=e.clientX;m.y=e.clientY});
(function draw(){x.clearRect(0,0,W,H);const col=root.dataset.theme==="light"?"60,60,140":"140,140,255";
 for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
  x.fillStyle=`rgba(${col},.6)`;x.beginPath();x.arc(p.x,p.y,1.6,0,7);x.fill()}
 for(let i=0;i<P.length;i++){for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);
  if(d<130){x.strokeStyle=`rgba(${col},${(1-d/130)*.25})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
  const d=Math.hypot(P[i].x-m.x,P[i].y-m.y);if(d<180){x.strokeStyle=`rgba(0,212,255,${(1-d/180)*.5})`;x.beginPath();x.moveTo(P[i].x,P[i].y);x.lineTo(m.x,m.y);x.stroke()}}
 requestAnimationFrame(draw)})()})();
