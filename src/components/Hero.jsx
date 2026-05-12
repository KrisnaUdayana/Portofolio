import { useEffect, useRef } from "react";
import Matter from "matter-js";

const YOUR_NAME = "KRISNA UDAYANA";

const floatingTags = [
  { label: "SISTEM INFORMASI",     top: "15%", left: "10%", rotate: 0  },
  { label: "JUNIOR WEB DEVELOPER", top: "35%", left: "12%", rotate: 0  },
  { label: "FREELANCER",           top: "5%",  left: "25%", rotate: 85 },
  { label: "UI/UX",                top: "40%", left: "28%", rotate: 0  },
  { label: "SAGA ✦",               top: "25%", left: "34%", rotate: 30 },
  { label: "</>",  top: "35%", left: "44%", rotate: 0, icon: true, dark: true },
  { label: "✳",    top: "35%", left: "56%", rotate: 0, icon: true },
];

const { Engine, Bodies, Body, World, Events } = Matter;

const TAG_BASE_STYLE = {
  position:       "absolute",
  display:        "inline-flex",
  alignItems:     "center",
  justifyContent: "center",
  border:         "3px solid #111",
  borderRadius:   "999px",
  fontWeight:     "900",
  whiteSpace:     "nowrap",
  cursor:         "grab",
  userSelect:     "none",
  touchAction:    "none",
  willChange:     "transform",
  boxShadow:      "4px 4px 0 #111",
  left:           0,
  top:            0,
  pointerEvents:  "auto",
};

// ─── Web Audio Sound Engine ───────────────────────────────────────────────────
function createSoundEngine() {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // Utility: connect nodes to destination with master gain
  function play(buildFn) {
    try {
      const c      = getCtx();
      const master = c.createGain();
      master.gain.value = 0.5;
      master.connect(c.destination);
      buildFn(c, master);
    } catch (_) {}
  }

  // 🎵 POP — saat pickup tag (cartoonish cork pop)
  function playPickup() {
    play((c, out) => {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(out);

      osc.type = "sine";
      const now = c.currentTime;
      // Pitch naik cepat = pop!
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);

      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.start(now);
      osc.stop(now + 0.12);
    });
  }

  // 🎵 BOING — saat dilepas / drop
  function playDrop() {
    play((c, out) => {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(out);

      osc.type = "sine";
      const now = c.currentTime;
      // Pitch turun = boing!
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.start(now);
      osc.stop(now + 0.25);
    });
  }

  // 🎵 CLICK — saat tag bentur tag lain
  function playCollision(speed = 1) {
    play((c, out) => {
      // White noise burst singkat
      const bufferSize = c.sampleRate * 0.06;
      const buffer     = c.createBuffer(1, bufferSize, c.sampleRate);
      const data       = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const source = c.createBufferSource();
      source.buffer = buffer;

      const filter = c.createBiquadFilter();
      filter.type      = "bandpass";
      filter.frequency.value = 800 + speed * 200;
      filter.Q.value   = 2;

      const gain = c.createGain();
      const vol  = Math.min(0.4, 0.1 + speed * 0.05);
      const now  = c.currentTime;
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(out);
      source.start(now);
      source.stop(now + 0.06);
    });
  }

  // 🎵 THUD — saat tag mendarat di lantai (nama)
  function playLand(speed = 1) {
    play((c, out) => {
      // Low thud = sine pitch drop + noise
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(out);

      osc.type = "sine";
      const now = c.currentTime;
      const vol = Math.min(0.7, 0.3 + speed * 0.04);
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);

      // Tambah noise layer
      const bufSize = c.sampleRate * 0.1;
      const buf     = c.createBuffer(1, bufSize, c.sampleRate);
      const d       = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      const ns  = c.createBufferSource();
      ns.buffer = buf;
      const nf  = c.createBiquadFilter();
      nf.type   = "lowpass";
      nf.frequency.value = 300;
      const ng  = c.createGain();
      ng.gain.setValueAtTime(vol * 0.4, now);
      ng.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      ns.connect(nf); nf.connect(ng); ng.connect(out);
      ns.start(now); ns.stop(now + 0.12);
    });
  }

  return { playPickup, playDrop, playCollision, playLand };
}

