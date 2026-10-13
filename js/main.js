import { initScene } from './scene.js';
import { decorate, logoEl } from './icons.js';
import { initLabs } from './labs.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const hasGsap = !!(gsap && ScrollTrigger);
if (hasGsap) gsap.registerPlugin(ScrollTrigger);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (hasGsap) document.documentElement.classList.add('js');
document.body.classList.add('loading');
$('#year').textContent = new Date().getFullYear();

/* =========================================================
   Theme
   ========================================================= */
const scene = initScene($('#bg3d'), { reduced });
const getTheme = () => document.documentElement.getAttribute('data-theme') || 'light';
scene.setTheme(getTheme());

$('#themeToggle').addEventListener('click', (e) => {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  // circular wipe from the toggle
  const wipe = document.createElement('div');
  wipe.className = 'theme-wipe';
  const r = Math.hypot(window.innerWidth, window.innerHeight) * 2;
  Object.assign(wipe.style, {
    left: e.clientX + 'px', top: e.clientY + 'px', width: r + 'px', height: r + 'px',
    background: next === 'dark' ? '#04060c' : '#f4f7fd',
  });
  document.body.appendChild(wipe);
  const apply = () => {
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('tg-theme', next); } catch (err) {}
    scene.setTheme(next);
  };
  if (hasGsap && !reduced) {
    gsap.timeline({ onComplete: () => wipe.remove() })
      .to(wipe, { scale: 1, duration: 0.55, ease: 'power3.in' })
      .add(apply)
      .to(wipe, { opacity: 0, duration: 0.45, ease: 'power1.out' });
  } else {
    apply();
    wipe.remove();
  }
});

/* =========================================================
   Boot loader
   ========================================================= */
async function boot() {
  const log = $('#loaderLog');
  const bar = $('#loaderBar');
  const lines = [
    ['$ terraform apply -auto-approve', ''],
    ['  module.vpc ......................', 'created'],
    ['  module.gke_cluster ..............', 'created'],
    ['$ kubectl apply -f portfolio.yaml', ''],
    ['  deployment.apps/tamilvanan ......', 'configured'],
    ['$ argocd app sync portfolio', ''],
    ['  status: Healthy · Synced', '✓'],
  ];
  const fast = reduced ? 0 : 1;
  for (let i = 0; i < lines.length; i++) {
    const [txt, ok] = lines[i];
    log.innerHTML += `${txt} ${ok ? `<span class="ok">${ok}</span>` : ''}\n`;
    bar.style.width = ((i + 1) / lines.length) * 100 + '%';
    await sleep((txt.startsWith('$') ? 190 : 130) * fast);
  }
  await sleep(250 * fast);
  $('#loader').classList.add('done');
  document.body.classList.remove('loading');
  heroIntro();
}

/* =========================================================
   Hero intro + typed roles
   ========================================================= */
function heroIntro() {
  if (hasGsap) {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.hero-title .line > span', { yPercent: 110, rotate: 4, duration: 1.1, stagger: 0.12 })
      .to('.hero .reveal-up', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, '-=0.8')
      .from('.hero-stats .stat', { opacity: 0, y: 30, duration: 0.8, stagger: 0.08 }, '-=0.6')
      .from('.hud-card', { opacity: 0, scale: 0.8, duration: 0.8, stagger: 0.15 }, '-=0.8')
      .from('.nav', { top: -80, opacity: 0, duration: 0.8, clearProps: 'top,opacity' }, 0.2);
  }
  $$('.hero-stats [data-count]').forEach((el) => countUp(el));
  typeRoles();
}

async function typeRoles() {
  const el = $('#typed');
  const roles = ['DevOps Engineer', 'Site Reliability Engineer', 'Kubernetes Wrangler', 'Terraform Architect', 'GitOps Pipeline Builder', 'Cloud Cost Optimiser', 'ML Infra Builder'];
  let i = 0;
  for (;;) {
    const word = roles[i % roles.length];
    for (let c = 1; c <= word.length; c++) { el.textContent = word.slice(0, c); await sleep(55); }
    await sleep(1600);
    for (let c = word.length; c >= 0; c--) { el.textContent = word.slice(0, c); await sleep(28); }
    await sleep(250);
    i++;
  }
}

