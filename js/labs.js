// "Learning & labs" dashboard: Hack The Box + Google Cloud Skills Boost + SelfMade Ninja.
import { HTB, GCSB, SMN } from './labs-data.js';

const $ = (s) => document.querySelector(s);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fmt = (n) => n.toLocaleString('en-US');
// stat tile icons: 3D Fluent emoji (pinned), native emoji if the image fails
const EMOJI_CDN = 'https://cdn.jsdelivr.net/npm/@lobehub/fluent-emoji-3d@1.1.0/assets/';
const E = {
  flag: ['1f6a9', '🚩'],
  server: ['1f5a5-fe0f', '🖥️'],
  heart: ['1f91d', '🤝'],
  calendar: ['1f4c5', '📅'],
  helm: ['2699-fe0f', '⚙️'],
  sparkles: ['1f916', '🤖'],
  shield: ['1f6e1-fe0f', '🛡️'],
  database: ['1f5c4-fe0f', '🗄️'],
  flame: ['1f525', '🔥'],
  bolt: ['26a1', '⚡'],
  dumbbell: ['1f3cb-fe0f', '🏋️'],
  trophy: ['1f3c6', '🏆'],
};
const ico = (name) => {
  const [code, ch] = E[name] || ['', ''];
  return `<i class="t-ico" aria-hidden="true"><img src="${EMOJI_CDN}${code}.webp" alt="" width="28" height="28" loading="lazy" onerror="this.replaceWith(document.createTextNode('${ch}'))"></i>`;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function countTo(el, target, { dur = 1600, plain = false } = {}) {
  if (plain) { el.textContent = String(target); return; }
  const t0 = performance.now();
  const step = (now) => {
    const k = Math.min((now - t0) / dur, 1);
    el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function onVisible(el, fn, threshold = 0.3) {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    fn();
  }, { threshold });
  io.observe(el);
}

function htb(reduced) {
  $('#htbHandle').textContent = '@' + HTB.handle;
  $('#htbLink').href = HTB.url;
  $('#htbRank').textContent = HTB.rank;
  $('#htbRankIcon').src = HTB.rankIcon;

  const stats = $('#htbStats');
  const valueEls = HTB.stats.map((s) => {
    const d = document.createElement('div');
    d.className = 'h-stat';
    d.innerHTML = `${ico(s.icon)}<b class="mono">0</b><small>${s.label}</small>`;
    stats.appendChild(d);
    return [d.querySelector('b'), s];
  });

  const log = $('#htbLog');
  const panel = $('.lab-panel.htb');
  onVisible(panel, async () => {
    panel.classList.add('on');
    countTo($('#htbLevel'), HTB.level, { dur: 1400 });
    valueEls.forEach(([el, s]) => countTo(el, s.value, { plain: s.plain }));
    for (const a of HTB.activity) {
      const row = document.createElement('div');
      row.className = 'pwn-row';
      row.title = `${a.what} · ${a.type} · ${a.when}`;
      const tag = a.flag === 'root' ? 'root' : a.flag === 'user' ? 'user' : 'flag';
      row.innerHTML = `<span class="pwn-ok">[+]</span> <span class="pwn-tag ${tag}">${tag}</span> <span class="pwn-what">${a.what}</span> <span class="muted">· ${a.type} · ${a.when}</span>`;
      log.appendChild(row);
      await sleep(reduced ? 0 : 260);
    }
  });
}

function gcsb(reduced) {
  $('#gcsbLink').href = GCSB.url;
  $('#gcsbSince').textContent = GCSB.memberSince;
  $('#gcsbLeague').textContent = GCSB.league;

  const total = GCSB.badges.length;
  const counts = {};
  GCSB.badges.forEach((b) => { counts[b.cat] = (counts[b.cat] || 0) + 1; });

  // donut: one arc per track, drawn in sequence when the card scrolls in
  const NS = 'http://www.w3.org/2000/svg';
  const svg = $('#gcsbDonut');
  const R = 48;
  const C = 2 * Math.PI * R;
  const GAP = 3;
  const bg = document.createElementNS(NS, 'circle');
  Object.entries({ cx: 60, cy: 60, r: 54, class: 'donut-bg' }).forEach(([k, v]) => bg.setAttribute(k, v));
  svg.appendChild(bg);
  let offset = 0;
  const arcs = GCSB.categories.map(([key, , color], i) => {
    const len = ((counts[key] || 0) / total) * C;
    const arc = document.createElementNS(NS, 'circle');
    Object.entries({ cx: 60, cy: 60, r: R, class: 'donut-arc' }).forEach(([k, v]) => arc.setAttribute(k, v));
    arc.style.stroke = color;
    arc.style.setProperty('--len', Math.max(len - GAP, 0));
    arc.style.setProperty('--c', C);
    arc.style.transform = `rotate(${(offset / C) * 360 - 90}deg)`;
    arc.style.transitionDelay = `${i * 0.35}s`;
    arc.dataset.cat = key;
    svg.appendChild(arc);
    offset += len;
    return arc;
  });

  // tiles double as the donut legend
  const stats = $('#gcsbStats');
  const tiles = GCSB.categories.map(([key, label, color, icon]) => {
    const d = document.createElement('div');
    d.className = 'h-stat';
    d.dataset.cat = key;
    d.innerHTML = `${ico(icon)}<b class="mono">0</b><small><i class="dot" style="background:${color}"></i>${label}</small>`;
    stats.appendChild(d);
    const hl = (on) => {
      arcs.forEach((a) => a.classList.toggle('fade', on && a.dataset.cat !== key));
      d.classList.toggle('hl', on);
    };
    d.addEventListener('pointerenter', () => hl(true));
    d.addEventListener('pointerleave', () => hl(false));
    return [d.querySelector('b'), counts[key] || 0];
  });

  const recent = [...GCSB.badges].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 5);
  const log = $('#gcsbLog');
  const panel = $('.lab-panel.gcsb');
  onVisible(panel, async () => {
    panel.classList.add('on');
    countTo($('#gcsbBadges'), total, { dur: 1400 });
    countTo($('#gcsbPoints'), GCSB.points, { dur: reduced ? 1 : 2000 });
    tiles.forEach(([el, n]) => countTo(el, n));
    for (const b of recent) {
      const d = new Date(b.date + 'T00:00:00');
      const row = document.createElement('div');
      row.className = 'pwn-row';
      row.title = b.title;
      row.innerHTML = `<span class="pwn-ok">[✓]</span> <span class="pwn-tag ${b.cat}">${b.cat}</span> <span class="pwn-what">${b.title}</span> <span class="muted">· ${MONTHS[d.getMonth()]} ${d.getFullYear()}</span>`;
      log.appendChild(row);
      await sleep(reduced ? 0 : 260);
    }
  });
}

