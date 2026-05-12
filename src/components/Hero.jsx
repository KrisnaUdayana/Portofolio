import { useEffect, useRef } from "react";
import Matter from "matter-js";

const YOUR_NAME = "KRISNA UDAYANA";

// Menggunakan data layout asli dari desain referensi
const floatingTags = [
  { label: "SISTEM INFORMASI", top: "15%", left: "10%", rotate: 0 },
  { label: "JUNIOR WEB DEVELOPER", top: "35%", left: "12%", rotate: 0 },
  { label: "FREELANCER", top: "5%", left: "25%", rotate: 85 },
  { label: "UI/UX", top: "40%", left: "28%", rotate: 0 },
  { label: "SAGA ✦", top: "25%", left: "34%", rotate: 30 },
  { label: "</>", top: "35%", left: "44%", rotate: 0, icon: true, dark: true },
  { label: "✳", top: "35%", left: "56%", rotate: 0, icon: true },
];

const { Engine, Bodies, Body, World } = Matter;

const TAG_BASE_STYLE = {
  position: "absolute",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "3px solid #111",
  borderRadius: "999px",
  fontWeight: "900",
  whiteSpace: "nowrap",
  cursor: "grab",
  userSelect: "none",
  touchAction: "none",
  pointerEvents: "auto", // HARUS ADA AGAR BISA DI-KLIK
  willChange: "transform",
  boxShadow: "4px 4px 0 #111", // Gaya brutalism
  left: 0,
  top: 0,
};

