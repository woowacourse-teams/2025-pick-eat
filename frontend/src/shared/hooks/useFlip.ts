import { useRef, useEffect, useState } from 'react';

export const useFlip = <T extends { id: number }>(
  sourceList: T[],
  sortFn: (list: T[]) => T[],
  delay: number = 1000
) => {
  const [displayList, setDisplayList] = useState<T[]>(() => sortFn(sourceList));
  const itemRefs = useRef(new Map<number, HTMLDivElement>());
  const prevRects = useRef(new Map<number, DOMRect>());
  const sortTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayList(prev => {
      return prev.map(item => {
        const updated = sourceList.find(r => r.id === item.id);
        return updated || item;
      });
    });

    if (sortTimeoutRef.current) {
      clearTimeout(sortTimeoutRef.current);
    }

    sortTimeoutRef.current = setTimeout(() => {
      displayList.forEach(item => {
        const el = itemRefs.current.get(item.id);
        if (el) {
          prevRects.current.set(item.id, el.getBoundingClientRect());
        }
      });

      const sorted = sortFn(sourceList);
      setDisplayList(sorted);

      requestAnimationFrame(() => {
        sorted.forEach(item => {
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
      });
    }, delay);

    return () => {
      if (sortTimeoutRef.current) {
        clearTimeout(sortTimeoutRef.current);
      }
    };
  }, [sourceList, delay]);

  return { displayList, itemRefs };
};
