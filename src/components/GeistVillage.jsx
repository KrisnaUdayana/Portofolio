import React, { useEffect, useRef } from 'react';

const ACCESSORIES = [
  null, null, null,
  { type: 'crown' },
  { type: 'halo' },
  { type: 'hat', color: '#f59e0b' },
  { type: 'hat', color: '#111' },
  { type: 'headband', color: '#ef4444' },
  { type: 'headband', color: '#3b82f6' },
  { type: 'zzz' },
  { type: 'bubble', color: '#a855f7' },
];

const EXPRESSIONS = [
  { eyes: 'angry' }, { eyes: 'normal' }, { eyes: 'happy' },
  { eyes: 'normal' }, { eyes: 'angry' }, { eyes: 'normal' },
  { eyes: 'squint' },
];

export default function GeistVillage() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const wrap = wrapRef.current;
    if (!canvas || !ctx || !wrap) return;

    let geists = [];
    let animationFrameId;

    class Geist {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tx = x; this.ty = y;
        this.size = 42 + Math.random() * 12; // Increased size (was 28 + 10)
        this.speed = 0.4 + Math.random() * 0.6;
        this.acc = ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)];
        this.expr = EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)];
        this.waitTimer = Math.random() * 120;
        this.walkTimer = 0;
        this.legPhase = Math.random() * Math.PI * 2;
        this.dir = 1;
        this.state = 'idle';
        this.bubbleTimer = 0;
        this.bobOffset = Math.random() * Math.PI * 2;
        this.isDragging = false;
      }

      setTarget(tx, ty) {
        this.tx = tx; this.ty = ty;
        this.state = 'walking';
        this.walkTimer = 0;
        this.dir = tx > this.x ? 1 : -1;
      }

      update(all) {
        if (this.isDragging) return;
        const W = canvas.width, H = canvas.height;
        if (this.state === 'idle') {
          this.waitTimer--;
          if (this.waitTimer <= 0) {
            if (Math.random() < 0.3 && all.length > 1) {
              const others = all.filter(g => g !== this);
              const target = others[Math.floor(Math.random() * others.length)];
              const dx = target.x - this.x, dy = target.y - this.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist > 60) {
                this.setTarget(target.x + (Math.random() - 0.5) * 40, target.y + (Math.random() - 0.5) * 30);
              } else {
                this.waitTimer = 60 + Math.random() * 80;
              }
            } else {
              const nx = 40 + Math.random() * (W - 80);
              const ny = 40 + Math.random() * (H - 80);
              this.setTarget(nx, ny);
            }
          }
        } else if (this.state === 'walking') {
          const dx = this.tx - this.x, dy = this.ty - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 2) {
            this.x = this.tx; this.y = this.ty;
            this.state = 'idle';
            this.waitTimer = 60 + Math.random() * 180;
          } else {
            const step = Math.min(this.speed, dist);
            this.x += (dx / dist) * step;
            this.y += (dy / dist) * step;
            this.walkTimer += 0.12; // Slower bobbing increment (was 0.18)
          }
        }

        this.legPhase += 0.12;
        this.bubbleTimer++;
        this.x = Math.max(30, Math.min(W - 30, this.x));
        this.y = Math.max(30, Math.min(H - 30, this.y));
      }

      draw() {
        const s = this.size;
        const walking = this.state === 'walking';
        const dragging = this.isDragging;
        
        let bob = walking
          ? Math.sin(this.walkTimer * 2) * 2
          : Math.sin(this.bobOffset + Date.now() * 0.001) * 1;
        
        if (dragging) bob = -25; // Lifted up higher

        let bx = this.x;
        let by = this.y;

        if (dragging) {
          // Shake/Struggle effect only when dragging
          bx += (Math.random() - 0.5) * 4;
          by += (Math.random() - 0.5) * 4;
        }

        ctx.save();
        ctx.translate(bx, by); // Translate to base position (ground)
        if (this.dir < 0) ctx.scale(-1, 1);

        // Shadow stays on the ground
        ctx.save();
        ctx.globalAlpha = dragging ? 0.05 : 0.12;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        const shadowSize = dragging ? s * 0.45 : s * 0.35;
        ctx.ellipse(0, s * 0.55, shadowSize, s * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Now translate further for the body bobbing
        ctx.translate(0, bob);

        // Legs
        let legSwing = 0;
        if (walking) legSwing = Math.sin(this.legPhase) * 8;
        if (dragging) legSwing = Math.sin(Date.now() * 0.02) * 20; // Frantic legs

        ctx.fillStyle = '#111';
        
        // Only legs and body parts should be drawn now (they are already translated by bob)
        // But legs should actually connect to the body. 
        // If we want legs to stay on ground, we shouldn't translate them by bob.
        // Let's draw legs BEFORE the body translation or adjust their position.
        // Actually, let's keep it simple: the whole geist (body + legs) bobs.
        // The shadow is the only thing that stays on the ground.
        
        ctx.save();
        ctx.translate(-s * 0.18, s * 0.35);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-s * 0.09, 0, s * 0.13, s * 0.22);
        ctx.fillRect(-s * 0.12, s * 0.18, s * 0.2, s * 0.07);
        ctx.restore();
        
        ctx.save();
        ctx.translate(s * 0.18, s * 0.35);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-s * 0.04, 0, s * 0.13, s * 0.22);
        ctx.fillRect(-s * 0.08, s * 0.18, s * 0.2, s * 0.07);
        ctx.restore();

        // Arms
        let armSwing = 0;
        if (walking) armSwing = Math.sin(this.legPhase + Math.PI) * 10;
        if (dragging) armSwing = Math.sin(Date.now() * 0.02 + Math.PI) * 25; // Frantic arms
        ctx.save();
        ctx.translate(-s * 0.42, s * 0.05);
        ctx.rotate(armSwing * Math.PI / 180);
        ctx.fillRect(0, 0, s * 0.18, s * 0.09);
        ctx.restore();
        ctx.save();
        ctx.translate(s * 0.24, s * 0.05);
        ctx.rotate(-armSwing * Math.PI / 180);
        ctx.fillRect(0, 0, s * 0.18, s * 0.09);
        ctx.restore();

        // Brackets { }
        ctx.fillStyle = '#444';
        ctx.font = `bold ${s * 0.28}px monospace`;
        ctx.textBaseline = 'middle';
        ctx.fillText('{', -s * 0.62, s * 0.1);
        ctx.fillText('}', s * 0.36, s * 0.1);

        // Body
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.roundRect(-s * 0.38, -s * 0.38, s * 0.76, s * 0.76, s * 0.12);
        ctx.fill();

        // Top dots
        const dotColors = ['#ef4444', '#f59e0b', '#22c55e'];
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = dotColors[i];
          ctx.beginPath();
          ctx.arc(-s * 0.2 + i * s * 0.15, -s * 0.26, s * 0.055, 0, Math.PI * 2);
          ctx.fill();
        }

        // Mata
        if (dragging) {
          this.drawEyes(s, 'angry');
        } else {
          this.drawEyes(s);
        }

        // Aksesori
        this.drawAccessory(s);

        ctx.restore();

        // Struggle indicator
        if (dragging) {
          ctx.save();
          ctx.font = `bold ${s * 0.4}px monospace`;
          ctx.fillStyle = '#ef4444';
          ctx.fillText('!', bx + s * 0.4, by - s * 0.6);
          ctx.restore();
        }

        // Bubble & Zzz
        if (this.acc && this.acc.type === 'bubble') {
          const pulse = 0.8 + 0.2 * Math.sin(this.bubbleTimer * 0.05);
          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = this.acc.color;
          ctx.beginPath();
          ctx.arc(bx + s * 0.5, by - s * 0.55, s * 0.18 * pulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        if (this.acc && this.acc.type === 'zzz') {
          ctx.save();
          ctx.font = `bold ${s * 0.22}px monospace`;
          ctx.fillStyle = '#94a3b8';
          ctx.globalAlpha = 0.7 + 0.3 * Math.sin(this.bubbleTimer * 0.04);
          ctx.fillText('Zz', bx + s * 0.28, by - s * 0.55);
          ctx.restore();
        }
      }

      drawEyes(s, overrideExpr) {
        const e = overrideExpr || this.expr.eyes;
        ctx.fillStyle = '#fff';
        if (e === 'squint') {
          ctx.fillRect(-s * 0.22, -s * 0.12, s * 0.16, s * 0.05);
          ctx.fillRect(s * 0.06, -s * 0.12, s * 0.16, s * 0.05);
        } else if (e === 'happy') {
          ctx.beginPath();
          ctx.arc(-s * 0.14, -s * 0.08, s * 0.09, Math.PI, 0);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(s * 0.14, -s * 0.08, s * 0.09, Math.PI, 0);
          ctx.fill();
        } else {
          ctx.fillStyle = e === 'angry' ? '#ef4444' : '#fff';
          ctx.fillRect(-s * 0.24, -s * 0.15, s * 0.16, s * 0.14);
          ctx.fillRect(s * 0.08, -s * 0.15, s * 0.16, s * 0.14);
          if (e === 'angry') {
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(-s * 0.28, -s * 0.22, s * 0.18, s * 0.05);
            ctx.fillRect(s * 0.1, -s * 0.22, s * 0.18, s * 0.05);
          }
        }
      }

      drawAccessory(s) {
        if (!this.acc) return;
        const { type, color } = this.acc;
        if (type === 'crown') {
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.moveTo(-s * 0.28, -s * 0.4);
          ctx.lineTo(-s * 0.28, -s * 0.58);
          ctx.lineTo(-s * 0.14, -s * 0.5);
          ctx.lineTo(0, -s * 0.62);
          ctx.lineTo(s * 0.14, -s * 0.5);
          ctx.lineTo(s * 0.28, -s * 0.58);
          ctx.lineTo(s * 0.28, -s * 0.4);
          ctx.closePath();
          ctx.fill();
        } else if (type === 'halo') {
          ctx.strokeStyle = '#fde68a';
          ctx.lineWidth = s * 0.06;
          ctx.beginPath();
          ctx.ellipse(0, -s * 0.52, s * 0.28, s * 0.1, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else if (type === 'hat') {
          ctx.fillStyle = color || '#111';
          ctx.fillRect(-s * 0.32, -s * 0.54, s * 0.64, s * 0.14);
          ctx.fillRect(-s * 0.22, -s * 0.76, s * 0.44, s * 0.24);
        } else if (type === 'headband') {
          ctx.fillStyle = color || '#ef4444';
          ctx.fillRect(-s * 0.38, -s * 0.38, s * 0.76, s * 0.12);
        }
      }

      contains(mx, my) {
        const s = this.size;
        return mx > this.x - s * 0.5 && mx < this.x + s * 0.5 &&
               my > this.y - s * 0.5 && my < this.y + s * 0.5;
      }
    }

    function spawnGeist(x, y) {
      if (geists.length >= 15) return;
      geists.push(new Geist(
        x ?? 80 + Math.random() * (canvas.width - 160),
        y ?? 60 + Math.random() * (canvas.height - 120)
      ));
      if (countRef.current) {
        countRef.current.textContent = `${geists.length} geists wandering`;
      }
    }

    function resize() {
      if (wrapRef.current && canvas) {
        canvas.width = wrapRef.current.clientWidth;
        canvas.height = 420;
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function drawGrid() {
      const W = canvas.width, H = canvas.height;
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 0.5;
      const cellW = 48, cellH = 24;
      const cols = Math.ceil(W / cellW) + 4;
      const rows = Math.ceil(H / cellH) + 4;
      for (let r = -2; r < rows; r++) {
        for (let c = -2; c < cols; c++) {
          const sx = c * cellW - (r % 2 === 0 ? 0 : cellW / 2);
          const sy = r * cellH;
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + cellW, sy); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, sy + cellH); ctx.stroke();
        }
      }
    }

    // Initial spawn
    for (let i = 0; i < 15; i++) spawnGeist();

    let draggedGeist = null;

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    const handleMouseDown = (e) => {
      const pos = getMousePos(e);
      // Check from top to bottom (reverse geists) to pick the one on top
      const sortedGeists = [...geists].sort((a, b) => b.y - a.y);
      for (const g of sortedGeists) {
        if (g.contains(pos.x, pos.y)) {
          draggedGeist = g;
          g.isDragging = true;
          g.state = 'idle';
          break;
        }
      }
    };

    const handleMouseMove = (e) => {
      if (draggedGeist) {
        const pos = getMousePos(e);
        draggedGeist.x = pos.x;
        draggedGeist.y = pos.y;
        draggedGeist.tx = pos.x;
        draggedGeist.ty = pos.y;
      }
    };

    const handleMouseUp = () => {
      if (draggedGeist) {
        draggedGeist.isDragging = false;
        draggedGeist.waitTimer = 60;
        draggedGeist = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      geists.forEach(g => g.update(geists));
      geists.sort((a, b) => a.y - b.y);
      geists.forEach(g => g.draw());
      
      animationFrameId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full py-20 relative bg-dark-100/50 backdrop-blur-sm z-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-space font-bold mb-8 text-light-100 flex items-center gap-4">
          <span className="w-12 h-[2px] bg-primary-500"></span>
          The Geist Village
        </h2>
        <div 
          ref={wrapRef} 
          className="relative w-full bg-[#f5f5f3] rounded-2xl overflow-hidden border-2 border-[#111]"
        >
          <canvas ref={canvasRef} height="420" className="block w-full cursor-grab active:cursor-grabbing" />
          <div className="flex items-center gap-3 px-4 py-2 bg-white border-t-[1.5px] border-[#e0e0e0] text-[11px] text-[#888] font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> LIVE
            </span>
            <span ref={countRef}>0 geists wandering</span>
            <span className="ml-auto">click and drag geists to move them</span>
          </div>
        </div>
      </div>
    </section>
  );
}
