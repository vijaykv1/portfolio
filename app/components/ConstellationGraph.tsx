"use client";

import { useEffect, useRef, useState } from "react";

/* ── Types ───────────────────────────────────────────────────────── */
type Cat = "arch" | "cloud" | "ai" | "lang" | "domain";

interface Keyword  { label: string; cat: Cat; hub: boolean }
interface CatStyle { fill: string; glow: string; line: string; label: string; lineMax: number }
interface NodeData {
  x: number; y: number; vx: number; vy: number;
  kw: Keyword; r: number; style: CatStyle;
  circle: SVGCircleElement; text: SVGTextElement; g: SVGGElement;
}
interface LineData {
  line: SVGLineElement; a: NodeData; b: NodeData; style: CatStyle;
}

/* ── Data ────────────────────────────────────────────────────────── */
const KEYWORDS: Keyword[] = [
  { label: "Solutions Architect", cat: "arch",   hub: true  },
  { label: "Python",              cat: "lang",   hub: false },
  { label: "AWS",                 cat: "cloud",  hub: false },
  { label: "Test Architecture",   cat: "arch",   hub: false },
  { label: "AI / NLP",            cat: "ai",     hub: false },
  { label: "Docker",              cat: "cloud",  hub: false },
  { label: "Kubernetes",          cat: "cloud",  hub: false },
  { label: "CI/CD",               cat: "cloud",  hub: false },
  { label: "C++",                 cat: "lang",   hub: false },
  { label: "OpenCV",              cat: "ai",     hub: false },
  { label: "Pulumi",              cat: "cloud",  hub: false },
  { label: "Jenkins",             cat: "cloud",  hub: false },
  { label: "GitHub Actions",      cat: "cloud",  hub: false },
  { label: "Computer Vision",     cat: "ai",     hub: false },
  { label: "Embedded Systems",    cat: "domain", hub: false },
  { label: "Ansible",             cat: "cloud",  hub: false },
  { label: "Bazel",               cat: "lang",   hub: false },
  { label: "Automotive",          cat: "domain", hub: false },
  { label: "ZUUL",                cat: "domain", hub: false },
  { label: "Scrum",               cat: "arch",   hub: false },
  { label: "Quality Lead",        cat: "arch",   hub: false },
  { label: "OpenGL",              cat: "lang",   hub: false },
  { label: "BMW Group",           cat: "domain", hub: false },
];

const PALETTE: Record<Cat, { light: CatStyle; dark: CatStyle }> = {
  arch: {
    light: { fill: "#6366f1", glow: "rgba(99,102,241,0.55)",  line: "rgba(99,102,241,_)",  label: "#3730a3", lineMax: 0.45 },
    dark:  { fill: "#a5b4fc", glow: "rgba(165,180,252,0.85)", line: "rgba(165,180,252,_)", label: "#eef2ff", lineMax: 0.70 },
  },
  cloud: {
    light: { fill: "#0ea5e9", glow: "rgba(14,165,233,0.55)",  line: "rgba(14,165,233,_)",  label: "#075985", lineMax: 0.45 },
    dark:  { fill: "#7dd3fc", glow: "rgba(125,211,252,0.85)", line: "rgba(125,211,252,_)", label: "#e0f2fe", lineMax: 0.70 },
  },
  ai: {
    light: { fill: "#a855f7", glow: "rgba(168,85,247,0.55)",  line: "rgba(168,85,247,_)",  label: "#6b21a8", lineMax: 0.45 },
    dark:  { fill: "#e879f9", glow: "rgba(232,121,249,0.85)", line: "rgba(232,121,249,_)", label: "#fae8ff", lineMax: 0.70 },
  },
  lang: {
    light: { fill: "#10b981", glow: "rgba(16,185,129,0.55)",  line: "rgba(16,185,129,_)",  label: "#065f46", lineMax: 0.45 },
    dark:  { fill: "#6ee7b7", glow: "rgba(110,231,183,0.85)", line: "rgba(110,231,183,_)", label: "#ecfdf5", lineMax: 0.70 },
  },
  domain: {
    light: { fill: "#f59e0b", glow: "rgba(245,158,11,0.55)",  line: "rgba(245,158,11,_)",  label: "#78350f", lineMax: 0.45 },
    dark:  { fill: "#fcd34d", glow: "rgba(252,211,77,0.85)",  line: "rgba(252,211,77,_)",  label: "#fefce8", lineMax: 0.70 },
  },
};