function measureTag(label, icon, container) {
  const tmp = document.createElement("div");
  Object.assign(tmp.style, TAG_BASE_STYLE, {
    visibility: "hidden",
    fontSize: icon ? "32px" : "18px",
    padding: icon ? "8px" : "10px 28px",
    width: icon ? "64px" : "auto",
    height: icon ? "64px" : "auto",
  });
  tmp.textContent = label;
  container.appendChild(tmp);
  const w = tmp.offsetWidth;
  const h = tmp.offsetHeight;
  container.removeChild(tmp);
  return { w, h };
}

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const uiRef = useRef(null);
  const stateRef = useRef({ tags: [], dragging: null, offX: 0, offY: 0, engine: null, raf: null });

  useEffect(() => {
    const hero = heroRef.current;
    const nameEl = nameRef.current;
    const uiEl = uiRef.current;
    if (!hero || !nameEl || !uiEl) return;

    const heroRect = hero.getBoundingClientRect();
    const W = heroRect.width;
    const H = heroRect.height;

    // Hitung posisi lantai fisika (floorY) tepat di atas teks H1
    const nameRect = nameEl.getBoundingClientRect();
    const floorY = nameRect.top - heroRect.top - 4;

    // ── Physics engine ──────────────────────────────────────
    const engine = Engine.create({
      gravity: { y: 2.2 },
      positionIterations: 10,
      velocityIterations: 8,
    });
    stateRef.current.engine = engine;
    const world = engine.world;

    const wallL = Bodies.rectangle(-25, H / 2, 50, H * 3, { isStatic: true });
    const wallR = Bodies.rectangle(W + 25, H / 2, 50, H * 3, { isStatic: true });
    // Atur atap (ceiling) tepat di bawah navbar (Navbar memiliki tinggi ~100px)
    // Titik tengah kotak berada di Y=75, tinggi=50, maka batas bawah kotak berada di Y=100
    const ceiling = Bodies.rectangle(W / 2, 75, W * 3, 50, { isStatic: true });
    const floor = Bodies.rectangle(W / 2, floorY, W * 3, 20, { isStatic: true });
    World.add(world, [wallL, wallR, ceiling, floor]);

    // ── Spawn tags ──────────────────────────────────────────
    function spawnTags() {
      stateRef.current.tags.forEach((t) => {
        World.remove(world, t.body);
        t.el.remove();
      });
      stateRef.current.tags = [];

      floatingTags.forEach((t, i) => {
        const { w, h } = measureTag(t.label, t.icon, hero);

        // Posisi spawn berdasarkan persentase asli dari desain referensi
        const startX = W * (parseFloat(t.left) / 100) + w / 2;
        const startY = H * (parseFloat(t.top) / 100) + h / 2;

        const body = Bodies.rectangle(startX, startY, Math.max(w - 14, 20), Math.max(h - 8, 20), {
          restitution: 0.25,
          friction: 0.55,
          frictionAir: 0.018,
          chamfer: { radius: Math.max((h - 8) / 2, 4) },
        });

        // Atur rotasi awal persis seperti desain referensi
        const initialRotateRad = (t.rotate * Math.PI) / 180;
        Body.setAngle(body, initialRotateRad);
        World.add(world, body);

        const el = document.createElement("div");
        Object.assign(el.style, TAG_BASE_STYLE, {
          width: w + "px",
          height: h + "px",
          fontSize: t.icon ? "32px" : "18px",
          padding: t.icon ? "8px" : "10px 28px",
          background: t.dark ? "#111" : "#fff",
          color: t.dark ? "#fff" : "#111",
          zIndex: 20,
        });
        el.textContent = t.label;
        uiEl.appendChild(el);

        stateRef.current.tags.push({ el, body, w, h });
      });
    }
    spawnTags();

    // ── RAF loop (fixed timestep + interpolation) ───────────
    const FIXED_DT = 1000 / 60;
    let lastTime = performance.now();
    let accumulator = 0;

    function loop(now) {
      stateRef.current.raf = requestAnimationFrame(loop);

      const delta = Math.min(now - lastTime, 64);
      lastTime = now;
      accumulator += delta;

      while (accumulator >= FIXED_DT) {
        Engine.update(engine, FIXED_DT);
        accumulator -= FIXED_DT;
      }

      const alpha = accumulator / FIXED_DT;

      stateRef.current.tags.forEach(({ el, body, w, h }) => {
        const px = body.positionPrev ? body.positionPrev.x : body.position.x;
        const py = body.positionPrev ? body.positionPrev.y : body.position.y;
        const pa = body.anglePrev ? body.anglePrev : body.angle;
        const ix = px + (body.position.x - px) * alpha;
        const iy = py + (body.position.y - py) * alpha;
        const ia = pa + (body.angle - pa) * alpha;
        el.style.transform = `translate(${ix - w / 2}px, ${iy - h / 2}px) rotate(${ia}rad)`;
      });
    }
    stateRef.current.raf = requestAnimationFrame(loop);

    // ── Drag helpers ────────────────────────────────────────
    function getXY(e) {
      const r = hero.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      return { cx: src.clientX - r.left, cy: src.clientY - r.top };
    }

    function onDown(e) {
      const { cx, cy } = getXY(e);
      const { tags } = stateRef.current;
      for (let i = tags.length - 1; i >= 0; i--) {
        const { body, w, h, el } = tags[i];
        if (Math.abs(cx - body.position.x) < w / 2 + 12 && Math.abs(cy - body.position.y) < h / 2 + 12) {
          e.preventDefault(); // Hanya prevent default jika berhasil mengenai tag
          stateRef.current.dragging = tags[i];
          stateRef.current.offX = cx - body.position.x;
          stateRef.current.offY = cy - body.position.y;
          Body.setStatic(body, true);
          el.style.boxShadow = "8px 8px 0 #111"; // Hover/drag brutalism shadow
          el.style.zIndex = "50";
          el.style.cursor = "grabbing";
          break;
        }
      }
    }

    function onMove(e) {
      const { dragging, offX, offY } = stateRef.current;
      if (!dragging) return;
      e.preventDefault();
      const { cx, cy } = getXY(e);
      // Batasi bagian atas (100px untuk navbar) dan bawah (lantai)
      const clampedY = Math.max(100 + dragging.h / 2, Math.min(cy - offY, floorY - dragging.h / 2 - 2));
      Body.setPosition(dragging.body, { x: cx - offX, y: clampedY });
    }

    function onUp() {
      const { dragging } = stateRef.current;
      if (!dragging) return;
      Body.setStatic(dragging.body, false);
      Body.setVelocity(dragging.body, { x: (Math.random() - 0.5) * 1.5, y: 0.5 });
      dragging.el.style.boxShadow = "4px 4px 0 #111"; // Reset shadow
      dragging.el.style.zIndex = "20";
      dragging.el.style.cursor = "grab";
      stateRef.current.dragging = null;
    }

    uiEl.addEventListener("mousedown", onDown);
    uiEl.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    // expose reset
    stateRef.current.spawnTags = spawnTags;

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      uiEl.removeEventListener("mousedown", onDown);
      uiEl.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      stateRef.current.tags.forEach((t) => t.el.remove());
      World.clear(world);
      Engine.clear(engine);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center pt-[100px]">
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #e5e5e5 1px, transparent 1px),
                            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Tag UI layer */}
      <div ref={uiRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* Name — jadi lantai fisika */}
      <div className="relative z-10 w-full flex justify-center items-center pointer-events-none px-4">
        <h1 ref={nameRef} className="text-black font-black leading-[0.8] tracking-tighter whitespace-nowrap" style={{ fontSize: "clamp(18px, 8vw, 120px)" }}>
          {YOUR_NAME}
        </h1>
      </div>

      {/* Reset button */}
      <button
        onClick={() => stateRef.current.spawnTags?.()}
        className="absolute bottom-4 right-5 z-50 text-xs py-2 px-4 border-2 border-black rounded-full bg-white text-black font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
      >
        ↺ Reset Posisi
      </button>
    </section>
  );
}
