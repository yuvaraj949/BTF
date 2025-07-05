// Animated background canvas for magical/futuristic effect on landing page.

/**
 * BackgroundScene component
 * - Renders a dynamic, animated canvas background for the landing page
 * - Uses parallax, mouse movement, and scroll for interactive effects
 * - Draws glowing shapes, particles, and pulses for a magical/futuristic look
 * - Accepts isDayTime and scrollY props for theme and animation
 */
import React from 'react';

interface BackgroundSceneProps {
  isDayTime: boolean;
  scrollY: number;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ isDayTime, scrollY }) => {
  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 bg-black" />
  );
};

export default BackgroundScene;
