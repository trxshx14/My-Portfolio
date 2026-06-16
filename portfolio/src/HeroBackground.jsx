// HeroBackground.jsx
import { useEffect, useRef } from 'react';

const NODE_COUNT = 65;
const MAX_DISTANCE = 145;
const MOUSE_RADIUS = 170;

const COLORS = [
  '226, 164, 196',   // --pink  #E2A4C4
  '154, 107, 138',   // --mauve #9A6B8A
  '200, 184, 216',   // --lavender #C8B8D8
  '200, 140, 178',   // mid pink-mauve blend
];

function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = 0, height = 0, nodes = [], animationId;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createNodes = () => {
      const count = window.innerWidth < 720 ? Math.round(NODE_COUNT * 0.5) : NODE_COUNT;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.8 + 0.7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_RADIUS && d > 0) {
          const force = (MOUSE_RADIUS - d) / MOUSE_RADIUS;
          node.x += (dx / d) * force * 1.3;
          node.y += (dy / d) * force * 1.3;
        }
      }

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DISTANCE) {
            const opacity = (1 - dist / MAX_DISTANCE) * 0.28;
            ctx.strokeStyle = `rgba(226, 164, 196, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        const dxm = nodes[i].x - mouse.x;
        const dym = nodes[i].y - mouse.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < MOUSE_RADIUS) {
          const opacity = (1 - dm / MOUSE_RADIUS) * 0.5;
          ctx.strokeStyle = `rgba(200, 184, 216, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, 0.85)`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(step);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const handleResize = () => { resize(); createNodes(); };

    resize();
    createNodes();
    step();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // hero content stays clickable
        zIndex: 0,
      }}
    />
  );
}

export default HeroBackground;