// Animated background canvas for magical/futuristic effect on landing page.

/**
 * BackgroundScene component
 * - Renders a dynamic, animated canvas background for the landing page
 * - Uses parallax, mouse movement, and scroll for interactive effects
 * - Draws glowing shapes, particles, and pulses for a magical/futuristic look
 * - Accepts isDayTime and scrollY props for theme and animation
 */
import React, { useRef, useEffect } from 'react';

interface BackgroundSceneProps {
  isDayTime: boolean;
  scrollY: number;
}

const FONT_SIZE = 18;
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const TRAIL_COLOR = '#F66200';
const HEAD_COLOR = '#F66200';
const BG_COLOR = 'rgba(0, 0, 0, 1)';
const TRAIL_LENGTH = 10;
const FRAME_DELAY = 80; // ~80fps

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ isDayTime, scrollY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const columnsRef = useRef<number[]>([]);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    // High-DPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.scale(dpr, dpr);

    let columns = Math.floor(width / FONT_SIZE);
    columnsRef.current = Array(columns).fill(0);
    dropsRef.current = Array(columns).fill(0).map(() => Math.floor(Math.random() * height / FONT_SIZE));

    function draw() {
      // Fade the canvas slightly to create trailing effect
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < columns; i++) {
        // Draw the trail
        for (let j = TRAIL_LENGTH; j >= 0; j--) {
          const y = (dropsRef.current[i] - j) * FONT_SIZE;
          if (y < 0 || y > height) continue;

          const char = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
          if (j === 0) {
            // Head of the drop: brighter
            ctx.fillStyle = HEAD_COLOR;
          } else {
            // Trail: faded
            ctx.fillStyle = TRAIL_COLOR;
            ctx.globalAlpha = 1 - j / (TRAIL_LENGTH + 2);
          }
          ctx.fillText(char, i * FONT_SIZE, y);
          ctx.globalAlpha = 1;
        }

        // Randomly reset drop to top
        if (
          dropsRef.current[i] * FONT_SIZE > height &&
          Math.random() > 0.95
        ) {
          dropsRef.current[i] = 0;
        }

        // Move drop down
        dropsRef.current[i]++;
      }

      animationRef.current = window.setTimeout(() => {
        requestAnimationFrame(draw);
      }, FRAME_DELAY);
    }

    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      columns = Math.floor(width / FONT_SIZE);
      columnsRef.current = Array(columns).fill(0);
      dropsRef.current = Array(columns).fill(0).map(() => Math.floor(Math.random() * height / FONT_SIZE));
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  // Optionally, you can use parallaxOffset for future effects
  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
};

export default BackgroundScene;
