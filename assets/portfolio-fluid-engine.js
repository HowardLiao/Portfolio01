/* ==========================================================================
   Portfolio01 — Executive Hydrodynamic Fluid × Electric Current Engine JS
   Version: 2.0.0
   Modules:
     1. Ambient Hydrodynamic Curl-Flow + Orthogonal Circuit Pulses + Cursor Arcs (#pfFluidCanvas)
     2. Hero Liquid Morphing Aura Injection
     3. Liquid-Glass 3D Spring Tilt + Cursor Specular Highlight
     4. Magnetic Fluid Buttons + Viscous Click Ripples
     5. Staggered Spring Viewport Reveal + Scroll Velocity Coupling
     6. Live Architecture Data-Flow Telemetry Ribbon (#stack / #arch)
     7. Executive Slide-Over Detail Drawer (#pfExecDrawer) w/ Keyboard Nav
     8. Live Fluid×Current Mode Switcher (Calm / Standard / Turbo) + Theme Sync
     9. Electric Border Beam Cards + High-Voltage Reading Progress Tip
    10. 4-Gate Physical Electric Interlock Busbar (#pfGateCircuit)
    11. Live Calculator Current Oscilloscope (.pf-osc-wrap)
    12. Architecture & Route SVG Live Electric Current Pulse Overlay
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
      fluidLabel: '流體×電流',
      calm: '靜謐',
      standard: '平衡',
      turbo: '高壓',
      inspect: '點擊展開詳情',
      drawerEyebrow: '高管戰情細節檢視',
      copyBtn: '複製摘要',
      copied: '✓ 已複製摘要',
      prev: '← 上一項',
      next: '下一項 →',
      flowTitle: '即時資料流狀態',
      flowStatus: 'Clean Core 非侵入式雙環串流 · 99.99% SLA · 零核心改碼',
      gateTitle: '4-Gate 實體電流聯鎖匯流排',
      gatePass: '⚡ 全鏈路通電放行（4/4 導通）',
      gateTrip: (g) => `⚠ GATE 0${g} 斷路阻斷 — 下游失電保護`,
      oscLabel: '即時算力電流示波',
      flowNodes: [
        { id: 's4', label: 'SAP S/4HANA', detail: 'OData / RFC 唯讀事件流，不動核心代碼，2027 切換零干擾。' },
        { id: 'cdc', label: 'Hive CDC 匯流排', detail: 'Debezium + Kafka 毫秒級雙環事件匯流排，對生產 DB 零查詢負載。' },
        { id: 'gw', label: 'HowardRoute 網關', detail: '250+ 模型動態路由，高頻語意快取直通，Token 成本降 20–40%。' },
        { id: 'agent', label: 'HowardAGent 中樞', detail: 'Agentic RAG + MCP 工具封裝，關鍵寫回強制 Human-in-the-Loop 簽核。' }
      ]
    },
    en: {
      fluidLabel: 'Fluid×Arc',
      calm: 'Calm',
      standard: 'Flow',
      turbo: 'Surge',
      inspect: 'Inspect Details',
      drawerEyebrow: 'Executive Dossier Deep-Dive',
      copyBtn: 'Copy Summary',
      copied: '✓ Summary Copied',
      prev: '← Prev',
      next: 'Next →',
      flowTitle: 'Live Architecture Telemetry',
      flowStatus: 'Clean Core Non-Invasive Dual-Bus · 99.99% SLA · Zero Core Mod',
      gateTitle: '4-Gate Electric Interlock Busbar',
      gatePass: '⚡ All Circuits Live (4/4 Energized)',
      gateTrip: (g) => `⚠ GATE 0${g} Open Circuit — Downstream De-energized`,
      oscLabel: 'Live Load Current Waveform',
      flowNodes: [
        { id: 's4', label: 'SAP S/4HANA', detail: 'Read-only OData/RFC event stream — zero core modification for 2027 go-live.' },
        { id: 'cdc', label: 'Hive CDC Bus', detail: 'Debezium + Kafka millisecond dual-ring streaming with zero load on production DB.' },
        { id: 'gw', label: 'HowardRoute GW', detail: '250+ model smart routing & semantic cache reducing token spend by 20–40%.' },
        { id: 'agent', label: 'HowardAGent Hub', detail: 'Agentic RAG + MCP governance with mandatory Human-in-the-Loop write-back.' }
      ]
    },
    ja: {
      fluidLabel: '流体×電流',
      calm: '静謐',
      standard: '標準',
      turbo: '高圧',
      inspect: '詳細を表示',
      drawerEyebrow: 'エグゼクティブ詳細ビュー',
      copyBtn: '要約をコピー',
      copied: '✓ コピー完了',
      prev: '← 前へ',
      next: '次へ →',
      flowTitle: 'リアルタイムデータフロー',
      flowStatus: 'Clean Core 非侵襲デュアルバス · 99.99% SLA · コア無改変',
      gateTitle: '4-Gate 物理電流インターロック',
      gatePass: '⚡ 全系統通電クリア（4/4 導通）',
      gateTrip: (g) => `⚠ GATE 0${g} 遮断検知 — 下流ライン停電保護`,
      oscLabel: 'リアルタイム電流波形',
      flowNodes: [
        { id: 's4', label: 'SAP S/4HANA', detail: 'OData/RFC 読み取り専用ストリーム。コア無改変で2027年移行に完全対応。' },
        { id: 'cdc', label: 'Hive CDC バス', detail: 'Debezium + Kafka ミリ秒級ストリーミング。基幹DBへの負荷ゼロ。' },
        { id: 'gw', label: 'HowardRoute GW', detail: '250+モデルの動的ルーティングと意味キャッシュでトークンコスト20〜40%削減。' },
        { id: 'agent', label: 'HowardAGent 中枢', detail: 'Agentic RAG + MCP 統合。重要書戻しは必ず Human-in-the-Loop 承認を実施。' }
      ]
    }
  }[LANG];

  // Theme-aware hydrodynamic + electric palettes (light vs dark tuned for clear visibility)
  const THEME_PALETTES = {
    default:  { dark: false, primary: [222, 88, 20],  secondary: [245, 158, 11], tertiary: [180, 62, 18],  arc: [234, 88, 12],  core: [255, 237, 213], bgFade: 0.08 },
    pharaoh:  { dark: false, primary: [217, 119, 6],  secondary: [245, 158, 11], tertiary: [180, 83, 9],   arc: [217, 119, 6],  core: [254, 243, 199], bgFade: 0.08 },
    obsidian: { dark: true,  primary: [245, 158, 11], secondary: [56, 189, 248], tertiary: [234, 88, 12],  arc: [56, 189, 248], core: [240, 249, 255], bgFade: 0.11 },
    klimt:    { dark: true,  primary: [212, 175, 55], secondary: [250, 204, 21], tertiary: [180, 130, 30], arc: [253, 224, 71], core: [254, 252, 232], bgFade: 0.10 },
    ninagawa: { dark: true,  primary: [236, 72, 153], secondary: [168, 85, 247], tertiary: [56, 189, 248], arc: [244, 114, 182],core: [253, 242, 248], bgFade: 0.10 },
    miro:     { dark: false, primary: [220, 38, 38],  secondary: [29, 78, 216],  tertiary: [234, 179, 8],  arc: [37, 99, 235],  core: [239, 246, 255], bgFade: 0.08 }
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
      this.sparks = [];
      this.traces = [];
      this.pulses = [];
      this.particles = [];
      this.rafId = null;
      this.paused = false;
      this.lastTs = 0;

      this.resize();
      this.seedParticles();
      this.seedCircuits();
      this.bindEvents();
      this.loop(0);
    }

    seedCircuits() {
      const traceCount = IS_TOUCH ? 7 : (this.w < 900 ? 10 : 16);
      const grid = 64;
      this.traces = [];
      this.pulses = [];
      for (let i = 0; i < traceCount; i++) {
        const pts = [];
        let x = Math.round((Math.random() * this.w) / grid) * grid;
        let y = Math.round((Math.random() * this.h) / grid) * grid;
        pts.push({ x, y });
        const segs = 3 + Math.floor(Math.random() * 4);
        let horiz = Math.random() > 0.5;
        let totalLen = 0;
        for (let s = 0; s < segs; s++) {
          const step = (1 + Math.floor(Math.random() * 3)) * grid * (Math.random() > 0.5 ? 1 : -1);
          const nx = horiz ? Math.max(24, Math.min(this.w - 24, x + step)) : x;
          const ny = horiz ? y : Math.max(24, Math.min(this.h - 24, y + step));
          totalLen += Math.hypot(nx - x, ny - y);
          x = nx; y = ny;
          pts.push({ x, y });
          horiz = !horiz;
        }
        if (totalLen > 60) {
          this.traces.push({ pts, totalLen, phase: Math.random() * Math.PI * 2 });
          this.pulses.push({
            traceIdx: this.traces.length - 1,
            dist: Math.random() * totalLen,
            speed: 1.4 + Math.random() * 1.9,
            dir: Math.random() > 0.5 ? 1 : -1,
            len: 28 + Math.random() * 36
          });
        }
      }
    }

    sampleTrace(trace, dist) {
      let rem = Math.max(0, Math.min(trace.totalLen, dist));
      for (let i = 0; i < trace.pts.length - 1; i++) {
        const a = trace.pts[i], b = trace.pts[i + 1];
        const segLen = Math.hypot(b.x - a.x, b.y - a.y);
        if (rem <= segLen || i === trace.pts.length - 2) {
          const t = segLen > 0 ? rem / segLen : 0;
          return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        }
        rem -= segLen;
      }
      return trace.pts[0];
    }

    drawArc(ctx, x1, y1, x2, y2, col, alpha, jitter) {
      const steps = 6;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = -dy / dist;
      const ny = dx / dist;
      const pts = [{ x: x1, y: y1 }];
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const env = Math.sin(t * Math.PI);
        const off = (Math.random() - 0.5) * 2 * jitter * env;
        pts.push({ x: x1 + dx * t + nx * off, y: y1 + dy * t + ny * off });
      }
      pts.push({ x: x2, y: y2 });

      // Outer electric glow
      ctx.beginPath();
      pts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${alpha * 0.45})`;
      ctx.lineWidth = 3.2;
      ctx.stroke();

      // Inner hot core
      ctx.beginPath();
      pts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = `rgba(255, 252, 240, ${Math.min(0.95, alpha * 0.85)})`;
      ctx.lineWidth = 1.05;
      ctx.stroke();
    }

    resize() {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.canvas.width = Math.floor(this.w * this.dpr);
      this.canvas.height = Math.floor(this.h * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    seedParticles() {
      const baseCount = IS_TOUCH ? 18 : (this.w < 900 ? 24 : 32);
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
        this.seedCircuits();
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
          // Spawn radial transient electric sparks
          const sparkCount = fluidMode === 'turbo' ? 7 : 4;
          for (let s = 0; s < sparkCount; s++) {
            const ang = (Math.PI * 2 * s) / sparkCount + (Math.random() - 0.5) * 0.5;
            const len = (fluidMode === 'turbo' ? 58 : 38) + Math.random() * 28;
            this.sparks.push({
              x1: e.clientX,
              y1: e.clientY,
              x2: e.clientX + Math.cos(ang) * len,
              y2: e.clientY + Math.sin(ang) * len,
              life: 1.0
            });
          }
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

    loop(now) {
      this.rafId = requestAnimationFrame((ts) => this.loop(ts));
      if (this.paused || REDUCED_MOTION) return;
      if (now && now - this.lastTs < 32) return; // ~30fps guard for zero main-thread stalls
      this.lastTs = now || performance.now();

      const ctx = this.ctx;
      const pal = getCurrentPalette();
      const speedMult = fluidMode === 'turbo' ? 1.75 : (fluidMode === 'calm' ? 0.42 : 1.0);
      this.t += 0.022 * speedMult;
      this.scrollVel *= 0.90;

      ctx.clearRect(0, 0, this.w, this.h);

      // Draw gentle hydrodynamic silk ribbons
      const ribbonCount = fluidMode === 'turbo' ? 4 : (fluidMode === 'calm' ? 2 : 3);
      for (let r = 0; r < ribbonCount; r++) {
        const col = r === 0 ? pal.primary : (r === 1 ? pal.secondary : pal.tertiary);
        ctx.beginPath();
        const baseY = (this.h / (ribbonCount + 1)) * (r + 1);
        const amp = (fluidMode === 'turbo' ? 54 : 34) + r * 10;
        const step = 56;
        for (let x = -step; x <= this.w + step; x += step) {
          const wave =
            Math.sin(x * 0.0026 + this.t * (0.9 + r * 0.25) + r * 1.7) * amp +
            Math.cos(x * 0.0048 - this.t * 0.65) * (amp * 0.45);
          let py = baseY + wave - this.scrollVel * (1.2 + r * 0.4);
          if (this.pointer.active) {
            const dx = x - this.pointer.x;
            const dy = py - this.pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 48400) {
              const dist = Math.sqrt(d2);
              const push = (1 - dist / 220) * (fluidMode === 'turbo' ? 38 : 22);
              py += (dy >= 0 ? push : -push);
            }
          }
          if (x === -step) ctx.moveTo(x, py);
          else ctx.lineTo(x, py);
        }
        ctx.strokeStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${fluidMode === 'turbo' ? 0.22 : (fluidMode === 'calm' ? 0.08 : 0.14)})`;
        ctx.lineWidth = fluidMode === 'turbo' ? 2.4 : 1.7;
        ctx.stroke();
      }

      // Update & draw curl-flow energy particles + soft constellation links
      const linkDist = fluidMode === 'turbo' ? 150 : (fluidMode === 'calm' ? 85 : 120);
      const linkDistSq = linkDist * linkDist;
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const f = this.curl(p.x, p.y, this.t);
        p.vx = p.vx * 0.92 + f.fx * 0.22 * speedMult;
        p.vy = p.vy * 0.92 + f.fy * 0.22 * speedMult - this.scrollVel * 0.028;

        // Pointer vortex swirl
        if (this.pointer.active) {
          const dx = p.x - this.pointer.x;
          const dy = p.y - this.pointer.y;
          const d2 = dx * dx + dy * dy;
          const rad = fluidMode === 'turbo' ? 210 : 145;
          if (d2 > 4 && d2 < rad * rad) {
            const d = Math.sqrt(d2);
            const force = (1 - d / rad) * (fluidMode === 'turbo' ? 0.9 : 0.48);
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
        ctx.fillStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${Math.min(0.65, p.alpha * 1.35)})`;
        ctx.fill();

        // Nearby fluid filament connections (squared distance fast-path)
        for (let j = i + 1; j < this.particles.length; j++) {
          const q = this.particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistSq) {
            const dist = Math.sqrt(d2);
            const la = (1 - dist / linkDist) * (fluidMode === 'turbo' ? 0.22 : 0.13);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${pal.primary[0]}, ${pal.primary[1]}, ${pal.primary[2]}, ${la})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw click vortex ripples
      for (let i = this.ripples.length - 1; i >= 0; i--) {
        const rp = this.ripples[i];
        rp.r += fluidMode === 'turbo' ? 6.4 : 4.6;
        rp.alpha *= 0.92;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${pal.primary[0]}, ${pal.primary[1]}, ${pal.primary[2]}, ${rp.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        if (rp.r >= rp.maxR || rp.alpha < 0.015) {
          this.ripples.splice(i, 1);
        }
      }

      // === ELECTRIC LAYER: Orthogonal Circuit Traces + Current Pulses ===
      const arcCol = pal.arc || pal.secondary;
      const coreCol = pal.dark ? [255, 252, 240] : arcCol;
      const traceAlpha = fluidMode === 'turbo' ? 0.26 : (fluidMode === 'calm' ? 0.09 : 0.17);
      for (let tIdx = 0; tIdx < this.traces.length; tIdx++) {
        const tr = this.traces[tIdx];
        ctx.beginPath();
        tr.pts.forEach((pt, idx) => idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y));
        ctx.strokeStyle = `rgba(${arcCol[0]}, ${arcCol[1]}, ${arcCol[2]}, ${traceAlpha})`;
        ctx.lineWidth = fluidMode === 'turbo' ? 1.45 : 1.15;
        ctx.stroke();

        // Via pads at endpoints
        const startPt = tr.pts[0];
        const endPt = tr.pts[tr.pts.length - 1];
        const viaPulse = 0.55 + 0.45 * Math.sin(this.t * 3.1 + tr.phase);
        [startPt, endPt].forEach((vp) => {
          ctx.beginPath();
          ctx.arc(vp.x, vp.y, 2.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${arcCol[0]}, ${arcCol[1]}, ${arcCol[2]}, ${Math.min(0.85, traceAlpha * 2.5 * viaPulse)})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();
        });
      }

      // Moving Current Packets along circuit traces
      const pulseSpeedMult = fluidMode === 'turbo' ? 3.2 : (fluidMode === 'calm' ? 0.75 : 1.85);
      for (let pIdx = 0; pIdx < this.pulses.length; pIdx++) {
        const pu = this.pulses[pIdx];
        const tr = this.traces[pu.traceIdx];
        if (!tr) continue;
        pu.dist += pu.speed * pu.dir * pulseSpeedMult;
        if (pu.dist > tr.totalLen) { pu.dist = tr.totalLen; pu.dir = -1; }
        else if (pu.dist < 0) { pu.dist = 0; pu.dir = 1; }

        const head = this.sampleTrace(tr, pu.dist);
        const tail = this.sampleTrace(tr, pu.dist - pu.dir * pu.len);
        const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        grad.addColorStop(0, `rgba(${arcCol[0]}, ${arcCol[1]}, ${arcCol[2]}, 0)`);
        grad.addColorStop(0.7, `rgba(${arcCol[0]}, ${arcCol[1]}, ${arcCol[2]}, ${fluidMode === 'turbo' ? 0.88 : 0.65})`);
        grad.addColorStop(1, `rgba(${coreCol[0]}, ${coreCol[1]}, ${coreCol[2]}, ${fluidMode === 'turbo' ? 0.98 : 0.88})`);

        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = fluidMode === 'turbo' ? 3.0 : 2.3;
        ctx.stroke();

        // Glowing head packet (visible on both light and dark themes)
        ctx.beginPath();
        ctx.arc(head.x, head.y, fluidMode === 'turbo' ? 5.2 : 3.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${arcCol[0]}, ${arcCol[1]}, ${arcCol[2]}, ${fluidMode === 'calm' ? 0.2 : 0.34})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(head.x, head.y, fluidMode === 'turbo' ? 2.8 : 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${coreCol[0]}, ${coreCol[1]}, ${coreCol[2]}, ${fluidMode === 'calm' ? 0.6 : 0.95})`;
        ctx.fill();
      }

      // Cursor-induced micro electric arcs to nearby circuit vias
      if (!IS_TOUCH && this.pointer.active && fluidMode !== 'calm') {
        const arcRadius = fluidMode === 'turbo' ? 165 : 115;
        let arcsDrawn = 0;
        const maxArcs = fluidMode === 'turbo' ? 3 : 2;
        for (let tIdx = 0; tIdx < this.traces.length && arcsDrawn < maxArcs; tIdx++) {
          const pts = this.traces[tIdx].pts;
          for (let k = 0; k < pts.length && arcsDrawn < maxArcs; k += Math.max(1, pts.length - 1)) {
            const vp = pts[k];
            const dist = Math.hypot(vp.x - this.pointer.x, vp.y - this.pointer.y);
            if (dist < arcRadius && dist > 14) {
              const alpha = (1 - dist / arcRadius) * (fluidMode === 'turbo' ? 0.72 : 0.46);
              this.drawArc(ctx, this.pointer.x, this.pointer.y, vp.x, vp.y, arcCol, alpha, fluidMode === 'turbo' ? 12 : 7);
              arcsDrawn++;
            }
          }
        }
      }

      // Click transient electric sparks
      for (let i = this.sparks.length - 1; i >= 0; i--) {
        const sp = this.sparks[i];
        sp.life -= 0.085;
        if (sp.life <= 0) {
          this.sparks.splice(i, 1);
          continue;
        }
        this.drawArc(ctx, sp.x1, sp.y1, sp.x2, sp.y2, arcCol, sp.life * 0.78, 9);
      }
    }
  }

  /* ========================================================================
     MODULE 2: Hero Liquid Aura + High-Voltage Scan Bar & Avatar Pulse Ring
     ======================================================================== */
  function injectHeroAura() {
    if (REDUCED_MOTION) return;
    const hero = document.querySelector('.hero-bento, .hero-card, .hero');
    if (hero && !hero.querySelector('.pf-hero-aura')) {
      const aura = document.createElement('div');
      aura.className = 'pf-hero-aura';
      aura.setAttribute('aria-hidden', 'true');
      hero.prepend(aura);
    }
    if (hero && !hero.querySelector('.pf-hero-electric-bar')) {
      const bar = document.createElement('div');
      bar.className = 'pf-hero-electric-bar';
      bar.setAttribute('aria-hidden', 'true');
      hero.prepend(bar);
    }
    const avatarWrap = document.querySelector('.portrait-wrapper, .portrait-ring, .hero-portrait-frame, .hero-avatar-wrap');
    if (avatarWrap) {
      avatarWrap.classList.add('pf-avatar-electric');
    }
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
     MODULE 5: Staggered Spring Reveal (Anti-Blank-Viewport Guarded)
     ======================================================================== */
  function initSpringReveals() {
    if (REDUCED_MOTION || !('IntersectionObserver' in window)) return;
    const targets = Array.from(document.querySelectorAll('section .metric-card, section .pillar-card, section .case-card, section .gate-card, section .tri-lane'));
    if (!targets.length) return;

    function revealVisibleNow() {
      const vh = window.innerHeight;
      targets.forEach((el) => {
        if (!el.classList.contains('pf-reveal') || el.classList.contains('pf-revealed')) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh + 140 && r.bottom > -140) {
          el.classList.add('pf-revealed');
        }
      });
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pf-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '140px 0px 140px 0px' });

    targets.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 120) return; // Already in/near view
      el.classList.add('pf-reveal');
      el.style.transitionDelay = ((idx % 4) * 45) + 'ms';
      io.observe(el);
    });

    window.addEventListener('scroll', revealVisibleNow, { passive: true });
    window.addEventListener('hashchange', () => setTimeout(revealVisibleNow, 60));
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
      <span class="pf-dock-label">⚡ ${I18N.fluidLabel}</span>
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
     MODULE 9: Electric Border Beam Cards & High-Voltage Progress Tip
     ======================================================================== */
  function initElectricCardsAndProgress() {
    const cards = document.querySelectorAll(
      '.metric-card, .calc-card, .case-card, .evidence-card, .gate-card, .nd-card-btn, .nd-fit-card, .tri-lane, .tri-routes-card, .pillar-card'
    );
    cards.forEach((c) => c.classList.add('pf-electric-card'));

    const prog = document.getElementById('neonReadingProgress');
    if (prog) prog.classList.add('pf-electric-progress');
  }

  /* ========================================================================
     MODULE 10: 4-Gate Physical Electric Interlock Busbar (#pfGateCircuit)
     ======================================================================== */
  function initGateElectricInterlock() {
    const chks = [1, 2, 3, 4].map((i) => document.getElementById('gateChk' + i)).filter(Boolean);
    const grid = document.querySelector('.gates-grid');
    if (chks.length !== 4 || !grid || document.getElementById('pfGateCircuit')) return;

    const wrap = document.createElement('div');
    wrap.id = 'pfGateCircuit';
    wrap.className = 'pf-gate-circuit';
    wrap.innerHTML = `
      <div class="pf-gate-circuit-head">
        <span class="pf-gate-circuit-title">⚡ ${I18N.gateTitle}</span>
        <span class="pf-gate-circuit-badge" id="pfGateBadge">${I18N.gatePass}</span>
      </div>
      <svg class="pf-gate-svg" viewBox="0 0 800 44" preserveAspectRatio="none" aria-hidden="true">
        <line class="pf-bus-base" x1="60" y1="18" x2="740" y2="18"/>
        <line class="pf-bus-live" id="pfBusSeg0" x1="60"  y1="18" x2="230" y2="18"/>
        <line class="pf-bus-live" id="pfBusSeg1" x1="230" y1="18" x2="400" y2="18"/>
        <line class="pf-bus-live" id="pfBusSeg2" x1="400" y1="18" x2="570" y2="18"/>
        <line class="pf-bus-live" id="pfBusSeg3" x1="570" y1="18" x2="740" y2="18"/>
        <circle class="pf-bus-node is-on" id="pfBusNode0" cx="60"  cy="18" r="6"/>
        <circle class="pf-bus-node is-on" id="pfBusNode1" cx="230" cy="18" r="7"/>
        <circle class="pf-bus-node is-on" id="pfBusNode2" cx="400" cy="18" r="7"/>
        <circle class="pf-bus-node is-on" id="pfBusNode3" cx="570" cy="18" r="7"/>
        <circle class="pf-bus-node is-on" id="pfBusNode4" cx="740" cy="18" r="7"/>
        <text class="pf-bus-label" x="60"  y="39">IN</text>
        <text class="pf-bus-label" x="230" y="39">GATE 01</text>
        <text class="pf-bus-label" x="400" y="39">GATE 02</text>
        <text class="pf-bus-label" x="570" y="39">GATE 03</text>
        <text class="pf-bus-label" x="740" y="39">GATE 04 · RELEASE</text>
      </svg>
    `;
    grid.insertAdjacentElement('beforebegin', wrap);

    const badge = wrap.querySelector('#pfGateBadge');
    const segs = [0, 1, 2, 3].map((i) => wrap.querySelector('#pfBusSeg' + i));
    const nodes = [1, 2, 3, 4].map((i) => wrap.querySelector('#pfBusNode' + i));

    function syncCircuit() {
      let firstFail = -1;
      for (let i = 0; i < 4; i++) {
        if (!chks[i].checked) {
          firstFail = i;
          break;
        }
      }
      if (firstFail === -1) {
        wrap.classList.remove('is-tripped');
        badge.textContent = I18N.gatePass;
        segs.forEach((s) => s.classList.remove('is-off'));
        nodes.forEach((n) => { n.className.baseVal = 'pf-bus-node is-on'; });
      } else {
        wrap.classList.add('is-tripped');
        badge.textContent = I18N.gateTrip(firstFail + 1);
        for (let i = 0; i < 4; i++) {
          segs[i].classList.toggle('is-off', i > firstFail);
          if (i < firstFail) nodes[i].className.baseVal = 'pf-bus-node is-on';
          else if (i === firstFail) nodes[i].className.baseVal = 'pf-bus-node is-fault';
          else nodes[i].className.baseVal = 'pf-bus-node is-dead';
        }
      }
    }

    grid.addEventListener('click', () => setTimeout(syncCircuit, 20));
    chks.forEach((chk) => chk.addEventListener('change', syncCircuit));
    syncCircuit();
  }

  /* ========================================================================
     MODULE 11: Live Calculator Current Oscilloscope (.pf-osc-wrap)
     ======================================================================== */
  function initCalculatorOscilloscopes() {
    if (REDUCED_MOTION) return;
    const calcCards = Array.from(document.querySelectorAll('.calc-card'));
    if (!calcCards.length) return;

    const scopes = [];
    calcCards.forEach((card, idx) => {
      const sliders = Array.from(card.querySelectorAll('input[type="range"]'));
      if (!sliders.length || card.querySelector('.pf-osc-wrap')) return;

      const wrap = document.createElement('div');
      wrap.className = 'pf-osc-wrap';
      wrap.innerHTML = `
        <div class="pf-osc-meta">
          <span>⚡ ${I18N.oscLabel}</span>
          <span class="pf-osc-readout" id="pfOscVal${idx}">48.0 A · 60 Hz</span>
        </div>
        <canvas class="pf-osc-canvas" width="420" height="44" aria-hidden="true"></canvas>
      `;
      card.appendChild(wrap);

      const canvas = wrap.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      const readout = wrap.querySelector('.pf-osc-readout');

      const state = { canvas, ctx, readout, sliders, load: 0.45, surge: 0, phase: idx * 1.3 };

      function computeLoad(triggerSurge) {
        let sum = 0;
        sliders.forEach((sl) => {
          const min = parseFloat(sl.min) || 0;
          const max = parseFloat(sl.max) || 100;
          const val = parseFloat(sl.value) || 0;
          sum += max > min ? (val - min) / (max - min) : 0.5;
        });
        state.load = Math.max(0.12, Math.min(1.0, sum / sliders.length));
        if (triggerSurge) state.surge = 1.0;
        const amps = (18 + state.load * 102).toFixed(1);
        const hz = Math.round(50 + state.load * 70);
        readout.textContent = `${amps} A · ${hz} Hz`;
      }

      sliders.forEach((sl) => sl.addEventListener('input', () => computeLoad(true)));
      computeLoad(false);
      scopes.push(state);
    });

    if (!scopes.length) return;

    let lastScopeTs = 0;
    function tickScopes(now) {
      requestAnimationFrame(tickScopes);
      if (document.hidden) return;
      if (now && now - lastScopeTs < 34) return; // ~30fps guard
      lastScopeTs = now || performance.now();
      const pal = getCurrentPalette();
      const col = pal.arc || pal.primary;
      const modeMult = fluidMode === 'turbo' ? 1.6 : (fluidMode === 'calm' ? 0.45 : 1.0);

      scopes.forEach((sc) => {
        sc.phase += (0.06 + sc.load * 0.14) * modeMult;
        sc.surge *= 0.91;
        const w = sc.canvas.width;
        const h = sc.canvas.height;
        const mid = h / 2;
        const ctx = sc.ctx;

        ctx.clearRect(0, 0, w, h);

        // Subtle oscilloscope center grid line
        ctx.beginPath();
        ctx.moveTo(0, mid);
        ctx.lineTo(w, mid);
        ctx.strokeStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, 0.16)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Live electric current waveform
        const amp = (5 + sc.load * 11 + sc.surge * 7) * (fluidMode === 'calm' ? 0.6 : 1);
        const freq = 0.025 + sc.load * 0.045;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const env = Math.sin((x / w) * Math.PI);
          const harmonic = Math.sin(x * freq * 2.4 - sc.phase * 1.7) * 0.35;
          const jitter = sc.surge > 0.08 ? (Math.random() - 0.5) * 6 * sc.surge : 0;
          const y = mid + (Math.sin(x * freq + sc.phase) + harmonic) * amp * env + jitter;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, 0.88)`;
        ctx.lineWidth = 1.9;
        ctx.stroke();
      });
    }
    tickScopes();
  }

  /* ========================================================================
     MODULE 12: Architecture & Route SVG Live Electric Current Pulse Overlay
     ======================================================================== */
  function initSvgCurrentPulses() {
    if (REDUCED_MOTION) return;
    const svgs = Array.from(document.querySelectorAll('svg')).filter(
      (s) => !s.closest('#pfGateCircuit') && !s.closest('#pfFluidDock')
    );
    let delayIdx = 0;
    svgs.forEach((svg) => {
      const shapes = svg.querySelectorAll('path, line, polyline');
      shapes.forEach((el) => {
        if (el.dataset.pfPulseDone || el.closest('defs') || el.closest('marker')) return;
        const stroke = el.getAttribute('stroke') || getComputedStyle(el).stroke;
        if (!stroke || stroke === 'none') return;
        // Skip tiny icon paths
        try {
          const len = typeof el.getTotalLength === 'function' ? el.getTotalLength() : 0;
          if (len > 0 && len < 42) return;
        } catch (_) {}

        el.dataset.pfPulseDone = '1';
        const clone = el.cloneNode(false);
        clone.removeAttribute('id');
        clone.removeAttribute('marker-end');
        clone.removeAttribute('marker-start');
        clone.classList.add('pf-svg-current-overlay');
        clone.style.animationDelay = ((delayIdx++ % 7) * -0.42).toFixed(2) + 's';
        el.insertAdjacentElement('afterend', clone);
      });
    });
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
    initElectricCardsAndProgress();
    initGateElectricInterlock();
    initCalculatorOscilloscopes();
    initSvgCurrentPulses();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