function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.decimals || '0', 10);
  const pre = el.dataset.prefix || '';
  const suf = el.dataset.suffix || '';
  const dur = reduced ? 1 : 1800;
  const start = performance.now();
  const step = (now) => {
    const k = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - k, 3);
    el.textContent = pre + (target * e).toFixed(dec) + suf;
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* =========================================================
   Split headings into words for reveal
   ========================================================= */
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.textContent = part;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) {
        walk(n);
      }
    });
  };
  walk(el);
  // background-clip:text doesn't reach inline-block children, so move gradients onto each word
  el.querySelectorAll('.grad').forEach((g) => {
    g.classList.remove('grad');
    g.querySelectorAll('.w > span').forEach((s) => s.classList.add('grad'));
  });
}

/* =========================================================
   Scroll animations
   ========================================================= */
function scrollAnimations() {
  if (!hasGsap) return;

  // progress bar
  gsap.to('#scrollProgress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

  // headings
  $$('.split').forEach((h) => {
    splitWords(h);
    gsap.from(h.querySelectorAll('.w > span'), {
      yPercent: 115, rotate: 6, duration: 1, ease: 'power4.out', stagger: 0.06,
      scrollTrigger: { trigger: h, start: 'top 85%' },
    });
  });
  $$('.eyebrow').forEach((e) => {
    gsap.from(e, { opacity: 0, x: -30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: e, start: 'top 90%' } });
  });

  // generic reveals (outside hero)
  $$('.reveal-up').filter((el) => !el.closest('.hero')).forEach((el) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // marquee speeds up with scroll velocity
  const track = $('.marquee-track');
  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = Math.min(Math.abs(self.getVelocity()) / 1000, 4);
      track.style.animationDuration = 32 / (1 + v) + 's';
    },
  });

  // stats parallax
  gsap.to('.hero-content', { y: -80, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // projects: staggered 3D entry
  gsap.from('.project', {
    opacity: 0, y: 80, rotateX: -25, transformOrigin: '50% 0%', duration: 1.1, ease: 'power3.out', stagger: 0.15,
    scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
  });

  // certs: flip in
  gsap.from('.cert', {
    rotateY: -90, opacity: 0, duration: 1, ease: 'back.out(1.4)', stagger: 0.12,
    scrollTrigger: { trigger: '.certs-grid', start: 'top 85%' },
  });

  // labs: deal in like cards
  gsap.from('.lab-panel', {
    opacity: 0, y: 70, rotateX: -18, transformOrigin: '50% 0%', duration: 1, ease: 'power3.out', stagger: 0.14, clearProps: 'transform,opacity',
    scrollTrigger: { trigger: '.labs-dash', start: 'top 85%' },
  });

  // skill groups
  gsap.from('.skill-group', {
    opacity: 0, x: 40, duration: 0.7, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: '.skill-groups', start: 'top 85%' },
  });
}

/* =========================================================
   Experience pipeline (scroll-driven CI/CD run)
   ========================================================= */
