import { useRef } from 'react';

export const useExplosion = () => {
  const explosionRef = useRef<HTMLDivElement>(null);

  const removeAnimation = () => {
    const explosion = explosionRef.current;
    if (!explosion) return;

    const hearts = explosion.querySelectorAll('span');
    hearts.forEach(heart => {
      heart.style.animation = 'none';
    });
  };

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

      const delay = i * 50;
      const duration = 1500;
      heart.style.animation = 'none';
      void heart.offsetWidth;
      heart.style.animation = `explode ${duration}ms ease-out ${delay}ms`;
    });
  };

  return { explosionRef, trigger, removeAnimation };
};