function smn(reduced) {
  $('#smnLink').href = SMN.url;
  $('#smnTeam').textContent = SMN.team;
  const logo = $('#smnLogo');
  logo.src = SMN.logo;
  logo.onerror = () => logo.replaceWith(Object.assign(document.createElement('span'), { className: 'smn-mark mono', textContent: 'SN' }));
  $('#smnTitle').textContent = SMN.title;

  const stats = $('#smnStats');
  const valueEls = SMN.stats.map((st) => {
    const d = document.createElement('div');
    d.className = 'h-stat';
    d.innerHTML = `${ico(st.icon)}<b class="mono">0</b><small>${st.label}</small>`;
    stats.appendChild(d);
    return [d.querySelector('b'), st.value];
  });

  const max = Math.max(...SMN.skills.map((k) => k.count));
  const log = $('#smnLog');
  const panel = $('.lab-panel.smn');
  onVisible(panel, async () => {
    panel.classList.add('on');
    countTo($('#smnRank'), SMN.globalRank, { dur: 1400 });
    valueEls.forEach(([el, v]) => countTo(el, v));
    for (const k of SMN.skills) {
      const row = document.createElement('div');
      row.className = 'pwn-row skill-row';
      row.innerHTML = `<span class="pwn-ok">[+]</span> <span class="pwn-what">${k.name}</span><span class="skill-bar"><i style="--w:${(k.count / max) * 100}%"></i></span><span class="muted">×${k.count}</span>`;
      log.appendChild(row);
      await sleep(reduced ? 0 : 260);
    }
    const next = document.createElement('div');
    next.className = 'pwn-row';
    next.innerHTML = `<span class="pwn-ok">[→]</span> <span class="muted">next rank:</span> <span class="pwn-what">${SMN.next}</span>`;
    log.appendChild(next);
  });
}

export function initLabs({ reduced = false } = {}) {
  if (!$('.labs-dash')) return;
  htb(reduced);
  gcsb(reduced);
  smn(reduced);
}