function pipeline() {
  const wrap = $('#pipeline');
  const fill = $('#pipeFill');
  const packet = $('#pipePacket');
  const stages = $$('.stage', wrap);

  const update = () => {
    const rect = wrap.getBoundingClientRect();
    const head = window.innerHeight * 0.55; // the "trigger line"
    const p = Math.min(Math.max((head - rect.top) / rect.height, 0), 1);
    fill.style.transform = `scaleY(${p})`;
    packet.style.top = p * 100 + '%';
    packet.style.opacity = p > 0 && p < 1 ? 1 : 0.4;
    const headY = rect.top + rect.height * p;
    stages.forEach((st) => {
      const node = $('.stage-node', st).getBoundingClientRect();
      const nodeMid = node.top + node.height / 2;
      const passed = headY >= nodeMid;
      const running = !passed && headY >= nodeMid - window.innerHeight * 0.3;
      st.classList.toggle('passed', passed);
      st.classList.toggle('running', running);
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  if (hasGsap) {
    stages.forEach((st, i) => {
      const card = $('.stage-card', st);
      const fromLeft = window.innerWidth > 860 && i % 2 === 1;
      gsap.from(card, {
        opacity: 0, x: window.innerWidth > 860 ? (fromLeft ? -80 : 80) : 40, rotateY: fromLeft ? 12 : -12,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: st, start: 'top 85%' },
      });
      gsap.from($('.stage-node', st), { scale: 0, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: st, start: 'top 85%' } });
    });
  }
}

/* GitHub-Actions-style run graph that loops while visible */
function runGraph() {
  const graph = $('#runGraph');
  const jobs = $$('.job', graph);
  const links = $$('.job-link', graph);
  const icon = $('#runIcon');
  const runNo = $('#runNo');
  const runTime = $('#runTime');
  let visible = false;
  let running = false;

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !running) loop();
  }, { threshold: 0.3 }).observe(graph);

  async function loop() {
    running = true;
    while (visible) {
      jobs.forEach((j) => j.classList.remove('running', 'done'));
      links.forEach((l) => l.classList.remove('done'));
      icon.classList.remove('ok');
      const t0 = performance.now();
      const timer = setInterval(() => { runTime.textContent = ((performance.now() - t0) / 1000).toFixed(1) + 's'; }, 100);
      for (let i = 0; i < jobs.length; i++) {
        jobs[i].classList.add('running');
        await sleep(900 + Math.random() * 500);
        jobs[i].classList.remove('running');
        jobs[i].classList.add('done');
        if (links[i]) { links[i].classList.add('done'); await sleep(450); }
      }
      clearInterval(timer);
      icon.classList.add('ok');
      await sleep(3200);
      runNo.textContent = String(+runNo.textContent + 1);
    }
    running = false;
  }
}

/* Project cards run their mini-pipeline when they scroll in */
function projects() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const card = e.target;
      io.unobserve(card);
      setTimeout(() => card.classList.add('run'), 300);
      setTimeout(() => card.classList.add('ok'), 300 + 4 * 450 + 400);
    });
  }, { threshold: 0.45 });
  $$('.project').forEach((p) => io.observe(p));
}

/* =========================================================
   Terminals (typed output)
   ========================================================= */
function typeTerminal(el, script, { speed = 18 } = {}) {
  let started = false;
  const io = new IntersectionObserver(async ([e]) => {
    if (!e.isIntersecting || started) return;
    started = true;
    io.disconnect();
    for (const line of script) {
      if (line.cmd) {
        const row = document.createElement('div');
        row.innerHTML = '<span class="c-p">➜</span> <span class="c-k">~</span> ';
        const cmd = document.createElement('span');
        row.appendChild(cmd);
        const cur = document.createElement('span');
        cur.className = 'cur';
        row.appendChild(cur);
        el.appendChild(row);
        for (let i = 1; i <= line.cmd.length; i++) {
          cmd.textContent = line.cmd.slice(0, i);
          await sleep(reduced ? 0 : speed * 2.2);
        }
        cur.remove();
        await sleep(reduced ? 0 : 260);
      } else {
        const row = document.createElement('div');
        row.innerHTML = line.html;
        el.appendChild(row);
        await sleep(reduced ? 0 : speed * 4);
      }
    }
    const last = document.createElement('div');
    last.innerHTML = '<span class="c-p">➜</span> <span class="c-k">~</span> <span class="cur"></span>';
    el.appendChild(last);
  }, { threshold: 0.4 });
  io.observe(el);
}

