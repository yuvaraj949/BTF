import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
  baseY: number;
  baseX: number;
  scrollFactor: number;
}

const PARTICLE_COUNT = 30;
const COLORS = ['#fbbf24', '#fde68a', '#fffbe9']; // yellow, light yellow, off-white

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const SmoothMagicalParticles: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [frame, setFrame] = useState(0);
  const lastScrollY = useRef(scrollY);

  // Initialize particles only once
  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, () => {
        const x = randomBetween(0, 100);
        const y = randomBetween(0, 100);
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          size: randomBetween(0.8, 2.2),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          speed: randomBetween(0.03, 0.08), // slower for smoothness
          direction: randomBetween(0, 2 * Math.PI),
          scrollFactor: randomBetween(0.08, 0.18), // how much it reacts to scroll
        };
      })
    );
    // eslint-disable-next-line
  }, []);

  // Animate particles
  useEffect(() => {
    let anim: number;
    const animate = () => {
      setFrame(f => f + 1);
      anim = requestAnimationFrame(animate);
    };
    anim = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(anim);
  }, []);

  // Store last scrollY for smooth scroll delta
  useEffect(() => {
    lastScrollY.current = scrollY;
  }, [scrollY]);

  // Calculate positions
  const t = frame / 60; // seconds
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => {
        // Smoothly move with time and scroll
        // Parallax: baseY + scrollY * scrollFactor
        // Drift: sin/cos for floating
        const driftX = Math.cos(p.direction + t * p.speed) * 2;
        const driftY = Math.sin(p.direction + t * p.speed) * 2;
        const y = p.baseY + scrollY * p.scrollFactor * 0.2 + driftY;
        const x = p.baseX + driftX;
        return (
          <div
            key={i}
            className="absolute rounded-full opacity-70 shadow-lg"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${p.size}vw`,
              height: `${p.size}vw`,
              background: p.color,
              filter: 'blur(0.5px)',
              transition: 'top 0.15s linear, left 0.15s linear',
              zIndex: 1,
            }}
          />
        );
      })}
    </div>
  );
};

export default SmoothMagicalParticles;
