import React, { useEffect, useRef, useState } from "react";

// ── Phrases the pets can say ─────────────────────────────
const PHRASES = [
  "Hello! 👋",
  "Love you! 💖",
  "Scroll down ↓",
  "Hire me! 🚀",
  "Nice cursor!",
  "Hi there! ✨",
  "Keep going! 💪",
  "Check my work!",
  "Welcome! 🎉",
  "Let's build! 🔨",
];

// ── Geist SVG Sprite ─────────────────────────────────────
function GeistSprite({ flipped, isFleeing }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="64"
      style={{ transform: flipped ? "scaleX(-1)" : "none", display: "block" }}
    >
      {/* Arms */}
      <g className="pet-arm-left" style={{ transformOrigin: "28px 50px" }}>
        <rect x="2" y="45" width="26" height="10" rx="5" fill="#111" />
      </g>
      <g className="pet-arm-right" style={{ transformOrigin: "72px 50px" }}>
        <rect x="72" y="45" width="26" height="10" rx="5" fill="#111" />
      </g>
      
      {/* Legs */}
      <g className="pet-leg-left" style={{ transformOrigin: "36px 70px" }}>
        <rect x="30" y="70" width="12" height="24" rx="6" fill="#111" />
      </g>
      <g className="pet-leg-right" style={{ transformOrigin: "64px 70px" }}>
        <rect x="58" y="70" width="12" height="24" rx="6" fill="#111" />
      </g>

      {/* Brackets */}
      <text x="2" y="62" fontSize="28" fill="#666" fontFamily="monospace" fontWeight="bold">{"{"}</text>
      <text x="82" y="62" fontSize="28" fill="#666" fontFamily="monospace" fontWeight="bold">{"}"}</text>

      {/* Body */}
      <rect x="15" y="15" width="70" height="70" rx="16" fill="#111" />

      {/* Top Dots */}
      <circle cx="32" cy="28" r="5" fill="#ef4444" />
      <circle cx="50" cy="28" r="5" fill="#f59e0b" />
      <circle cx="68" cy="28" r="5" fill="#22c55e" />

      {/* Eyes */}
      {!isFleeing ? (
        <g>
          <rect x="28" y="44" width="14" height="14" rx="4" fill="#fff" />
          <rect x="58" y="44" width="14" height="14" rx="4" fill="#fff" />
        </g>
      ) : (
        <g className="panic-eyes">
          {/* Wide panic eyes */}
          <rect x="26" y="42" width="18" height="18" rx="6" fill="#fff" />
          <rect x="56" y="42" width="18" height="18" rx="6" fill="#fff" />
          {/* Tiny pupils looking back (left relative to SVG) */}
          <circle cx="29" cy="51" r="2.5" fill="#111" />
          <circle cx="59" cy="51" r="2.5" fill="#111" />
          {/* Sweat drop */}
          <path d="M 80 30 Q 84 38 80 42 Q 76 38 80 30" fill="#60a5fa" className="sweat-drop" />
        </g>
      )}
    </svg>
  );
}

// ── Single Pet Component ─────────────────────────────────
function Pet({ initialX, name, mousePos }) {
  const petRef = useRef(null);
  const stateRef = useRef({
    x: initialX,
    vx: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.3),
    targetVx: 0,
    direction: 1,
    isFleeing: false,
    fleeTimer: 0,
  });

  const [pos, setPos] = useState({ x: initialX });
  const [direction, setDirection] = useState(1);
  const [isFleeing, setIsFleeing] = useState(false);
  const [phrase, setPhrase] = useState(null);
  const [isWalking, setIsWalking] = useState(true);
  const phraseTimeout = useRef(null);
  const animRef = useRef(null);

  // Random speech bubble
  useEffect(() => {
    const showPhrase = () => {
      const msg = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      setPhrase(msg);
      if (phraseTimeout.current) clearTimeout(phraseTimeout.current);
      phraseTimeout.current = setTimeout(() => setPhrase(null), 2500);
    };

    const interval = setInterval(showPhrase, 4000 + Math.random() * 6000);
    const initialDelay = setTimeout(showPhrase, 1500 + Math.random() * 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
      if (phraseTimeout.current) clearTimeout(phraseTimeout.current);
    };
  }, []);

  // Main animation loop
  useEffect(() => {
    const FLEE_DISTANCE = 150;
    const FLEE_SPEED = 3.5;
    const WALK_SPEED = 0.35;
    const PET_WIDTH = 64;
    const BOTTOM_OFFSET = 38;
    const LERP = 0.04;

    const animate = () => {
      const s = stateRef.current;
      const screenW = window.innerWidth;

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const petCenterX = s.x + PET_WIDTH / 2;
      const petCenterY = window.innerHeight - BOTTOM_OFFSET;
      const dist = Math.sqrt((mx - petCenterX) ** 2 + (my - petCenterY) ** 2);

      if (dist < FLEE_DISTANCE) {
        s.isFleeing = true;
        s.fleeTimer = 60;
        const fleeDir = petCenterX > mx ? 1 : -1;
        s.targetVx = fleeDir * FLEE_SPEED * Math.max(0.3, 1 - dist / FLEE_DISTANCE);
      } else if (s.fleeTimer > 0) {
        s.fleeTimer--;
        if (s.fleeTimer <= 0) {
          s.isFleeing = false;
          s.targetVx = s.direction * WALK_SPEED;
        }
      } else {
        s.targetVx = s.direction * WALK_SPEED;
      }

      s.vx += (s.targetVx - s.vx) * (s.isFleeing ? 0.12 : LERP);
      s.x += s.vx;

      if (s.x <= 10) {
        s.x = 10;
        s.direction = 1;
        s.targetVx = WALK_SPEED;
      } else if (s.x >= screenW - PET_WIDTH - 10) {
        s.x = screenW - PET_WIDTH - 10;
        s.direction = -1;
        s.targetVx = -WALK_SPEED;
      }

      const facing = s.vx >= 0 ? 1 : -1;

      setPos({ x: s.x });
      setDirection(facing);
      setIsWalking(true);
      setIsFleeing(s.isFleeing);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [mousePos]);

  return (
    <div
      ref={petRef}
      className={`pet-character ${isWalking ? "walking" : ""} ${isFleeing ? "running" : ""}`}
      style={{
        position: "fixed",
        bottom: "24px",
        left: `${pos.x}px`,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* Speech bubble */}
      {phrase && (
        <div className="pet-speech-bubble">
          {phrase}
        </div>
      )}

      {/* Character body */}
      <div className="pet-body">
        <GeistSprite flipped={direction === -1} isFleeing={isFleeing} />
      </div>

      {/* Name tag */}
      <div className="pet-name">{name}</div>
    </div>
  );
}

// ── Main PetCharacters Component ─────────────────────────
export default function PetCharacters() {
  const mousePos = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouse = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      <Pet
        initialX={100}
        name="Krisna"
        mousePos={mousePos}
      />
      <Pet
        initialX={window.innerWidth - 200}
        name="Udayana"
        mousePos={mousePos}
      />
    </>
  );
}