const kv = (k, v, cls = 'c-s') => ({ html: `<span class="c-k">${k}:</span> <span class="${cls}">${v}</span>` });
typeTerminal($('#aboutTerm'), [
  { cmd: 'cat about.yaml' },
  { html: '<span class="c-m"># ---- engineer profile ----</span>' },
  kv('name', 'Tamilvanan Gowran'),
  kv('role', 'DevOps / SRE Engineer'),
  kv('company', 'Increff'),
  kv('experience', '4+ years'),
  kv('clouds', '[aws, gcp, azure]'),
  { html: '<span class="c-k">outcomes:</span>' },
  { html: '  - <span class="c-s">deployments: 40% faster</span>' },
  { html: '  - <span class="c-s">deploy_stability: +50%</span>' },
  { html: '  - <span class="c-s">mttr: 30-40% faster</span>' },
  { html: '  - <span class="c-s">cloud_cost: -15-30%</span>' },
  kv('currently_learning', 'gpu-infra, ml-inference'),
]);

typeTerminal($('#contactTerm'), [
  { cmd: 'kubectl get svc tamilvanan -o yaml' },
  { html: '<span class="c-k">apiVersion:</span> <span class="c-s">v1</span>' },
  { html: '<span class="c-k">kind:</span> <span class="c-s">Service</span>' },
  { html: '<span class="c-k">spec:</span>' },
  { html: '  <span class="c-k">ports:</span>' },
  { html: '    - <span class="c-k">email:</span> <span class="c-s">tamilbecse139@gmail.com</span>' },
  { html: '    - <span class="c-k">linkedin:</span> <span class="c-s">in/gtamilvanan17</span>' },
  { html: '    - <span class="c-k">github:</span> <span class="c-s">gtamilvanan17</span>' },
  { html: '<span class="c-k">status:</span>' },
  { html: '  <span class="c-k">availability:</span> <span class="c-s">open_to_opportunities</span>' },
  { html: '  <span class="c-k">response_time:</span> <span class="c-s">&lt; 24h</span>' },
  { cmd: 'echo "say hi 👋"' },
  { html: '<span class="c-s">say hi 👋</span>' },
]);

/* =========================================================
   Tag sphere
   ========================================================= */
