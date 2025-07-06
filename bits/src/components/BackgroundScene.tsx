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

const MATRIX_COLOR = '#F66200';
const FONT_SIZE = 14;
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ isDayTime, scrollY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const columnsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let columns = Math.floor(width / FONT_SIZE);
    columnsRef.current = Array(columns).fill(Math.floor(Math.random() * 10));

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.fillStyle = MATRIX_COLOR;
      for (let i = 0; i < columns; i++) {
        const text = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
        ctx.fillText(text, i * FONT_SIZE, columnsRef.current[i] * FONT_SIZE);
        if (columnsRef.current[i] * FONT_SIZE > height && Math.random() > 0.7) {
          columnsRef.current[i] = 0;
        }
        if (Math.random() > 0.7) {
          columnsRef.current[i]++;
        }
      }
      timeoutRef.current = setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(draw);
      }, 50);
    }

    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / FONT_SIZE);
      columnsRef.current = Array(columns).fill(Math.floor(Math.random() * 10));
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Optionally, you can use parallaxOffset for future effects
  // const parallaxOffset = scrollY * 0.3;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
};

export default BackgroundScene;
