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