function tagSphere() {
  const box = $('#sphere');
  const tags = ['Kubernetes', 'Terraform', 'ArgoCD', 'GitHub Actions', 'AWS', 'GCP', 'Azure', 'Docker', 'Helm', 'Prometheus', 'Grafana', 'ELK', 'Ansible', 'Jenkins', 'Python', 'Bash', 'EKS', 'GKE', 'AKS', 'Kubeadm', 'RBAC', 'HPA/VPA', 'Ingress', 'VPC', 'IAM', 'Key Vault', 'CloudFormation', 'ARM', 'GitOps', 'AIOps', 'RAG', 'GPU', 'Linux', 'Azure Pipelines', 'Secret Manager', 'StatefulSets'];
  const hl = new Set(['Kubernetes', 'Terraform', 'ArgoCD', 'GCP', 'AWS', 'Azure', 'Prometheus', 'Docker']);
  const N = tags.length;
  const pts = tags.map((t, i) => {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * Math.PI * (3 - Math.sqrt(5));
    const el = document.createElement('span');
    el.textContent = t;
    const logo = logoEl(t);
    if (logo) el.prepend(logo);
    if (hl.has(t)) el.classList.add('hl');
    box.appendChild(el);
    return { el, x: Math.cos(th) * r, y, z: Math.sin(th) * r };
  });

  let radius = box.clientWidth * 0.4;
  window.addEventListener('resize', () => { radius = box.clientWidth * 0.4; });
  let vx = 0.003, vy = 0.004;
  let tvx = vx, tvy = vy;
  let dragging = false, lx = 0, ly = 0;

  box.addEventListener('pointermove', (e) => {
    const r = box.getBoundingClientRect();
    if (dragging) {
      tvy = (e.clientX - lx) * 0.002;
      tvx = -(e.clientY - ly) * 0.002;
      lx = e.clientX; ly = e.clientY;
    } else {
      tvy = ((e.clientX - r.left) / r.width - 0.5) * 0.03;
      tvx = -((e.clientY - r.top) / r.height - 0.5) * 0.03;
    }
  });
  box.addEventListener('pointerdown', (e) => { dragging = true; lx = e.clientX; ly = e.clientY; box.setPointerCapture(e.pointerId); });
  box.addEventListener('pointerup', () => { dragging = false; });
  box.addEventListener('pointerleave', () => { tvx = 0.003; tvy = 0.004; });

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);

  const frame = () => {
    if (visible) {
      vx += (tvx - vx) * 0.06;
      vy += (tvy - vy) * 0.06;
      const k = reduced ? 0.2 : 1;
      const cx = Math.cos(vx * k), sx = Math.sin(vx * k);
      const cy = Math.cos(vy * k), sy = Math.sin(vy * k);
      pts.forEach((p) => {
        // rotate around X then Y
        let y = p.y * cx - p.z * sx;
        let z = p.y * sx + p.z * cx;
        let x = p.x * cy + z * sy;
        z = -p.x * sy + z * cy;
        p.x = x; p.y = y; p.z = z;
        const scale = (z + 2) / 3;
        p.el.style.transform = `translate(-50%, -50%) translate3d(${x * radius}px, ${y * radius}px, 0) scale(${scale})`;
        p.el.style.opacity = String(0.25 + ((z + 1) / 2) * 0.75);
        p.el.style.zIndex = String(Math.round((z + 1) * 100));
        p.el.style.filter = z < -0.3 ? `blur(${(-z - 0.3) * 2}px)` : 'none';
      });
    }
    requestAnimationFrame(frame);
  };
  frame();
}

/* =========================================================
   Micro-interactions: cursor, magnetic, tilt, nav
   ========================================================= */
function cursor() {
  if (!finePointer || reduced) return;
  document.body.classList.add('has-cursor');
  const dot = $('#cursorDot'), ring = $('#cursorRing');
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  window.addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
  const loop = () => {
    rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener('pointerover', (e) => {
    ring.classList.toggle('hover', !!e.target.closest('a, button, [data-tilt], .cert'));
  });
}

function magnetic() {
  if (!finePointer || reduced) return;
  $$('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${mx * 0.25}px, ${my * 0.3}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1)';
      el.style.transform = '';
      setTimeout(() => (el.style.transition = ''), 500);
    });
  });
}

function tilt() {
  if (!finePointer || reduced) return;
  $$('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) translateZ(0)`;
      el.style.setProperty('--mx', px * 100 + '%');
      el.style.setProperty('--my', py * 100 + '%');
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)';
      el.style.transform = '';
      setTimeout(() => (el.style.transition = ''), 600);
    });
  });
}

function nav() {
  const navEl = $('#nav');
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navEl.classList.toggle('hidden', y > last && y > 300 && !document.body.classList.contains('menu-open'));
    last = y;
  }, { passive: true });

  $('#menuBtn').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  const links = $$('#navLinks a');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => io.observe(s));

  // tap to flip certs on touch
  $$('.cert').forEach((c) => c.addEventListener('click', () => { if (!finePointer) c.classList.toggle('flipped'); }));
}

/* =========================================================
   Logos
   ========================================================= */
function logos() {
  decorate('.tags span, .tool-chips span, .marquee span, .orbit-track span');
  $$('.cert-seal[data-logo]').forEach((seal) => {
    const tile = logoEl(seal.dataset.logo);
    if (tile) seal.appendChild(tile);
  });
}

/* =========================================================
   Go
   ========================================================= */
logos();
initLabs({ reduced });
scrollAnimations();
pipeline();
runGraph();
projects();
tagSphere();
cursor();
magnetic();
tilt();
nav();
boot();
