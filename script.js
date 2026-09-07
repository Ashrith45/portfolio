const progress=document.querySelector('.progress');
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(window.scrollY/h*100)+'%';});

const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
window.addEventListener('pointermove',e=>{dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';ring.animate({left:e.clientX+'px',top:e.clientY+'px'},{duration:450,fill:'forwards'});});
document.querySelectorAll('a,button,.tilt').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('big'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('big'));
});

const menu=document.querySelector('.mobile-nav'), toggle=document.querySelector('.menu-toggle');
toggle.addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal,.section').forEach(x=>observer.observe(x));

const levels={
  comfortable:'Comfortable — this is part of my regular foundation.',
  intermediate:'Intermediate — I can work with the fundamentals and keep improving.',
  basic:'Basic — I know the fundamentals and I am strengthening them.',
  learning:'Currently learning — building projects and going deeper.',
  creative:'Creative skill — something I actively practise outside coding.'
};
const status=document.getElementById('skill-status');
document.querySelectorAll('.skill-cloud button').forEach(btn=>{
  btn.addEventListener('mouseenter',()=>{status.textContent=levels[btn.dataset.level];});
  btn.addEventListener('click',()=>{document.querySelectorAll('.skill-cloud button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');status.textContent=levels[btn.dataset.level];});
});

document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(innerWidth<850)return;
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-2.5}deg) rotateY(${x*2.5}deg)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect(), x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
    el.style.transform=`translate(${x*.12}px,${y*.12}px)`;
  });
  el.addEventListener('pointerleave',()=>el.style.transform='');
});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector(a.getAttribute('href'));
  if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
}));

// Small human touch: the hero line changes occasionally, without pretending to be a chatbot.
const lines=[
  'I build things, break things, fix them, and usually learn something new in the process.',
  'I like turning “I don’t know how yet” into “okay, it works.”',
  'I’m learning to build better things — one project at a time.'
];
const intro=document.querySelector('.hero-intro');
let i=0;
setInterval(()=>{i=(i+1)%lines.length;intro.style.opacity=0;setTimeout(()=>{intro.textContent=lines[i];intro.style.opacity=1},250)},5000);
intro.style.transition='opacity .25s ease';
