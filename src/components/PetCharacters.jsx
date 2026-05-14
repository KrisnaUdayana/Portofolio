import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

// ── Phrases the pets can say ─────────────────────────────
const PHRASES = [
  "Hello! 👋",
  "Love you! 💖",
  "Wheee! 🎈",
  "Hire me! 🚀",
  "I can fly! ✨",
  "Ouch! 🤕",
  "Keep going! 💪",
  "Check my work!",
  "Welcome! 🎉",
  "Let's build! 🔨",
];

// ── Geist SVG Sprite ─────────────────────────────────────
function GeistSprite({ flipped, isPanicked }) {
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
      {!isPanicked ? (
        <g>
          <rect x="28" y="44" width="14" height="14" rx="4" fill="#fff" />
          <rect x="58" y="44" width="14" height="14" rx="4" fill="#fff" />
        </g>
      ) : (
        <g className="panic-eyes">
          {/* Wide panic eyes */}
          <rect x="26" y="42" width="18" height="18" rx="6" fill="#fff" />
          <rect x="56" y="42" width="18" height="18" rx="6" fill="#fff" />
          {/* Tiny pupils looking straight DOWN */}
          <circle cx="35" cy="55" r="3" fill="#111" />
          <circle cx="65" cy="55" r="3" fill="#111" />
          {/* Sweat drop */}
          <path d="M 80 30 Q 84 38 80 42 Q 76 38 80 30" fill="#60a5fa" className="sweat-drop" />
        </g>
      )}
    </svg>
  );
}

// ── Single Pet Component ─────────────────────────────────
function Pet({ initialX, name }) {
  const petRef = useRef(null);
  
  const x = useMotionValue(initialX);
  const y = useMotionValue(0);

  const stateRef = useRef({
    vx: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.3),
    targetVx: 0,
    direction: 1,
    vy: 0, // For gravity
  });

  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [phrase, setPhrase] = useState(null);
  const [isWalking, setIsWalking] = useState(true);
  
  const isDraggingRef = useRef(false);
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

  const triggerPhrase = (msg) => {
    setPhrase(msg);
    if (phraseTimeout.current) clearTimeout(phraseTimeout.current);
    phraseTimeout.current = setTimeout(() => setPhrase(null), 2500);
  };

  // Main animation loop
  useEffect(() => {
    const WALK_SPEED = 0.35;
    const PET_WIDTH = 64;
    const LERP = 0.04;
    const GRAVITY = 0.6;
    const BOUNCE = -0.4;

    const animate = () => {
      const s = stateRef.current;
      const screenW = window.innerWidth;
      
      let currentX = x.get();
      let currentY = y.get();

      if (!isDraggingRef.current) {
        // Apply Gravity if above ground (y < 0)
        if (currentY < 0) {
          // Horizontal in-air physics
          currentX += s.vx;
          s.vx *= 0.99; // Air friction

          // Bounce off walls horizontally
          if (currentX <= 10) {
            currentX = 10;
            s.vx *= -0.8;
          } else if (currentX >= screenW - PET_WIDTH - 10) {
            currentX = screenW - PET_WIDTH - 10;
            s.vx *= -0.8;
          }
          x.set(currentX);

          // Vertical physics
          s.vy += GRAVITY;
          currentY += s.vy;
          
          if (currentY >= 0) {
            currentY = 0;
            s.vy = s.vy * BOUNCE;
            if (Math.abs(s.vy) < 1) {
              s.vy = 0;
            } else {
               // Optional: trigger phrase on bounce?
               if (Math.abs(s.vy) > 3 && Math.random() > 0.5) triggerPhrase("Ouch! 🤕");
            }
          }
          y.set(currentY);
          setIsWalking(false);
        } else {
          // On the ground, walk around
          setIsWalking(true);
          s.targetVx = s.direction * WALK_SPEED;
          s.vx += (s.targetVx - s.vx) * LERP;
          currentX += s.vx;

          if (currentX <= 10) {
            currentX = 10;
            s.direction = 1;
            s.targetVx = WALK_SPEED;
          } else if (currentX >= screenW - PET_WIDTH - 10) {
            currentX = screenW - PET_WIDTH - 10;
            s.direction = -1;
            s.targetVx = -WALK_SPEED;
          }
          x.set(currentX);
        }
        
        setDirection(s.vx >= 0 ? 1 : -1);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={petRef}
      className={`pet-character ${isWalking && !isDragging ? "walking" : ""} ${isDragging ? "running" : ""}`}
      style={{
        position: "fixed",
        bottom: "24px",
        left: 0,
        x,
        y,
        zIndex: 9999,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none"
      }}
      drag
      dragMomentum={false}
      dragConstraints={{ left: 0, right: window.innerWidth - 64, top: -window.innerHeight + 100, bottom: 0 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.1 }}
      onDragStart={() => {
        isDraggingRef.current = true;
        setIsDragging(true);
        triggerPhrase("Wheee! 🎈");
        stateRef.current.vy = 0;
      }}
      onDragEnd={(event, info) => {
        isDraggingRef.current = false;
        setIsDragging(false);
        // Throw momentum
        stateRef.current.vx = info.velocity.x * 0.01;
        stateRef.current.vy = info.velocity.y * 0.01;
      }}
      onClick={() => triggerPhrase("Yay! ✨")}
    >
      {/* Speech bubble */}
      {phrase && (
        <div className="pet-speech-bubble">
          {phrase}
        </div>
      )}

      {/* Character body */}
      <div className="pet-body">
        <GeistSprite flipped={direction === -1} isPanicked={isDragging || y.get() < -10} />
      </div>

      {/* Name tag */}
      <div className="pet-name">{name}</div>
    </motion.div>
  );
}

// ── Main PetCharacters Component ─────────────────────────
export default function PetCharacters() {
  // Use state to track window size for dynamic constraints, 
  // but for simplicity window.innerWidth on load inside the component works well enough
  // since we constrain via framer-motion.
  return (
    <>
      <Pet
        initialX={100}
        name="Krisna"
      />
      <Pet
        initialX={window.innerWidth > 600 ? window.innerWidth - 200 : 200}
        name="Udayana"
      />
    </>
  );
}
