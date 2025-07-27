import { useRef } from 'react';

export const useExplosion = () => {
  const explosionRef = useRef<HTMLDivElement>(null);

  const trigger = () => {
    const explosion = explosionRef.current;
    if (!explosion) return;

    const hearts = explosion.querySelectorAll('span');
    hearts.forEach((heart, i) => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 20 + Math.random() * 20;
      const x = Math.cos(angle) * distance + 'px';
      const y = Math.sin(angle) * distance + 'px';

      heart.style.setProperty('--x', x);
      heart.style.setProperty('--y', y);

      heart.style.animation = 'none';
      void heart.offsetWidth;
      heart.style.animation = `explode 1500ms ease-out ${i * 50}ms`;
    });
  };

  return { explosionRef, trigger };
};