const LEGEND: { cat: Cat; label: string }[] = [
  { cat: "arch",   label: "Architecture" },
  { cat: "cloud",  label: "Cloud & DevOps" },
  { cat: "ai",     label: "AI & Vision" },
  { cat: "lang",   label: "Languages" },
  { cat: "domain", label: "Domain" },
];

/* ── Helpers ─────────────────────────────────────────────────────── */
const NS = "http://www.w3.org/2000/svg";
const CONN_DIST  = 130;   // max px for drawing connection lines
const MIN_DIST   = 80;    // repulsion kicks in below this distance
const REPULSION  = 0.55;  // repulsion strength
const SPAWN_MS   = 680;

function oc(tpl: string, o: number) {
  return tpl.replace("_", o.toFixed(2));
}

function isDarkNow() {
  return (
    document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/* ── Component ───────────────────────────────────────────────────── */
export default function ConstellationGraph() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(false);

  /* Track dark mode for legend dots */
  useEffect(() => {
    const sync = () => setDark(isDarkNow());
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", sync);
    return () => { obs.disconnect(); mq.removeEventListener("change", sync); };
  }, []);

  /* ── Imperative SVG graph ──────────────────────────────────────── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let dead = false;
    let raf  = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let ticker: ReturnType<typeof setInterval> | null = null;

    const pick = (cat: Cat): CatStyle =>
      isDarkNow() ? PALETTE[cat].dark : PALETTE[cat].light;

    /* SVG root */
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.cssText = "position:absolute;inset:0;overflow:visible;";
    wrap.appendChild(svg);

    const nodes: NodeData[] = [];
    const lines: LineData[] = [];
    const W = () => wrap.clientWidth  || 360;
    const H = () => wrap.clientHeight || 460;

    /* Spawn a single node */
    function spawn(kw: Keyword, x: number, y: number) {
      const st = pick(kw.cat);
      const r  = kw.hub ? 8 : 5;
      const g  = document.createElementNS(NS, "g");
      g.style.cssText = "opacity:0;transition:opacity 0.3s ease;";

      /* Circle */
      const circle = document.createElementNS(NS, "circle");
      circle.setAttribute("cx", "0");
      circle.setAttribute("cy", "0");
      circle.setAttribute("r",  "0");
      circle.setAttribute("fill",         st.fill);
      circle.setAttribute("stroke",       "rgba(255,255,255,0.45)");
      circle.setAttribute("stroke-width", kw.hub ? "2" : "1.5");
      circle.style.filter = `drop-shadow(0 0 ${kw.hub ? 8 : 4}px ${st.glow})`;

      /* Spring-bounce radius animation */
      const anim = document.createElementNS(NS, "animate");
      anim.setAttribute("attributeName", "r");
      anim.setAttribute("values",    `0;${r * 1.55};${r * 0.85};${r}`);
      anim.setAttribute("keyTimes",  "0;0.55;0.8;1");
      anim.setAttribute("dur",       "0.5s");
      anim.setAttribute("fill",      "freeze");
      anim.setAttribute("begin",     "indefinite");
      circle.appendChild(anim);

      /* Label */
      const text = document.createElementNS(NS, "text");
      text.textContent = kw.label;
      text.setAttribute("x",           String(r + 7));
      text.setAttribute("y",           "4");
      text.setAttribute("font-size",   kw.hub ? "11.5" : "10");
      text.setAttribute("font-family", "'Inter','Segoe UI',sans-serif");
      text.setAttribute("font-weight", kw.hub ? "700" : "500");
      text.setAttribute("fill",        st.label);

      g.append(circle, text);
      g.setAttribute("transform", `translate(${x},${y})`);
      svg.appendChild(g);

      /* Trigger pop-in */
      timers.push(setTimeout(() => { g.style.opacity = "1"; anim.beginElement(); }, 30));

      const nd: NodeData = {
        x, y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        kw, r, style: st, circle, text, g,
      };
      nodes.push(nd);

      /* Connect to nearest existing nodes */
      [...nodes]
        .slice(0, -1)
        .map(n => ({ n, d: Math.hypot(n.x - x, n.y - y) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, kw.hub ? 3 : 2)
        .filter(({ d }) => d < CONN_DIST * 2)
        .forEach(({ n }) => {
          const line = document.createElementNS(NS, "line");
          line.setAttribute("stroke",       oc(st.line, st.lineMax * 0.75));
          line.setAttribute("stroke-width", "1.3");
          line.style.cssText = "opacity:0;transition:opacity 0.5s ease;";
          svg.insertBefore(line, svg.firstChild);
          timers.push(setTimeout(() => (line.style.opacity = "1"), 100));
          lines.push({ line, a: nd, b: n, style: st });
        });
    }

    /* Seed hub */
    spawn(KEYWORDS[0], W() * 0.42, H() * 0.50);

    /* Grow the graph */
    let idx = 1;
    ticker = setInterval(() => {
      if (idx >= KEYWORDS.length || dead) { if (ticker) clearInterval(ticker); return; }
      const anchor = nodes[Math.floor(Math.random() * nodes.length)];
      const ang    = Math.random() * Math.PI * 2;
      const dist   = 95 + Math.random() * 80;
      spawn(
        KEYWORDS[idx++],
        Math.max(14,  Math.min(W() - 115, anchor.x + Math.cos(ang) * dist)),
        Math.max(14,  Math.min(H() - 18,  anchor.y + Math.sin(ang) * dist)),
      );
    }, SPAWN_MS);

    /* Recolour on theme change */
    const themeObs = new MutationObserver(() => {
      nodes.forEach(n => {
        n.style = pick(n.kw.cat);
        n.circle.setAttribute("fill", n.style.fill);
        n.circle.style.filter = `drop-shadow(0 0 ${n.kw.hub ? 8 : 4}px ${n.style.glow})`;
        n.text.setAttribute("fill", n.style.label);
      });
      lines.forEach(l => { l.style = pick(l.a.kw.cat); });
    });
    themeObs.observe(document.documentElement, {
      attributes: true, attributeFilter: ["class"],
    });

    /* ── Pointer / drag state ──────────────────────────────────────── */
    let mx = -999, my = -999;
    let dragNode: NodeData | null = null;
    let lastDX = 0, lastDY = 0;
    let dragVX = 0, dragVY = 0;

    function ptrPos(e: { clientX: number; clientY: number }) {
      const r = wrap!.getBoundingClientRect();
      return { px: e.clientX - r.left, py: e.clientY - r.top };
    }

    function hitTest(px: number, py: number) {
      return nodes.find(n => Math.hypot(n.x - px, n.y - py) < n.r + 14) ?? null;
    }

    /* Mouse */
    const onMouseDown = (e: MouseEvent) => {
      const { px, py } = ptrPos(e);
      const hit = hitTest(px, py);
      if (!hit) return;
      dragNode = hit;
      lastDX = px; lastDY = py;
      dragVX = 0; dragVY = 0;
      hit.vx = 0; hit.vy = 0;
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      const { px, py } = ptrPos(e);
      mx = px; my = py;
      if (dragNode) {
        dragVX = (px - lastDX) * 0.4;
        dragVY = (py - lastDY) * 0.4;
        lastDX = px; lastDY = py;
        dragNode.x = px;
        dragNode.y = py;
        dragNode.vx = 0;
        dragNode.vy = 0;
        wrap.style.cursor = "grabbing";
      } else {
        wrap.style.cursor = hitTest(px, py) ? "grab" : "default";
      }
    };

    const onMouseUp = () => {
      if (dragNode) {
        dragNode.vx = Math.max(-1.5, Math.min(1.5, dragVX));
        dragNode.vy = Math.max(-1.5, Math.min(1.5, dragVY));
        dragNode = null;
      }
      wrap.style.cursor = "";
    };

    const onLeave = () => { mx = -999; my = -999; if (!dragNode) wrap.style.cursor = ""; };

    /* Touch */
    const onTouchStart = (e: TouchEvent) => {
      const { px, py } = ptrPos(e.touches[0]);
      const hit = hitTest(px, py);
      if (!hit) return;
      dragNode = hit;
      lastDX = px; lastDY = py;
      dragVX = 0; dragVY = 0;
      hit.vx = 0; hit.vy = 0;
      e.preventDefault();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragNode) return;
      const { px, py } = ptrPos(e.touches[0]);
      mx = px; my = py;
      dragVX = (px - lastDX) * 0.4;
      dragVY = (py - lastDY) * 0.4;
      lastDX = px; lastDY = py;
      dragNode.x = px;
      dragNode.y = py;
      dragNode.vx = 0;
      dragNode.vy = 0;
      e.preventDefault();
    };

    const onTouchEnd = () => {
      if (dragNode) {
        dragNode.vx = Math.max(-1.5, Math.min(1.5, dragVX));
        dragNode.vy = Math.max(-1.5, Math.min(1.5, dragVY));
        dragNode = null;
      }
      mx = -999; my = -999;
    };

    wrap.addEventListener("mousedown",  onMouseDown);
    wrap.addEventListener("mousemove",  onMouseMove);
    wrap.addEventListener("mouseup",    onMouseUp);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("touchstart", onTouchStart, { passive: false });
    wrap.addEventListener("touchmove",  onTouchMove,  { passive: false });
    wrap.addEventListener("touchend",   onTouchEnd);

    /* Animation loop */
    function loop() {
      if (dead) return;
      const w = W(), h = H();

      nodes.forEach(n => {
        /* Dragged node — manually positioned, skip physics */
        if (n === dragNode) {
          n.circle.setAttribute("r", String(n.r * 1.9));
          n.circle.style.filter = `drop-shadow(0 0 20px ${n.style.glow})`;
          n.text.setAttribute("font-weight", "700");
          n.text.setAttribute("font-size",   "11.5");
          n.g.setAttribute("transform", `translate(${n.x},${n.y})`);
          return;
        }

        n.x += n.vx; n.y += n.vy;
        if (n.x < 10 || n.x > w - 115) n.vx *= -1;
        if (n.y < 10 || n.y > h - 16)  n.vy *= -1;

        const hov = mx !== -999 && Math.hypot(n.x - mx, n.y - my) < 32;
        if (hov) {
          n.circle.setAttribute("r", String(n.r * 1.65));
          n.circle.style.filter = `drop-shadow(0 0 14px ${n.style.glow})`;
          n.text.setAttribute("font-weight", "700");
          n.text.setAttribute("font-size",   "11.5");
        } else {
          n.circle.setAttribute("r", String(n.r));
          n.circle.style.filter = `drop-shadow(0 0 ${n.kw.hub ? 8 : 4}px ${n.style.glow})`;
          n.text.setAttribute("font-weight", n.kw.hub ? "700" : "500");
          n.text.setAttribute("font-size",   n.kw.hub ? "11.5" : "10");
        }
        n.g.setAttribute("transform", `translate(${n.x},${n.y})`);
      });

      /* Repulsion — skip for dragged node */
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === dragNode) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[j] === dragNode) continue;
          const ni = nodes[i], nj = nodes[j];
          const dx = ni.x - nj.x, dy = ni.y - nj.y;
          const d  = Math.sqrt(dx * dx + dy * dy) || 0.1;
          if (d < MIN_DIST) {
            const force = (MIN_DIST - d) / MIN_DIST * REPULSION;
            const fx = (dx / d) * force, fy = (dy / d) * force;
            ni.x += fx; ni.y += fy;
            nj.x -= fx; nj.y -= fy;
          }
        }
      }

      lines.forEach(({ line, a, b, style }) => {
        line.setAttribute("x1", String(a.x)); line.setAttribute("y1", String(a.y));
        line.setAttribute("x2", String(b.x)); line.setAttribute("y2", String(b.y));

        const isDragging = a === dragNode || b === dragNode;
        const hov =
          isDragging ||
          (mx !== -999 &&
            (Math.hypot(a.x - mx, a.y - my) < 32 || Math.hypot(b.x - mx, b.y - my) < 32));

        if (hov) {
          line.setAttribute("stroke",       oc(style.line, 1.0));
          line.setAttribute("stroke-width", isDragging ? "3.2" : "2.8");
        } else {
          const d  = Math.hypot(a.x - b.x, a.y - b.y);
          const op = Math.max(0.12, (1 - d / CONN_DIST) * style.lineMax);
          line.setAttribute("stroke",       oc(style.line, op));
          line.setAttribute("stroke-width", "1.3");
        }
      });

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      if (ticker) clearInterval(ticker);
      themeObs.disconnect();
      wrap.removeEventListener("mousedown",  onMouseDown);
      wrap.removeEventListener("mousemove",  onMouseMove);
      wrap.removeEventListener("mouseup",    onMouseUp);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("touchstart", onTouchStart);
      wrap.removeEventListener("touchmove",  onTouchMove);
      wrap.removeEventListener("touchend",   onTouchEnd);
      wrap.innerHTML = "";
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* SVG canvas */}
      <div ref={wrapRef} className="absolute inset-0" />

      {/* Legend */}
      <div className="absolute bottom-2 left-0 right-0 flex flex-wrap justify-center gap-x-4 gap-y-1 px-2 pointer-events-none">
        {LEGEND.map(({ cat, label }) => (
          <span
            key={cat}
            className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 dark:text-zinc-500"
          >
            <span
              className="inline-block w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: dark ? PALETTE[cat].dark.fill : PALETTE[cat].light.fill }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