// ─── Measure tag DOM size ─────────────────────────────────────────────────────
function measureTag(label, icon, container) {
  const tmp = document.createElement("div");
  Object.assign(tmp.style, TAG_BASE_STYLE, {
    visibility: "hidden",
    fontSize:   icon ? "32px" : "18px",
    padding:    icon ? "8px"  : "10px 28px",
    width:      icon ? "64px" : "auto",
    height:     icon ? "64px" : "auto",
  });
  tmp.textContent = label;
  container.appendChild(tmp);
  const w = tmp.offsetWidth;
  const h = tmp.offsetHeight;
  container.removeChild(tmp);
  return { w, h };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef  = useRef(null);
  const nameRef  = useRef(null);
  const uiRef    = useRef(null);
  const stateRef = useRef({
    tags: [], dragging: null,
    offX: 0, offY: 0, floorY: 0,
    engine: null, raf: null,
    spawnTags: null, cleanup: null,
    sound: null,
  });

  useEffect(() => {
    const hero   = heroRef.current;
    const nameEl = nameRef.current;
    const uiEl   = uiRef.current;
    if (!hero || !nameEl || !uiEl) return;

    // Init sound engine
    stateRef.current.sound = createSoundEngine();

    const timer = setTimeout(() => {
      const heroRect = hero.getBoundingClientRect();
      const W = heroRect.width;
      const H = heroRect.height;

      const nameRect = nameEl.getBoundingClientRect();
      const floorY   = nameRect.top - heroRect.top - 4;
      stateRef.current.floorY = floorY;

      // ── Physics ────────────────────────────────────────────
      const engine = Engine.create({
        gravity:            { y: 2.2 },
        positionIterations: 10,
        velocityIterations: 8,
      });
      stateRef.current.engine = engine;
      const world = engine.world;

      const floorBody = Bodies.rectangle(W / 2, floorY, W * 3, 20, { isStatic: true, label: "floor" });
      World.add(world, [
        Bodies.rectangle(-25,    H / 2, 50,    H * 3, { isStatic: true, label: "wall" }),
        Bodies.rectangle(W + 25, H / 2, 50,    H * 3, { isStatic: true, label: "wall" }),
        Bodies.rectangle(W / 2,  -25,   W * 3, 50,    { isStatic: true, label: "ceiling" }),
        floorBody,
      ]);

      // ── Collision sound detection ──────────────────────────
      const lastCollisionTime = new Map();

      Events.on(engine, "collisionStart", (event) => {
        const { sound } = stateRef.current;
        if (!sound) return;

        event.pairs.forEach(({ bodyA, bodyB, collision }) => {
          const speed = collision?.depth ?? 1;
          const key   = [bodyA.id, bodyB.id].sort().join("-");
          const now   = Date.now();

          // Throttle: max 1 suara per pasangan per 80ms
          if (lastCollisionTime.get(key) && now - lastCollisionTime.get(key) < 80) return;
          lastCollisionTime.set(key, now);

          const isFloor = bodyA.label === "floor" || bodyB.label === "floor";
          const isWall  = bodyA.label === "wall"  || bodyB.label === "wall" ||
                          bodyA.label === "ceiling" || bodyB.label === "ceiling";

          if (isFloor) {
            // Hanya thud kalau cukup kencang
            if (speed > 0.5) sound.playLand(speed);
          } else if (!isWall) {
            // Tag vs tag
            if (speed > 0.3) sound.playCollision(speed);
          }
        });
      });

      // ── Spawn tags ─────────────────────────────────────────
      function spawnTags() {
        stateRef.current.tags.forEach((t) => {
          World.remove(world, t.body);
          t.el.remove();
        });
        stateRef.current.tags = [];

        floatingTags.forEach((t) => {
          const { w, h } = measureTag(t.label, t.icon, hero);
          const startX = W * (parseFloat(t.left) / 100) + w / 2;
          const startY = H * (parseFloat(t.top)  / 100) + h / 2;

          const body = Bodies.rectangle(
            startX, startY,
            Math.max(w - 14, 20),
            Math.max(h - 8,  20),
            {
              restitution: 0.25,
              friction:    0.55,
              frictionAir: 0.018,
              chamfer:     { radius: Math.max((h - 8) / 2, 4) },
              label:       "tag",
            }
          );
          Body.setAngle(body, (t.rotate * Math.PI) / 180);
          World.add(world, body);

          const el = document.createElement("div");
          Object.assign(el.style, TAG_BASE_STYLE, {
            width:      w + "px",
            height:     h + "px",
            fontSize:   t.icon ? "32px" : "18px",
            padding:    t.icon ? "8px"  : "10px 28px",
            background: t.dark ? "#111" : "#fff",
            color:      t.dark ? "#fff" : "#111",
            zIndex:     "20",
          });
          el.textContent = t.label;
          uiEl.appendChild(el);

          stateRef.current.tags.push({ el, body, w, h });
        });
      }
      spawnTags();
      stateRef.current.spawnTags = spawnTags;

      // ── RAF loop ───────────────────────────────────────────
      const FIXED_DT  = 1000 / 60;
      let lastTime    = performance.now();
      let accumulator = 0;

      function loop(now) {
        stateRef.current.raf = requestAnimationFrame(loop);
        const delta = Math.min(now - lastTime, 64);
        lastTime     = now;
        accumulator += delta;
        while (accumulator >= FIXED_DT) {
          Engine.update(engine, FIXED_DT);
          accumulator -= FIXED_DT;
        }
        const alpha = accumulator / FIXED_DT;
        stateRef.current.tags.forEach(({ el, body, w, h }) => {
          const px = body.positionPrev?.x ?? body.position.x;
          const py = body.positionPrev?.y ?? body.position.y;
          const pa = body.anglePrev       ?? body.angle;
          const ix = px + (body.position.x - px) * alpha;
          const iy = py + (body.position.y - py) * alpha;
          const ia = pa + (body.angle       - pa) * alpha;
          el.style.transform = `translate(${ix - w / 2}px, ${iy - h / 2}px) rotate(${ia}rad)`;
        });
      }
      stateRef.current.raf = requestAnimationFrame(loop);

      // ── Drag ───────────────────────────────────────────────
      function getXY(e) {
        const r   = hero.getBoundingClientRect();
        const src = e.touches ? e.touches[0] : e;
        return { cx: src.clientX - r.left, cy: src.clientY - r.top };
      }

      function onDown(e) {
        const { cx, cy } = getXY(e);
        for (let i = stateRef.current.tags.length - 1; i >= 0; i--) {
          const { body, w, h, el } = stateRef.current.tags[i];
          if (
            Math.abs(cx - body.position.x) < w / 2 + 12 &&
            Math.abs(cy - body.position.y) < h / 2 + 12
          ) {
            e.preventDefault();
            stateRef.current.dragging = stateRef.current.tags[i];
            stateRef.current.offX     = cx - body.position.x;
            stateRef.current.offY     = cy - body.position.y;
            Body.setStatic(body, true);
            el.style.boxShadow = "8px 8px 0 #111";
            el.style.zIndex    = "50";
            el.style.cursor    = "grabbing";

            // 🔊 Suara pickup
            stateRef.current.sound?.playPickup();
            break;
          }
        }
      }

      function onMove(e) {
        const { dragging, offX, offY, floorY: fy } = stateRef.current;
        if (!dragging) return;
        e.preventDefault();
        const { cx, cy } = getXY(e);
        const heroRect = hero.getBoundingClientRect();
        const W = heroRect.width;

        let newX = cx - offX;
        let newY = cy - offY;

        // Batasi X agar tidak tembus tembok kiri dan kanan
        if (newX < dragging.w / 2) newX = dragging.w / 2;
        if (newX > W - dragging.w / 2) newX = W - dragging.w / 2;

        // Batasi Y agar tidak tembus langit-langit atau lantai
        if (newY < dragging.h / 2) newY = dragging.h / 2;
        if (newY > fy - dragging.h / 2 - 2) newY = fy - dragging.h / 2 - 2;

        Body.setPosition(dragging.body, { x: newX, y: newY });
      }

      function onUp() {
        const { dragging } = stateRef.current;
        if (!dragging) return;
        Body.setStatic(dragging.body, false);
        Body.setVelocity(dragging.body, { x: (Math.random() - 0.5) * 1.5, y: 0.5 });
        dragging.el.style.boxShadow = "4px 4px 0 #111";
        dragging.el.style.zIndex    = "20";
        dragging.el.style.cursor    = "grab";

        // 🔊 Suara drop/boing
        stateRef.current.sound?.playDrop();
        stateRef.current.dragging = null;
      }

      hero.addEventListener("mousedown",   onDown);
      hero.addEventListener("touchstart",  onDown, { passive: false });
      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("mouseup",   onUp);
      window.addEventListener("touchend",  onUp);

      stateRef.current.cleanup = () => {
        cancelAnimationFrame(stateRef.current.raf);
        Events.off(engine, "collisionStart");
        hero.removeEventListener("mousedown",   onDown);
        hero.removeEventListener("touchstart",  onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("mouseup",   onUp);
        window.removeEventListener("touchend",  onUp);
        stateRef.current.tags.forEach((t) => t.el.remove());
        World.clear(world);
        Engine.clear(engine);
      };
    }, 50);

    return () => {
      clearTimeout(timer);
      stateRef.current.cleanup?.();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center pt-[100px]"
    >
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
      <div
        ref={uiRef}
        className="absolute inset-0 z-20"
        style={{ pointerEvents: "none" }}
      />

      {/* Name — lantai fisika */}
      <div className="relative z-10 w-full flex justify-center items-center pointer-events-none px-4">
        <h1
          ref={nameRef}
          className="text-black font-black leading-[0.8] tracking-tighter whitespace-nowrap"
          style={{ fontSize: "clamp(18px, 8vw, 120px)" }}
        >
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