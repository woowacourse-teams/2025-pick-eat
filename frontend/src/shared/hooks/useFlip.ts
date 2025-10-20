import { useRef } from 'react';

export const useFlip = <T extends { id: number }>(arr: T[]) => {
  const itemRefs = useRef(new Map<number, HTMLDivElement>());
  const prevRects = useRef(new Map<number, DOMRect>());

  const recordPositions = () => {
    console.log('arr flip', arr);
    arr.forEach(item => {
      const el = itemRefs.current.get(item.id);
      if (el) {
        prevRects.current.set(item.id, el.getBoundingClientRect());
      }
    });
  };

  const playFlip = () => {
    arr.forEach(item => {
      const el = itemRefs.current.get(item.id);
      const prevRect = prevRects.current.get(item.id);
      if (!el || !prevRect) return;

      const newRect = el.getBoundingClientRect();
      const dx = prevRect.left - newRect.left;
      const dy = prevRect.top - newRect.top;

      if (dx !== 0 || dy !== 0) {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = 'transform 0s';

        requestAnimationFrame(() => {
          el.style.transition = 'transform 500ms ease';
          el.style.transform = 'translate(0, 0)';
        });
      }
    });
  };

  recordPositions();

  requestAnimationFrame(() => {
    playFlip();
  });

  return { itemRefs };
};
