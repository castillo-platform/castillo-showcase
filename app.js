// Renders the showcase from data.js (window.CASTILLO): hero castle and figures, one section per
// group with its apps and tiles, the platform, how it is built, plus the nav chips and the lightbox.
(() => {
  const D = window.CASTILLO;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Line icons (24 grid, stroke), drawn for this page.
  const ICONS = {
    wallet: '<path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z"/><circle cx="16" cy="14.5" r="1.3"/>',
    paper: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 17h5"/>',
    console: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="m7 9 3 2.5L7 14M12.5 14H17M9 21h6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    bench: '<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V4.5A2.5 2.5 0 0 0 9 4z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
    cook: '<path d="M6 13h12v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z"/><path d="M4 13h16M9 9c0-2 2-2 2-4M13 9c0-2 2-2 2-4"/>',
    read: '<path d="M4 5h11v15H6a2 2 0 0 1-2-2z"/><path d="M15 9h5v9a2 2 0 0 1-2 2h-3M7.5 9h4M7.5 12.5h4M7.5 16h4"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    fit: '<path d="M3 12h3l2.5-6 4 12 3-9 1.5 3H21"/>',
    check: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 3 3 5-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    brush: '<path d="M18 3 9 12l3 3 9-9z"/><path d="M9 12c-3 0-5 2-5 5 0 2-1 3-2 3 4 1 9 0 10-5"/>',
    crane: '<path d="M6 21V5h2v16M4 21h8M8 5h12l-3 3M17 8v5"/><rect x="15" y="13" width="4" height="3"/>',
    castle: '<path d="M4 21V9h3v3h3V6h4v6h3V9h3v12z"/><path d="M10.5 21v-4a1.5 1.5 0 0 1 3 0v4"/>',
    car: '<path d="M4 16v-4l2-5h12l2 5v4z"/><circle cx="7.5" cy="17" r="1.8"/><circle cx="16.5" cy="17" r="1.8"/><path d="M4 12h16"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    dragon: '<path d="M3 17c3 0 4-3 7-3s3 3 6 3 4-4 5-7c-3 1-4 0-6-2 0 3-2 4-4 4s-4-2-7 0"/><circle cx="17" cy="8.5" r=".6"/>',
    star: '<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6-4.5-4.1 6-.7z"/>',
    paw: '<circle cx="7" cy="10" r="1.8"/><circle cx="11" cy="6.5" r="1.8"/><circle cx="15.5" cy="7" r="1.8"/><circle cx="18.5" cy="11" r="1.8"/><path d="M8 17c0-3 2-5 4.5-5s4.5 2 4.5 4.5c0 2-1.5 3-3 3-1 0-1.5-.5-2.5-.5S9.5 20 9 20c-1 0-1-1.5-1-3z"/>',
    flute: '<path d="M4 20 18 6M16 4l4 4"/><circle cx="9" cy="15" r=".7"/><circle cx="11.5" cy="12.5" r=".7"/><circle cx="14" cy="10" r=".7"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r=".9"/><circle cx="15" cy="15" r=".9"/><circle cx="15" cy="9" r=".9"/><circle cx="9" cy="15" r=".9"/>',
    swap: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
    plane: '<path d="M10.5 13.5 3 11l1.5-1.5 7.5 1L17 5.5a1.6 1.6 0 0 1 2.3 2.3L14.5 13l1 7.5L14 22l-2.5-7.5"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-5M12 16V8M16 16v-3"/>',
    film: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    bot: '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9.5 16h5"/>',
    browser: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M6.5 6.5h.01M9 6.5h.01"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.sparkle}</svg>`;

  // Every screenshot in page order, for the lightbox's previous/next.
  const gallery = [];
  // Stats: count up once they are on screen
  // A group with nothing to show is left out, in the sections and in the nav
  D.groups = D.groups.filter((g) => (g.apps || []).length + (g.games || []).length + (g.tiles || []).length > 0);
  // Figures that describe the page come from the page's own data
  const shown = { apps: D.groups.reduce((n, g) => n + (g.apps || []).filter((a) => a.views?.length).length + (g.games || []).length, 0), sites: D.groups.reduce((n, g) => n + (g.tiles || []).length, 0) };
  D.stats = D.stats.map((s) => (s.from ? { ...s, n: String(shown[s.from]) } : s)).filter((s) => s.n !== '0');
  $('#stats').innerHTML = D.stats.map((s) => `<div class="stat reveal" style="${s.color ? `--c:${s.color}` : ''}"><b data-n="${esc(s.n)}">${esc(s.n)}</b><span>${esc(s.label)}</span></div>`).join('');
  const countUp = (el) => {
    const target = Number(el.dataset.n);
    if (!Number.isFinite(target) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t0 = performance.now(), dur = 1400;
    const fmt = new Intl.NumberFormat('de-CH');
    const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const counted = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { countUp($('b', e.target)); counted.unobserve(e.target); } }), { threshold: 0.6 });
  document.querySelectorAll('.stat').forEach((el) => counted.observe(el));

  const apps = D.groups.flatMap((g) => [...(g.apps || []), ...(g.games || []), ...(g.tiles || [])].map((a) => ({ ...a, group: g.id })));

  // Marquee: every app as a chip, twice so the loop is seamless
  const chip = (a) => `<a href="#${esc(a.id)}" tabindex="-1" style="--c:${a.color}"><i>${icon(a.icon)}</i>${esc(a.name)}</a>`;
  $('#marquee').innerHTML = apps.map(chip).join('') + apps.map(chip).join('');
  const back = [...apps].reverse();
  $('#marquee2').innerHTML = back.map(chip).join('') + back.map(chip).join('');

  // Stars: a seeded sky, so it looks the same on every visit
  let seed = 7;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  // Clouds in three depths and a few birds; seeded, so the sky looks the same on every visit
  const cloud = '<path d="M20 50a18 18 0 0 1 4-35 26 26 0 0 1 48-6 20 20 0 0 1 30 14 16 16 0 0 1-2 27z"/>';
  $('#clouds').innerHTML = Array.from({ length: 9 }, (_, k) => {
    const depth = k % 3;
    return `<svg class="cloud" viewBox="0 0 120 56" style="--y:${(4 + rnd() * 34).toFixed(1)}%;--w:${[90, 150, 230][depth]}px;--o:${[0.55, 0.75, 0.95][depth]};--t:${[140, 95, 60][depth] + Math.round(rnd() * 30)}s;--d:-${Math.round(rnd() * 120)}s">${cloud}</svg>`;
  }).join('') + Array.from({ length: 4 }, (_, k) => `<svg class="bird" viewBox="0 0 26 12" style="--y:${(12 + k * 7 + rnd() * 6).toFixed(1)}%;--t:${38 + k * 9}s;--d:-${(k * 11).toFixed(0)}s"><path d="M2 8q5-6 11 0q6-6 11 0"/></svg>`).join('');

  // The castle: a keep in the middle, one tower per app spreading out, lower towards the edges
  const W = 1600, G = 540;
  const tower = (a, x, w, h, i) => {
    const y = G - h;
    const roof = rnd() < 0.42;
    let parts = `<rect class="body" x="${x}" y="${y}" width="${w}" height="${h}"/><rect class="shade" x="${x + w * 0.68}" y="${y}" width="${w * 0.32}" height="${h}"/>`;
    if (roof) {
      const top = y - Math.min(90, w * 1.5);
      parts += `<polygon class="roof" points="${x - 4},${y} ${x + w / 2},${top} ${x + w + 4},${y}"/>`;
      if (rnd() < 0.6) parts += `<rect x="${x + w / 2 - 1}" y="${top - 26}" width="2" height="27" fill="#5b4a36"/><path class="pennant" style="--d:-${rnd().toFixed(2)}s" d="M${x + w / 2 + 1} ${top - 25} l18 5 l-18 5z"/>`;
    }
    else {
      const m = Math.max(3, Math.round(w / 12));
      const mw = w / (m * 2 - 1);
      for (let k = 0; k < m; k++) parts += `<rect class="body" x="${(x + k * 2 * mw).toFixed(1)}" y="${y - 9}" width="${mw.toFixed(1)}" height="10"/>`;
    }
    const cols = w > 44 ? 2 : 1, ww = 7, wh = 12;
    for (let r = y + 22; r < G - 30; r += 30) {
      for (let c = 0; c < cols; c++) {
        const wx = cols === 1 ? x + w / 2 - ww / 2 : x + (c ? w * 0.62 : w * 0.24) - ww / 2;
        const lit = rnd() < 0.18;
        parts += `<rect class="win${lit ? ' lit' : ''}" x="${wx.toFixed(1)}" y="${r}" width="${ww}" height="${wh}" rx="3.5" style="--w:${(1.3 + rnd() * 3.5).toFixed(2)}s"/>`;
      }
    }
    return `<g class="tw" data-id="${esc(a.id)}" data-name="${esc(a.name)}" style="--c:${a.color};--d:${(0.15 + i * 0.045).toFixed(2)}s">${parts}</g>`;
  };
  const kw = 170, kx = W / 2 - kw / 2, kh = 400;
  const left = [], right = [];
  let lx = kx - 6, rx = kx + kw + 6;
  apps.forEach((a, i) => {
    const w = 30 + Math.round(rnd() * 22);
    const side = i % 2 ? left : right;
    const pos = side === right ? rx : lx - w;
    const dist = Math.abs(pos + w / 2 - W / 2) / (W / 2);
    const h = Math.round((330 - dist * 230) * (0.7 + rnd() * 0.45));
    side.push(tower(a, pos, w, Math.max(70, h), i));
    if (side === right) rx += w + 5; else lx -= w + 5;
  });
  const keep = `<g class="tw keep" data-id="plattform" data-name="Die Plattform" style="--c:#f4f1ea;--d:0s">
      <rect class="body" x="${kx}" y="${G - kh}" width="${kw}" height="${kh}"/><rect class="shade" x="${kx + kw * 0.7}" y="${G - kh}" width="${kw * 0.3}" height="${kh}"/>
      ${Array.from({ length: 7 }, (_, k) => `<rect class="body" x="${kx + k * (kw / 13) * 2}" y="${G - kh - 14}" width="${kw / 13}" height="15"/>`).join('')}
      <path class="gate" d="M${kx + kw / 2 - 30} ${G} V${G - 70} a30 30 0 0 1 60 0 V${G}z"/>
      ${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect class="win lit" x="${kx + 34 + c * 44}" y="${G - kh + 40 + r * 70}" width="14" height="24" rx="7" style="--w:${(0.8 + r * 0.3 + c * 0.2).toFixed(2)}s"/>`).join('')).join('')}
      <rect x="${kx + kw / 2 - 1.5}" y="${G - kh - 90}" width="3" height="78" fill="#5b4a36"/>
      <path class="flag" d="M${kx + kw / 2 + 1.5} ${G - kh - 88} h54 l-12 15 l12 15 h-54z"/>
    </g>`;
  const wall = `<rect class="wall" x="${lx}" y="${G - 110}" width="${rx - lx}" height="110"/>`;
  $('#castle').innerHTML = `<svg viewBox="0 ${G - 520} ${W} 540" aria-label="Eine Burg aus Apps">${wall}${left.join('')}${right.join('')}${keep}<rect class="ground" x="-200" y="${G}" width="${W + 400}" height="40"/></svg>`;

  // Tooltip and click on a tower
  const tip = document.createElement('div');
  tip.className = 'tip';
  document.body.append(tip);
  const castle = $('#castle');
  castle.addEventListener('pointermove', (e) => {
    const t = e.target.closest('.tw');
    if (!t) { tip.classList.remove('on'); return; }
    tip.innerHTML = `<i style="--c:${t.style.getPropertyValue('--c')}"></i>${esc(t.dataset.name)}`;
    tip.style.left = `${e.clientX}px`; tip.style.top = `${e.clientY}px`;
    tip.classList.add('on');
  });
  castle.addEventListener('pointerleave', () => tip.classList.remove('on'));
  castle.addEventListener('click', (e) => { const t = e.target.closest('.tw'); if (t) goTo(t.dataset.id); });

  // Parallax: the sky layers drift at different speeds while the hero is on screen
  const layers = [['.clouds', 0.35], ['.sunball', 0.28], ['.hills.far', 0.18], ['.hills.near', 0.1], ['.hero-text', 0.28]].map(([q, k]) => [$(q), k]);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;
  addEventListener('scroll', () => {
    if (still || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(scrollY, innerHeight * 1.2);
      layers.forEach(([el, k]) => { el.style.transform = `translate3d(0, ${(y * k).toFixed(1)}px, 0)`; });
      $('.hero-text').style.opacity = String(Math.max(0, 1 - y / (innerHeight * 0.7)));
      ticking = false;
    });
  }, { passive: true });

  const top = $('.top');

  // Groups
  // Three devices and 3–4 views: the tabs switch every device to the same view, crossfading
  const views3 = (a) => {
    const V = a.views;
    const layer = (kind) => V.map((v, k) => {
      if (!v[kind]) return '';
      const i = gallery.push({ src: v[kind], cap: `${a.name} – ${v.title}: ${v.text}` }) - 1;
      const first = V.findIndex((x) => x[kind]);
      // only the first view loads with the page; the others get their src when they are next
      return `<img ${k === first ? 'src' : 'data-src'}="${esc(v[kind])}" alt="${esc(`${a.name}, ${v.title}`)}" data-i="${i}" data-v="${k}" class="${k === first ? 'on' : ''}" loading="lazy" decoding="async">`;
    }).join('');
    return `
      <div class="stage-wrap">
        <div class="trio">
          ${V.some((v) => v.desktop) ? `<div class="dev desk" tabindex="0" role="button" aria-label="${esc(a.name)} am Desktop vergrössern"><div class="bar"><i></i><i></i><i></i></div><div class="screen">${layer('desktop')}</div></div>` : ''}
          ${V.some((v) => v.tablet) ? `<div class="dev tab" tabindex="0" role="button" aria-label="${esc(a.name)} auf dem iPad vergrössern"><div class="screen">${layer('tablet')}</div></div>` : ''}
          ${V.some((v) => v.phone) ? `<div class="dev ph" tabindex="0" role="button" aria-label="${esc(a.name)} auf dem iPhone vergrössern"><div class="screen">${layer('phone')}</div></div>` : ''}
        </div>
        <div class="views" role="tablist" aria-label="Sichten von ${esc(a.name)}">${V.map((v, k) => `
          <button type="button" role="tab" id="${esc(a.id)}-tab-${k}" aria-controls="${esc(a.id)}-panel" class="${k ? '' : 'on'}" data-v="${k}" aria-selected="${!k}" tabindex="${k ? -1 : 0}">
            <span class="n">${String(k + 1).padStart(2, '0')}</span><b>${esc(v.title)}</b><i class="bar"></i>
          </button>`).join('')}</div>
        <div class="caption" role="tabpanel" id="${esc(a.id)}-panel" aria-live="polite">${V.map((v, k) => `<p class="${k ? '' : 'on'}" data-v="${k}">${esc(v.text)}</p>`).join('')}</div>
      </div>`;
  };
  const appHTML = (a) => `
    <article class="app reveal${a.views?.length ? ' has-views' : ''}" id="${esc(a.id)}" style="--c:${a.color}">
      <div class="app-text">
        <div class="app-head"><span class="icon">${icon(a.icon)}</span><div><h3>${esc(a.name)}</h3><div class="who">${esc(a.who || '')}</div></div></div>
        <p class="pitch">${esc(a.pitch)}</p>
        <ul class="feats">${(a.features || []).map((f, k) => `<li style="--k:${k}">${esc(f)}</li>`).join('')}</ul>
        <div class="tags">${(a.tags || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      </div>
      ${views3(a)}
    </article>`;
  // Explorer: the group's apps as tabs over one shared stage
  const explorer = (list) => `
      <div class="explorer reveal">
        ${list.length > 1 ? `<div class="picker" role="tablist" aria-label="Apps">${list.map((a, k) => `<button type="button" role="tab" data-app="${esc(a.id)}" class="${k ? '' : 'on'}" aria-selected="${!k}" style="--c:${a.color}"><i>${icon(a.icon)}</i>${esc(a.name)}</button>`).join('')}</div>` : ''}
        <div class="panels">${list.map((a, k) => appHTML(a).replace('class="app reveal', `class="app${k ? '' : ' on'}`)).join('')}</div>
      </div>`;
  // Small sites: a tile with the first view's desktop shot
  const tileHTML = (t) => {
    const v = (t.views || [])[0];
    const src = v?.desktop || v?.phone;
    const thumb = src ? (() => { const i = gallery.push({ src, cap: `${t.name}: ${v.text}` }) - 1; return `<button type="button" class="thumb" data-i="${i}" aria-label="${esc(t.name)} vergrössern"><img src="${esc(src)}" alt="${esc(`${t.name}, ${v.title}`)}" loading="lazy" decoding="async"></button>`; })()
      : `<div class="thumb empty">${icon(t.icon)}</div>`;
    return `<article class="tile reveal" id="${esc(t.id)}" style="--c:${t.color}">${thumb}<div class="body"><h4>${esc(t.name)}</h4><p>${esc(t.pitch)}</p></div></article>`;
  };
  // Services without a screen of their own: a compact card with icon, pitch and what they do
  const serviceHTML = (a) => `
    <article class="service reveal" id="${esc(a.id)}" style="--c:${a.color}">
      <div class="app-head"><span class="icon">${icon(a.icon)}</span><div><h3>${esc(a.name)}</h3><div class="who">${esc(a.who || '')}</div></div></div>
      <p>${esc(a.pitch)}</p>
      <ul class="feats">${(a.features || []).map((f, k) => `<li style="--k:${k}">${esc(f)}</li>`).join('')}</ul>
      <div class="tags">${(a.tags || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
    </article>`;
  const gameShot = (g, cls) => {
    const v = (g.views || [])[0];
    const src = v?.desktop || v?.tablet || v?.phone;
    if (!src) return `<div class="${cls} empty">${icon(g.icon)}</div>`;
    const i = gallery.push({ src, cap: `${g.name}: ${v.text}` }) - 1;
    (g.views || []).slice(1).forEach((x) => { const s2 = x.desktop || x.tablet || x.phone; if (s2) gallery.push({ src: s2, cap: `${g.name}: ${x.text}` }); });
    return `<button type="button" class="${cls}" data-i="${i}" aria-label="${esc(g.name)} vergrössern"><img src="${esc(src)}" alt="${esc(`${g.name}, ${v.title}`)}" loading="lazy" decoding="async">${g.audience ? `<span class="tagline">${esc(g.audience)}</span>` : ''}</button>`;
  };
  // Games: the big ones get the device stage, the others a card with their first shot
  const gamesHTML = (list) => `
      ${list.some((g) => g.feature && g.views?.length) ? explorer(list.filter((g) => g.feature && g.views?.length)) : ''}
      <div class="games-grid">${list.filter((g) => !g.feature).map((g) => `
        <article class="game reveal" id="${esc(g.id)}" style="--c:${g.color}">
          ${gameShot(g, 'shot')}
          <h4><i>${icon(g.icon)}</i>${esc(g.name)}<small>${esc(g.who || '')}</small></h4>
          <p>${esc(g.pitch)}</p>
        </article>`).join('')}</div>`;
  $('#groups').innerHTML = D.groups.map((g, gi) => {
    const n = (g.apps || []).length + (g.games || []).length + (g.tiles || []).length;
    return `
    <section class="group${g.games ? ' games' : ''}" id="${esc(g.id)}">
      <div class="wrap">
        <div class="section-head reveal"><p class="kicker"><span class="num">${String(gi + 1).padStart(2, '0')}</span> · ${esc(g.kicker)}</p><h2><span class="mask"><span>${esc(g.title)}</span></span><span class="count">${n}&nbsp;${n === 1 ? (g.games ? 'Spiel' : 'App') : g.games ? 'Spiele' : g.tiles ? 'Seiten' : 'Apps'}</span></h2>${g.sub ? `<p class="sub">${esc(g.sub)}</p>` : ''}</div>
        ${g.apps?.some((x) => x.views?.length) ? explorer(g.apps.filter((x) => x.views?.length)) : ''}
        ${g.apps?.some((x) => !x.views?.length) ? `<div class="services">${g.apps.filter((x) => !x.views?.length).map(serviceHTML).join('')}</div>` : ''}
        ${g.games?.length ? gamesHTML(g.games) : ''}
        ${g.tiles?.length ? `<div class="tiles">${g.tiles.map(tileHTML).join('')}</div>` : ''}
      </div>
    </section>`;
  }).join('');


  // Animations that repaint stop while their section is off screen
  new IntersectionObserver(([e]) => $('#hero').classList.toggle('off', !e.isIntersecting)).observe($('#hero'));

  // Platform
  const P = D.platform;
  $('#platform-lead').textContent = P.lead;
  $('#arch').innerHTML = (P.arch || '') + `<ol class="zones">${(P.zones || []).map((z) => `
    <li class="${z.home ? 'home' : ''}"><b>${esc(z.name)}</b><ul>${z.items.map(([t, d]) => `<li><span>${esc(t)}</span>${esc(d)}</li>`).join('')}</ul></li>`).join('')}</ol>`;
  const archSvg = $('#arch svg');
  if (archSvg) new IntersectionObserver(([e]) => (e.isIntersecting && !still ? archSvg.unpauseAnimations() : archSvg.pauseAnimations())).observe(archSvg);
  $('#layers').innerHTML = P.layers.map((l) => `
    <div class="layer reveal" style="--c:${l.color};--k:${P.layers.indexOf(l)}"><h4><i></i>${esc(l.name)}</h4>
      <ul>${l.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      <div class="tools">${(l.tools || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div></div>`).join('');

  // How it is built
  const H = D.how;
  $('#how-lead').textContent = H.lead;
  $('#how').innerHTML = H.cards.map((c, k) => `<div class="card reveal" style="--k:${k};${c.color ? `--c:${c.color}` : ''}">${c.big ? `<span class="big">${esc(c.big)}</span>` : ''}<b>${esc(c.title)}</b><p>${esc(c.text)}</p></div>`).join('');
  $('#timeline').innerHTML = (H.timeline || []).map((t) => `<li class="reveal"><time>${esc(t.date)}</time><span>${esc(t.text)}</span></li>`).join('');

  // Commits per day: one bar a day, milestone days in amber with a dot, bars grow when seen
  const C = H.commits || [];
  if (C.length) {
    const tl = Object.fromEntries((H.timeline || []).map((t) => [t.date.split('.').reverse().join('-'), t.text]));
    const max = Math.max(...C.map(([, n]) => n));
    const top = Math.ceil(max / 100) * 100;
    const narrow = innerWidth < 640;
    const W = narrow ? 440 : 1000, Hh = 300, padL = 44, padB = 34, padT = 26;
    const bw = (W - padL) / C.length;
    const y = (n) => padT + (Hh - padT - padB) * (1 - n / top);
    const fmt = new Intl.NumberFormat('de-CH');
    const day = (d) => `${+d.slice(8)}.${+d.slice(5, 7)}.`;
    const grid = [0, top / 2, top].map((v) => `<line x1="${padL}" x2="${W}" y1="${y(v)}" y2="${y(v)}" class="g"/><text x="${padL - 8}" y="${y(v) + 4}" class="ax" text-anchor="end">${fmt.format(v)}</text>`).join('');
    const bars = C.map(([d, n], i) => {
      const x = padL + i * bw + 1, w = bw - 2, h = Math.max(n ? 3 : 0, (Hh - padT - padB) * n / top), yy = Hh - padB - h;
      const ms = tl[d];
      const tip = `${day(d)} · ${fmt.format(n)} Commits${ms ? ` · ${ms}` : ''}`;
      return `<g class="day${ms ? ' ms' : ''}" style="--i:${i}" tabindex="0" aria-label="${esc(tip)}" data-tip="${esc(tip)}">
        <rect class="hit" x="${padL + i * bw}" y="${padT}" width="${bw}" height="${Hh - padT - padB}"/>
        <path class="bar" d="M${x} ${Hh - padB}V${yy + Math.min(4, h)}q0-4 4-4h${w - 8}q4 0 4 4V${Hh - padB}z"/>
        ${ms ? `<circle cx="${x + w / 2}" cy="${yy - 10}" r="4.5" class="pin"/>` : ''}
        ${i % (narrow ? 5 : 3) === 0 ? `<text x="${x + w / 2}" y="${Hh - 12}" class="ax" text-anchor="middle">${day(d)}</text>` : ''}
      </g>`;
    }).join('');
    const total = C.reduce((a, [, n]) => a + n, 0);
    $('#commits').innerHTML = `
      <figcaption><b>Commits pro Tag</b><span>${fmt.format(total)} vom ${day(C[0][0])} bis ${day(C[C.length - 1][0])}, Tage mit Meilenstein in Gelb</span></figcaption>
      <div class="plot"><svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Commits pro Tag, ${fmt.format(total)} insgesamt">${grid}${bars}<line x1="${padL}" x2="${W}" y1="${Hh - padB}" y2="${Hh - padB}" class="base"/></svg><div class="ctip" role="status"></div></div>
      <table class="sr"><caption>Commits pro Tag</caption><tr><th>Tag</th><th>Commits</th></tr>${C.map(([d, n]) => `<tr><td>${day(d)}</td><td>${n}</td></tr>`).join('')}</table>`;
    const plot = $('#commits .plot'), ctip = $('#commits .ctip');
    const showTip = (g) => {
      const r = g.querySelector('.hit').getBoundingClientRect(), pr = plot.getBoundingClientRect();
      ctip.textContent = g.dataset.tip;
      ctip.style.left = `${Math.min(pr.width - 10, Math.max(10, r.left - pr.left + r.width / 2))}px`;
      ctip.classList.add('on');
      plot.querySelectorAll('.day').forEach((x) => x.classList.toggle('dim', x !== g));
    };
    const hideTip = () => { ctip.classList.remove('on'); plot.querySelectorAll('.day').forEach((x) => x.classList.remove('dim')); };
    plot.querySelectorAll('.day').forEach((g) => { g.addEventListener('pointerenter', () => showTip(g)); g.addEventListener('focus', () => showTip(g)); g.addEventListener('blur', hideTip); });
    plot.addEventListener('pointerleave', hideTip);
  }

  // Timeline: the line fills and the dots light up as it scrolls past
  const tl = $('#timeline');
  const drawTimeline = () => {
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / r.height));
    const tops = [...tl.querySelectorAll('li')].map((li) => [li, li.getBoundingClientRect().top]);
    tl.style.setProperty('--p', p.toFixed(3));
    tops.forEach(([li, t]) => li.classList.toggle('on', t < innerHeight * 0.75));
  };
  let tlOn = false, tlTick = false;
  new IntersectionObserver(([e]) => { tlOn = e.isIntersecting; if (tlOn) drawTimeline(); }).observe(tl);
  addEventListener('scroll', () => {
    if (!tlOn || tlTick) return;
    tlTick = true;
    requestAnimationFrame(() => { drawTimeline(); tlTick = false; });
  }, { passive: true });

  // Nav chips, highlighted while their section is on screen
  const sections = [...D.groups.map((g) => ({ id: g.id, label: g.nav })), { id: 'plattform', label: 'Plattform' }, { id: 'arbeitsweise', label: 'Arbeitsweise' }];
  $('#nav').innerHTML = sections.map((s) => `<a href="#${s.id}" data-id="${s.id}">${esc(s.label)}</a>`).join('');
  const nav = $('#nav');
  const chips = new Map([...document.querySelectorAll('#nav a')].map((a) => [a.dataset.id, a]));
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      chips.forEach((a) => a.classList.remove('on'));
      const on = chips.get(e.target.id);
      if (on) { $('#menu-cur').textContent = on.textContent; on.classList.add('on'); nav.scrollTo({ left: on.offsetLeft - 16, behavior: still ? 'auto' : 'smooth' }); }
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => { const el = document.getElementById(s.id); if (el) spy.observe(el); });

  // Reveal on scroll
  const rev = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => rev.observe(el));

  // Views: click a tab, or let them advance on their own while the app is on screen
  const DWELL = 6500;
  document.querySelectorAll('.app.has-views').forEach((app) => {
    const tabs = [...app.querySelectorAll('.views button')];
    let at = 0, timer = 0, seen = false, held = false;
    const go = (k) => {
      at = (k + tabs.length) % tabs.length;
      tabs.forEach((t, j) => { t.classList.toggle('on', j === at); t.setAttribute('aria-selected', String(j === at)); t.tabIndex = j === at ? 0 : -1; });
      app.querySelectorAll('.caption p').forEach((p) => p.classList.toggle('on', Number(p.dataset.v) === at));
      // a device without a shot for this view keeps showing its last one
      const load = (k) => app.querySelectorAll(`img[data-v="${(k + tabs.length) % tabs.length}"][data-src]`).forEach((im) => { im.src = im.dataset.src; im.removeAttribute('data-src'); });
      load(at); load(at + 1);
      app.querySelectorAll('.screen').forEach((sc) => {
        if (!sc.querySelector(`img[data-v="${at}"]`)) return;
        sc.querySelectorAll('img').forEach((im) => im.classList.toggle('on', Number(im.dataset.v) === at));
      });
      app.style.setProperty('--dwell', `${DWELL}ms`);
      tabs[at].querySelector('.bar').getAnimations?.().forEach((x) => { x.cancel(); x.play(); });
    };
    const live = () => seen && app.classList.contains('on');
    const tick = () => { clearTimeout(timer); app.classList.toggle('playing', live() && !held && !still); if (live() && !held && !still) timer = setTimeout(() => { go(at + 1); tick(); }, DWELL); };
    app.addEventListener('shown', () => { go(0); tick(); });
    const pick = (j) => { held = true; app.classList.add('held'); app.classList.remove('playing'); go(j); clearTimeout(timer); };
    tabs.forEach((t, j) => {
      t.addEventListener('click', () => pick(j));
      t.addEventListener('keydown', (e) => {
        const to = { ArrowRight: j + 1, ArrowLeft: j - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (to === undefined) return;
        e.preventDefault();
        pick((to + tabs.length) % tabs.length);
        tabs[at].focus();
      });
    });
    // preload the next view once the app comes near
    new IntersectionObserver(([e], o) => { if (e.isIntersecting && app.classList.contains('on')) { go(0); o.disconnect(); } }, { rootMargin: '400px 0px' }).observe(app.closest('.explorer') || app);
    new IntersectionObserver(([e]) => { seen = e.isIntersecting; tick(); }, { threshold: 0.3 }).observe(app.closest('.explorer') || app);
  });

  // Explorer: a tab shows its app; arrows move between apps
  const showApp = (ex, id) => {
    ex.querySelectorAll('.picker button').forEach((b) => { const on = b.dataset.app === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; if (on) b.parentElement.scrollTo({ left: b.offsetLeft - 20, behavior: still ? 'auto' : 'smooth' }); });
    ex.querySelectorAll('.panels > .app').forEach((a) => { const on = a.id === id; if (on === a.classList.contains('on')) return; a.classList.toggle('on', on); if (on) a.dispatchEvent(new Event('shown')); });
  };
  document.querySelectorAll('.explorer').forEach((ex) => {
    const btns = [...ex.querySelectorAll('.picker button')];
    btns.forEach((b, j) => {
      b.tabIndex = j ? -1 : 0;
      b.addEventListener('click', () => showApp(ex, b.dataset.app));
      b.addEventListener('keydown', (e) => {
        const to = { ArrowRight: j + 1, ArrowLeft: j - 1, Home: 0, End: btns.length - 1 }[e.key];
        if (to === undefined) return;
        e.preventDefault();
        const t = btns[(to + btns.length) % btns.length];
        showApp(ex, t.dataset.app); t.focus();
      });
    });
  });
  // A link to an app (castle, marquee, address) opens it in its explorer
  const goTo = (id, smooth = true) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const ex = el.closest('.explorer');
    if (ex) showApp(ex, id);
    (ex || el).scrollIntoView({ behavior: smooth && !still ? 'smooth' : 'auto', block: 'start' });
    return true;
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.closest('#nav')) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el?.closest('.explorer')) { e.preventDefault(); goTo(id); history.replaceState(null, '', `#${id}`); }
  });
  if (location.hash.length > 1) requestAnimationFrame(() => goTo(location.hash.slice(1), false));

  // Phone menu: the section list opens under the bar
  const menuBtn = $('.menu-btn');
  menuBtn.addEventListener('click', () => { const open = !top.classList.contains('open'); top.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open)); });
  $('#nav').addEventListener('click', () => { top.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); });

  // Scroll effects in one frame: progress bar, the devices drifting apart in depth
  const bar = $('.progress');
  let fxTick = false;
  const fx = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? (scrollY / h).toFixed(4) : 0})`;
    if (!still) document.querySelectorAll('.app.on .trio').forEach((t) => {
      const r = t.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -0.5 … 0.5 around the middle
      t.style.setProperty('--dy', `${(p * 40).toFixed(1)}px`);
    });
    fxTick = false;
  };
  addEventListener('scroll', () => { if (!fxTick) { fxTick = true; requestAnimationFrame(fx); } }, { passive: true });
  fx();

  // The picker's highlight slides to the chosen app
  document.querySelectorAll('.picker').forEach((pk) => {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pk.prepend(pill);
    const place = () => { const on = pk.querySelector('button.on'); if (on) { pill.style.width = `${on.offsetWidth}px`; pill.style.transform = `translateX(${on.offsetLeft}px)`; } };
    new MutationObserver(place).observe(pk, { subtree: true, attributes: true, attributeFilter: ['class'] });
    addEventListener('resize', place);
    requestAnimationFrame(place);
  });

  // The hero button leans towards the pointer
  const cta = $('.cta');
  if (cta && !still && matchMedia('(pointer: fine)').matches) {
    cta.addEventListener('pointermove', (e) => { const r = cta.getBoundingClientRect(); cta.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1)}px)`; });
    cta.addEventListener('pointerleave', () => { cta.style.transform = ''; });
  }

  // Lightbox
  const box = $('#lightbox');
  let at = 0;
  const show = (i) => {
    at = (i + gallery.length) % gallery.length;
    const s = gallery[at];
    $('img', box).src = s.src; $('img', box).alt = s.cap; $('figcaption', box).textContent = s.cap;
  };
  const open = (el) => { show(Number(el.dataset.i)); box.showModal(); };
  document.addEventListener('click', (e) => {
    const dev = e.target.closest('.dev');
    const el = dev ? dev.querySelector('img.on') : e.target.closest('[data-i]');
    if (el?.dataset.i) open(el);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const dev = e.target.closest?.('.dev');
    if (!dev) return;
    e.preventDefault();
    const el = dev.querySelector('img.on');
    if (el) open(el);
  });
  $('.close', box).onclick = () => box.close();
  $('.prev', box).onclick = () => show(at - 1);
  $('.next', box).onclick = () => show(at + 1);
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  box.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') show(at - 1); if (e.key === 'ArrowRight') show(at + 1); });
})();
