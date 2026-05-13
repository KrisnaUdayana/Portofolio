import React, { useEffect, useRef, useState, useCallback } from "react";

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

// ── Character SVG sprites ────────────────────────────────
function CharacterSprite({ color, flipped }) {
  return (
    <svg
      width="48"
      height="60"
      viewBox="0 0 32 40"
      fill="none"
      style={{ transform: flipped ? "scaleX(-1)" : "none" }}
    >
      {/* Head */}
      <rect x="8" y="0" width="16" height="16" rx="6" fill={color} />
      {/* Eyes */}
      <circle cx="13" cy="8" r="2" fill="#fff" />
      <circle cx="19" cy="8" r="2" fill="#fff" />
      <circle cx="13.5" cy="8.5" r="1" fill="#111" />
      <circle cx="19.5" cy="8.5" r="1" fill="#111" />
      {/* Mouth */}
      <path d="M13 12 Q16 15 19 12" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Body */}
      <rect x="10" y="16" width="12" height="12" rx="4" fill={color} />
      {/* Arms */}
      <rect x="4" y="18" width="6" height="4" rx="2" fill={color} className="pet-arm-left" />
      <rect x="22" y="18" width="6" height="4" rx="2" fill={color} className="pet-arm-right" />
      {/* Legs */}
      <rect x="11" y="28" width="4" height="10" rx="2" fill={color} className="pet-leg-left" />
      <rect x="17" y="28" width="4" height="10" rx="2" fill={color} className="pet-leg-right" />
      {/* Shoes */}
      <rect x="9" y="35" width="7" height="5" rx="2.5" fill="#111" />
      <rect x="16" y="35" width="7" height="5" rx="2.5" fill="#111" />
    </svg>
  );
}

// ── Single Pet Component ─────────────────────────────────
function Pet({ color, initialX, name, mousePos }) {
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
    // Initial phrase delay
    const initialDelay = setTimeout(showPhrase, 1500 + Math.random() * 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
      if (phraseTimeout.current) clearTimeout(phraseTimeout.current);
    };
  }, []);

  // Main animation loop
  useEffect(() => {
    const FLEE_DISTANCE = 180;
    const FLEE_SPEED = 3.5;
    const WALK_SPEED = 0.35;
    const PET_WIDTH = 72;
    const BOTTOM_OFFSET = 42;
    const LERP = 0.04; // smoothing factor — lower = smoother

    const animate = () => {
      const s = stateRef.current;
      const screenW = window.innerWidth;

      // Check cursor distance
      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const petCenterX = s.x + PET_WIDTH / 2;
      const petCenterY = window.innerHeight - BOTTOM_OFFSET;
      const dist = Math.sqrt((mx - petCenterX) ** 2 + (my - petCenterY) ** 2);

      if (dist < FLEE_DISTANCE) {
        // Flee from cursor — set target velocity
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

      // Smooth velocity towards target (lerp)
      s.vx += (s.targetVx - s.vx) * (s.isFleeing ? 0.12 : LERP);

      // Update position
      s.x += s.vx;

      // Bounce off walls
      if (s.x <= 10) {
        s.x = 10;
        s.direction = 1;
        s.targetVx = WALK_SPEED;
      } else if (s.x >= screenW - PET_WIDTH - 10) {
        s.x = screenW - PET_WIDTH - 10;
        s.direction = -1;
        s.targetVx = -WALK_SPEED;
      }

      // Determine facing direction
      const facing = s.vx >= 0 ? 1 : -1;

      setPos({ x: s.x });
      setDirection(facing);
      setIsWalking(true);

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
      className={`pet-character ${isWalking ? "walking" : ""}`}
      style={{
        position: "fixed",
        bottom: "42px",
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
        <CharacterSprite color={color} flipped={direction === -1} />
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
        color="#0d7f73"
        initialX={100}
        name="Kris"
        mousePos={mousePos}
      />
      <Pet
        color="#d49a20"
        initialX={window.innerWidth - 200}
        name="Luna"
        mousePos={mousePos}
      />
    </>
  );
}
