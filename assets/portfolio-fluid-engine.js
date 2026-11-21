/* ==========================================================================
   Portfolio01 — Executive Hydrodynamic Fluid & Hyper-Interactive Engine JS
   Version: 1.0.0
   Modules:
     1. Ambient Hydrodynamic Curl-Flow & Pointer Vortex Canvas (#pfFluidCanvas)
     2. Hero Liquid Morphing Aura Injection
     3. Liquid-Glass 3D Spring Tilt + Cursor Specular Highlight
     4. Magnetic Fluid Buttons + Viscous Click Ripples
     5. Staggered Spring Viewport Reveal + Scroll Velocity Coupling
     6. Live Architecture Data-Flow Telemetry Ribbon (#stack / #arch)
     7. Executive Slide-Over Detail Drawer (#pfExecDrawer) w/ Keyboard Nav
     8. Live Fluid Mode Switcher (Calm / Standard / Turbo) + Theme Sync
   ========================================================================== */
(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio01_fluid_mode_v1';
  const REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_TOUCH = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  // Detect page language (zh / en / ja)
  const DOC_LANG = (document.documentElement.lang || 'zh').toLowerCase();
  const LANG = DOC_LANG.startsWith('ja') ? 'ja' : (DOC_LANG.startsWith('en') ? 'en' : 'zh');

  const I18N = {
    zh: {
      fluidLabel: '流體',
      calm: '靜謐',
      standard: '平衡',
      turbo: '渦流',
      inspect: '點擊展開詳情',
      drawerEyebrow: '高管戰情細節檢視',
      copyBtn: '複製摘要',
      copied: '✓ 已複製摘要',
      prev: '← 上一項',
      next: '下一項 →',
      flowTitle: '即時資料流狀態',
      flowStatus: 'Clean Core 非侵入式雙環串流 · 99.99% SLA · 零核心改碼',
      flowNodes: [
        { id: 's4', label: 'SAP S/4HANA', detail: 'OData / RFC 唯讀事件流，不動核心代碼，2027 切換零干擾。' },
        { id: 'cdc', label: 'Hive CDC 匯流排', detail: 'Debezium + Kafka 毫秒級雙環事件匯流排，對生產 DB 零查詢負載。' },
        { id: 'gw', label: 'HowardRoute 網關', detail: '250+ 模型動態路由，高頻語意快取直通，Token 成本降 20–40%。' },
        { id: 'agent', label: 'HowardAGent 中樞', detail: 'Agentic RAG + MCP 工具封裝，關鍵寫回強制 Human-in-the-Loop 簽核。' }
      ]
    },
    en: {
      fluidLabel: 'Fluid',
      calm: 'Calm',
      standard: 'Flow',
      turbo: 'Vortex',
      inspect: 'Inspect Details',
      drawerEyebrow: 'Executive Dossier Deep-Dive',
      copyBtn: 'Copy Summary',
      copied: '✓ Summary Copied',
      prev: '← Prev',
      next: 'Next →',
      flowTitle: 'Live Architecture Telemetry',
      flowStatus: 'Clean Core Non-Invasive Dual-Bus · 99.99% SLA · Zero Core Mod',
      flowNodes: [
        { id: 's4', label: 'SAP S/4HANA', detail: 'Read-only OData/RFC event stream — zero core modification for 2027 go-live.' },
        { id: 'cdc', label: 'Hive CDC Bus', detail: 'Debezium + Kafka millisecond dual-ring streaming with zero load on production DB.' },
        { id: 'gw', label: 'HowardRoute GW', detail: '250+ model smart routing & semantic cache reducing token spend by 20–40%.' },
        { id: 'agent', label: 'HowardAGent Hub', detail: 'Agentic RAG + MCP governance with mandatory Human-in-the-Loop write-back.' }
      ]
    },
    ja: {
      fluidLabel: '流体',
      calm: '静謐',
      standard: '標準',
      turbo: '渦流',
      inspect: '詳細を表示',
      drawerEyebrow: 'エグゼクティブ詳細ビュー',
      copyBtn: '要約をコピー',
      copied: '✓ コピー完了',
      prev: '← 前へ',
      next: '次へ →',
      flowTitle: 'リアルタイムデータフロー',
      flowStatus: 'Clean Core 非侵襲デュアルバス · 99.99% SLA · コア無改変',
      flowNodes: [
        { id: 's4', label: 'SAP S/4HANA', detail: 'OData/RFC 読み取り専用ストリーム。コア無改変で2027年移行に完全対応。' },
        { id: 'cdc', label: 'Hive CDC バス', detail: 'Debezium + Kafka ミリ秒級ストリーミング。基幹DBへの負荷ゼロ。' },
        { id: 'gw', label: 'HowardRoute GW', detail: '250+モデルの動的ルーティングと意味キャッシュでトークンコスト20〜40%削減。' },
        { id: 'agent', label: 'HowardAGent 中枢', detail: 'Agentic RAG + MCP 統合。重要書戻しは必ず Human-in-the-Loop 承認を実施。' }
      ]
    }
  }[LANG];

  // Theme-aware hydrodynamic palettes
  const THEME_PALETTES = {
    default:  { primary: [222, 88, 20],  secondary: [245, 158, 11], tertiary: [168, 50, 18],  bgFade: 0.08 },
    pharaoh:  { primary: [217, 119, 6],  secondary: [245, 158, 11], tertiary: [180, 83, 9],   bgFade: 0.08 },
    obsidian: { primary: [245, 158, 11], secondary: [56, 189, 248], tertiary: [234, 88, 12],  bgFade: 0.11 },
    klimt:    { primary: [212, 175, 55], secondary: [250, 204, 21], tertiary: [180, 130, 30], bgFade: 0.10 },
    ninagawa: { primary: [236, 72, 153], secondary: [168, 85, 247], tertiary: [56, 189, 248], bgFade: 0.10 },
    miro:     { primary: [220, 38, 38],  secondary: [29, 78, 216],  tertiary: [234, 179, 8],  bgFade: 0.08 }
  };

  function getCurrentPalette() {
    const theme = document.documentElement.getAttribute('data-theme') || 'default';
    return THEME_PALETTES[theme] || THEME_PALETTES.default;
  }

  let fluidMode = REDUCED_MOTION ? 'calm' : (localStorage.getItem(STORAGE_KEY) || 'standard');
  if (!['calm', 'standard', 'turbo'].includes(fluidMode)) fluidMode = 'standard';
  document.documentElement.setAttribute('data-pf-fluid', fluidMode);

  /* ========================================================================
     MODULE 1: Ambient Hydrodynamic Curl-Flow & Pointer Vortex Canvas
     ======================================================================== */
  class PortfolioFluidField {
    constructor() {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'pfFluidCanvas';
      this.canvas.setAttribute('aria-hidden', 'true');
      document.body.prepend(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = 0;
      this.h = 0;
      this.t = 0;
      this.scrollVel = 0;
      this.lastScrollY = window.scrollY;
      this.pointer = { x: -999, y: -999, vx: 0, vy: 0, active: false };
      this.ripples = [];
      this.particles = [];
      this.rafId = null;
      this.paused = false;

      this.resize();
      this.seedParticles();
      this.bindEvents();
      this.loop();
    }

    resize() {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.canvas.width = Math.floor(this.w * this.dpr);
      this.canvas.height = Math.floor(this.h * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    seedParticles() {
      const baseCount = IS_TOUCH ? 26 : (this.w < 900 ? 34 : 62);
      this.particles = [];
      for (let i = 0; i < baseCount; i++) {
        this.particles.push(this.createParticle(true));
      }
    }

    createParticle(randomY) {
      return {
        x: Math.random() * this.w,
        y: randomY ? Math.random() * this.h : (Math.random() > 0.5 ? -10 : this.h + 10),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 1.4 + Math.random() * 2.4,
        hueSlot: Math.floor(Math.random() * 3),
        alpha: 0.16 + Math.random() * 0.34,
        phase: Math.random() * Math.PI * 2
      };
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.resize();
        this.seedParticles();
      }, { passive: true });

      window.addEventListener('scroll', () => {
        const dy = window.scrollY - this.lastScrollY;
        this.lastScrollY = window.scrollY;
        this.scrollVel = Math.max(-28, Math.min(28, this.scrollVel * 0.6 + dy * 0.25));
      }, { passive: true });

      if (!IS_TOUCH) {
        window.addEventListener('pointermove', (e) => {
          this.pointer.vx = e.clientX - (this.pointer.x < 0 ? e.clientX : this.pointer.x);
          this.pointer.vy = e.clientY - (this.pointer.y < 0 ? e.clientY : this.pointer.y);
          this.pointer.x = e.clientX;
          this.pointer.y = e.clientY;
          this.pointer.active = true;
        }, { passive: true });

        window.addEventListener('pointerdown', (e) => {
          if (fluidMode === 'calm') return;
          this.ripples.push({
            x: e.clientX,
            y: e.clientY,
            r: 8,
            maxR: fluidMode === 'turbo' ? 210 : 140,
            alpha: 0.36
          });
        }, { passive: true });
      }

      document.addEventListener('visibilitychange', () => {
        this.paused = document.hidden;
      });
    }

    curl(x, y, t) {
      const s = 0.0022;
      const a = Math.sin(x * s + t * 0.35) * Math.cos(y * s - t * 0.28);
      const b = Math.cos(x * s * 1.3 - t * 0.24) * Math.sin(y * s * 1.1 + t * 0.31);
      return {
        fx: Math.cos(a * Math.PI * 1.6) * 0.55 + b * 0.25,
        fy: Math.sin(a * Math.PI * 1.6) * 0.55 - a * 0.22
      };
    }

    loop() {
      this.rafId = requestAnimationFrame(() => this.loop());
      if (this.paused || REDUCED_MOTION) return;

      const ctx = this.ctx;
      const pal = getCurrentPalette();
      const speedMult = fluidMode === 'turbo' ? 1.75 : (fluidMode === 'calm' ? 0.42 : 1.0);
      this.t += 0.012 * speedMult;
      this.scrollVel *= 0.92;

      ctx.clearRect(0, 0, this.w, this.h);

      // Draw gentle hydrodynamic silk ribbons
      const ribbonCount = fluidMode === 'turbo' ? 4 : (fluidMode === 'calm' ? 2 : 3);
      for (let r = 0; r < ribbonCount; r++) {
        const col = r === 0 ? pal.primary : (r === 1 ? pal.secondary : pal.tertiary);
        ctx.beginPath();
        const baseY = (this.h / (ribbonCount + 1)) * (r + 1);
        const amp = (fluidMode === 'turbo' ? 54 : 32) + r * 10;
        const step = 48;
        for (let x = -step; x <= this.w + step; x += step) {
          const wave =
            Math.sin(x * 0.0026 + this.t * (0.9 + r * 0.25) + r * 1.7) * amp +
            Math.cos(x * 0.0048 - this.t * 0.65) * (amp * 0.45);
          let py = baseY + wave - this.scrollVel * (1.2 + r * 0.4);
          if (this.pointer.active) {
            const dx = x - this.pointer.x;
            const dy = py - this.pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 220) {
              const push = (1 - dist / 220) * (fluidMode === 'turbo' ? 38 : 22);
              py += (dy >= 0 ? push : -push);
            }
          }
          if (x === -step) ctx.moveTo(x, py);
          else ctx.lineTo(x, py);
        }
        ctx.strokeStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${fluidMode === 'turbo' ? 0.14 : 0.085})`;
        ctx.lineWidth = fluidMode === 'turbo' ? 2.2 : 1.5;
        ctx.stroke();
      }

      // Update & draw curl-flow energy particles + soft constellation links
      const linkDist = fluidMode === 'turbo' ? 145 : (fluidMode === 'calm' ? 85 : 115);
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const f = this.curl(p.x, p.y, this.t);
        p.vx = p.vx * 0.92 + f.fx * 0.18 * speedMult;
        p.vy = p.vy * 0.92 + f.fy * 0.18 * speedMult - this.scrollVel * 0.025;

        // Pointer vortex swirl
        if (this.pointer.active) {
          const dx = p.x - this.pointer.x;
          const dy = p.y - this.pointer.y;
          const d2 = dx * dx + dy * dy;
          const rad = fluidMode === 'turbo' ? 210 : 145;
          if (d2 > 4 && d2 < rad * rad) {
            const d = Math.sqrt(d2);
            const force = (1 - d / rad) * (fluidMode === 'turbo' ? 0.85 : 0.42);
            // Tangential swirl + gentle outward drift
            p.vx += (-dy / d) * force + (dx / d) * force * 0.25;
            p.vy += (dx / d) * force + (dy / d) * force * 0.25;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport
        if (p.x < -20) p.x = this.w + 20;
        if (p.x > this.w + 20) p.x = -20;
        if (p.y < -20) p.y = this.h + 20;
        if (p.y > this.h + 20) p.y = -20;

        const col = p.hueSlot === 0 ? pal.primary : (p.hueSlot === 1 ? pal.secondary : pal.tertiary);
        const pulse = 0.78 + 0.22 * Math.sin(this.t * 2.5 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${p.alpha})`;
        ctx.fill();

        // Nearby fluid filament connections
        for (let j = i + 1; j < this.particles.length; j++) {
          const q = this.particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const la = (1 - dist / linkDist) * (fluidMode === 'turbo' ? 0.16 : 0.09);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${pal.primary[0]}, ${pal.primary[1]}, ${pal.primary[2]}, ${la})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Draw click vortex ripples
      for (let i = this.ripples.length - 1; i >= 0; i--) {
        const rp = this.ripples[i];
        rp.r += fluidMode === 'turbo' ? 5.2 : 3.6;
        rp.alpha *= 0.94;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${pal.primary[0]}, ${pal.primary[1]}, ${pal.primary[2]}, ${rp.alpha})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        if (rp.r >= rp.maxR || rp.alpha < 0.015) {
          this.ripples.splice(i, 1);
        }
      }
    }
  }

  /* ========================================================================
     MODULE 2: Hero Liquid Aura Injection
     ======================================================================== */
  function injectHeroAura() {
    if (REDUCED_MOTION) return;
    const hero = document.querySelector('.hero-card, .hero');
    if (!hero || hero.querySelector('.pf-hero-aura')) return;
    const aura = document.createElement('div');
    aura.className = 'pf-hero-aura';
    aura.setAttribute('aria-hidden', 'true');
    hero.prepend(aura);
  }

  /* ========================================================================
     MODULE 3: Liquid-Glass 3D Spring Tilt + Cursor Specular Highlight
     ======================================================================== */
  function initTiltCards() {
    if (REDUCED_MOTION || IS_TOUCH) return;
    const selector = [
      '.metric-card', '.pillar-card', '.case-card', '.timeline-card',
      '.gate-card', '.tri-lane', '.calc-card', '.evidence-card',
      '.nd-fit-card', '.phase-card', '.hub-card', '.roadmap-card', '.card.ld'
    ].join(',');
    const cards = document.querySelectorAll(selector);
    cards.forEach((card) => {
      if (card.dataset.pfTiltBound) return;
      card.dataset.pfTiltBound = '1';
      card.classList.add('pf-tilt-card');

      card.addEventListener('pointermove', (e) => {
        if (fluidMode === 'calm') return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        card.style.setProperty('--pf-mx', px.toFixed(1) + '%');
        card.style.setProperty('--pf-my', py.toFixed(1) + '%');

        const maxTilt = fluidMode === 'turbo' ? 6.5 : 3.8;
        const rx = ((0.5 - y / rect.height) * maxTilt).toFixed(2);
        const ry = ((x / rect.width - 0.5) * maxTilt).toFixed(2);
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ========================================================================
     MODULE 4: Magnetic Fluid Buttons + Viscous Click Ripples
     ======================================================================== */
  function initMagneticButtons() {
    const btns = document.querySelectorAll('.btn-hero, .btn-action-primary, .btn-evidence-view, .btn.p, .nd-ctrl-btn');
    btns.forEach((btn) => {
      if (btn.dataset.pfMagBound) return;
      btn.dataset.pfMagBound = '1';
      btn.classList.add('pf-magnetic');

      if (!REDUCED_MOTION && !IS_TOUCH) {
        btn.addEventListener('pointermove', (e) => {
          if (fluidMode === 'calm') return;
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.14;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.14;
          btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
        });
        btn.addEventListener('pointerleave', () => {
          btn.style.transform = '';
        });
      }

      btn.addEventListener('click', (e) => {
        if (REDUCED_MOTION) return;
        const r = btn.getBoundingClientRect();
        const size = Math.max(r.width, r.height) * 0.9;
        const ripple = document.createElement('span');
        ripple.className = 'pf-ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - r.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - r.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });
  }

  /* ========================================================================
     MODULE 5: Staggered Spring Reveal
     ======================================================================== */
  function initSpringReveals() {
    if (REDUCED_MOTION || !('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('section .metric-card, section .pillar-card, section .case-card, section .gate-card, section .tri-lane');
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pf-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    targets.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) return; // Already in view
      el.classList.add('pf-reveal');
      el.style.transitionDelay = ((idx % 4) * 55) + 'ms';
      io.observe(el);
    });
  }

  /* ========================================================================
     MODULE 6: Live Architecture Data-Flow Telemetry Ribbon
     ======================================================================== */
  function initFlowTelemetryRibbon() {
    const anchor = document.querySelector('#stack, #arch');
    if (!anchor || anchor.querySelector('.pf-flow-ribbon')) return;

    const ribbon = document.createElement('div');
    ribbon.className = 'pf-flow-ribbon';
    ribbon.setAttribute('role', 'region');
    ribbon.setAttribute('aria-label', I18N.flowTitle);

    const nodesHtml = I18N.flowNodes.map((n, i) => `
      <button type="button" class="pf-flow-node${i === 0 ? ' active' : ''}" data-flow-idx="${i}">
        <span class="pf-flow-dot"></span>
        <span>${n.label}</span>
      </button>
      ${i < I18N.flowNodes.length - 1 ? '<span class="pf-flow-arrow" aria-hidden="true">➜</span>' : ''}
    `).join('');

    ribbon.innerHTML = `
      <div class="pf-flow-nodes">${nodesHtml}</div>
      <div class="pf-flow-status" id="pfFlowReadout">${I18N.flowNodes[0].detail}</div>
    `;

    const heading = anchor.querySelector('h2, .sec-head, .section-header');
    if (heading && heading.parentNode) {
      heading.insertAdjacentElement('afterend', ribbon);
    } else {
      anchor.prepend(ribbon);
    }

    const readout = ribbon.querySelector('#pfFlowReadout');
    const btns = Array.from(ribbon.querySelectorAll('.pf-flow-node'));
    let activeIdx = 0;

    function selectNode(idx) {
      activeIdx = idx;
      btns.forEach((b, i) => b.classList.toggle('active', i === idx));
      if (readout) readout.textContent = I18N.flowNodes[idx].detail;
    }

    btns.forEach((b) => {
      b.addEventListener('click', () => selectNode(Number(b.dataset.flowIdx)));
    });

    // Subtle auto-cycle every 5.5s unless reduced motion or hovered
    let hovering = false;
    ribbon.addEventListener('pointerenter', () => { hovering = true; });
    ribbon.addEventListener('pointerleave', () => { hovering = false; });
    if (!REDUCED_MOTION) {
      setInterval(() => {
        if (!hovering && !document.hidden) {
          selectNode((activeIdx + 1) % I18N.flowNodes.length);
        }
      }, 5500);
    }
  }

  /* ========================================================================
     MODULE 7: Executive Slide-Over Detail Drawer (#pfExecDrawer)
     ======================================================================== */
  function initExecutiveDrawer() {
    const inspectables = Array.from(document.querySelectorAll('.case-card, .pillar-card, .timeline-card, .phase-card, .nd-fit-card, .tri-lane'));
    if (!inspectables.length) return;

    // Create backdrop & drawer once
    const backdrop = document.createElement('div');
    backdrop.id = 'pfDrawerBackdrop';
    const drawer = document.createElement('aside');
    drawer.id = 'pfExecDrawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = `
      <div class="pf-drawer-head">
        <div>
          <div class="pf-drawer-eyebrow" id="pfDrawerEyebrow">${I18N.drawerEyebrow}</div>
          <h3 class="pf-drawer-title" id="pfDrawerTitle"></h3>
        </div>
        <button type="button" class="pf-drawer-close" id="pfDrawerClose" aria-label="Close">✕</button>
      </div>
      <div class="pf-drawer-body" id="pfDrawerBody"></div>
      <div class="pf-drawer-foot">
        <div class="pf-drawer-nav">
          <button type="button" class="pf-drawer-btn" id="pfDrawerPrev">${I18N.prev}</button>
          <button type="button" class="pf-drawer-btn" id="pfDrawerNext">${I18N.next}</button>
        </div>
        <button type="button" class="pf-drawer-btn primary" id="pfDrawerCopy">${I18N.copyBtn}</button>
      </div>
    `;
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    let currentIndex = -1;

    function extractCardData(card) {
      const eyebrow = card.querySelector('.case-eyebrow, .pillar-tag, .phase-badge, .timeline-period, .eyebrow')?.textContent?.trim() || I18N.drawerEyebrow;
      const title = card.querySelector('h3, h4, .case-title, .timeline-role')?.textContent?.trim() || 'Executive Highlight';
      const badges = Array.from(card.querySelectorAll('.case-cat, .tag, .pill, .badge, .metric-tag')).map(b => b.textContent.trim()).filter(Boolean).slice(0, 6);
      const paragraphs = Array.from(card.querySelectorAll('p, .case-impact-box, .timeline-desc')).map(p => p.textContent.trim()).filter(Boolean);
      const bullets = Array.from(card.querySelectorAll('li')).map(li => li.textContent.trim()).filter(Boolean);
      return { eyebrow, title, badges, paragraphs, bullets };
    }

    function openDrawer(idx) {
      currentIndex = (idx + inspectables.length) % inspectables.length;
      const data = extractCardData(inspectables[currentIndex]);
      drawer.querySelector('#pfDrawerEyebrow').textContent = `${data.eyebrow} (${currentIndex + 1}/${inspectables.length})`;
      drawer.querySelector('#pfDrawerTitle').textContent = data.title;

      let html = '';
      if (data.badges.length) {
        html += `<div class="pf-drawer-badges">${data.badges.map(b => `<span class="pf-drawer-badge">${b}</span>`).join('')}</div>`;
      }
      data.paragraphs.forEach((p) => { html += `<p>${p}</p>`; });
      if (data.bullets.length) {
        html += `<ul>${data.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
      }
      drawer.querySelector('#pfDrawerBody').innerHTML = html;

      backdrop.classList.add('open');
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
    }

    function closeDrawer() {
      backdrop.classList.remove('open');
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    }

    inspectables.forEach((card, idx) => {
      if (card.dataset.pfDrawerBound) return;
      card.dataset.pfDrawerBound = '1';
      card.classList.add('pf-inspectable');
      if (!card.querySelector('.pf-inspect-hint')) {
        const hint = document.createElement('span');
        hint.className = 'pf-inspect-hint';
        hint.textContent = '✦ ' + I18N.inspect;
        card.appendChild(hint);
      }
      card.addEventListener('click', (e) => {
        if (e.target.closest('a, button, input, summary')) return;
        openDrawer(idx);
      });
    });

    backdrop.addEventListener('click', closeDrawer);
    drawer.querySelector('#pfDrawerClose').addEventListener('click', closeDrawer);
    drawer.querySelector('#pfDrawerPrev').addEventListener('click', () => openDrawer(currentIndex - 1));
    drawer.querySelector('#pfDrawerNext').addEventListener('click', () => openDrawer(currentIndex + 1));

    drawer.querySelector('#pfDrawerCopy').addEventListener('click', () => {
      if (currentIndex < 0) return;
      const data = extractCardData(inspectables[currentIndex]);
      const summary = `${data.title}\n${data.paragraphs.join('\n')}\n${data.bullets.map(b => '• ' + b).join('\n')}`.trim();
      navigator.clipboard?.writeText(summary).then(() => {
        const btn = drawer.querySelector('#pfDrawerCopy');
        btn.textContent = I18N.copied;
        setTimeout(() => { btn.textContent = I18N.copyBtn; }, 1800);
      }).catch(() => {});
    });

    document.addEventListener('keydown', (e) => {
      if (!drawer.classList.contains('open')) return;
      if (e.key === 'Escape') closeDrawer();
      else if (e.key === 'ArrowRight') openDrawer(currentIndex + 1);
      else if (e.key === 'ArrowLeft') openDrawer(currentIndex - 1);
    });
  }

  /* ========================================================================
     MODULE 8: Live Fluid Energy Mode Switcher Pill (#pfFluidDock)
     ======================================================================== */
  function initFluidModeDock() {
    if (REDUCED_MOTION || document.getElementById('pfFluidDock')) return;
    const dock = document.createElement('div');
    dock.id = 'pfFluidDock';
    dock.setAttribute('role', 'group');
    dock.setAttribute('aria-label', 'Fluid motion intensity');
    dock.innerHTML = `
      <span class="pf-dock-label">🌊 ${I18N.fluidLabel}</span>
      <button type="button" class="pf-mode-btn" data-pf-mode="calm">${I18N.calm}</button>
      <button type="button" class="pf-mode-btn" data-pf-mode="standard">${I18N.standard}</button>
      <button type="button" class="pf-mode-btn" data-pf-mode="turbo">${I18N.turbo}</button>
    `;
    document.body.appendChild(dock);

    const btns = Array.from(dock.querySelectorAll('.pf-mode-btn'));
    function setMode(mode) {
      fluidMode = mode;
      document.documentElement.setAttribute('data-pf-fluid', mode);
      try { localStorage.setItem(STORAGE_KEY, mode); } catch (_) {}
      btns.forEach((b) => b.classList.toggle('active', b.dataset.pfMode === mode));
    }

    btns.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.pfMode)));
    setMode(fluidMode);
  }

  /* ========================================================================
     Bootstrap
     ======================================================================== */
  function boot() {
    if (!REDUCED_MOTION) {
      window.__pfFluidField = new PortfolioFluidField();
    }
    injectHeroAura();
    initTiltCards();
    initMagneticButtons();
    initSpringReveals();
    initFlowTelemetryRibbon();
    initExecutiveDrawer();
    initFluidModeDock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
