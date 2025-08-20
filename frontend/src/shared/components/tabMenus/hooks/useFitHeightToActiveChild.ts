import {
  DependencyList,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export function useFitHeightToActiveChild<
  T extends HTMLElement = HTMLDivElement,
>(
  selectedIndex: number,
  deps: DependencyList = []
): [number | null, RefObject<T[]>] {
  const contentRefs = useRef<T[]>([]);
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!contentRefs.current[selectedIndex]) {
      setHeight(null);
      return;
    }
    const element = contentRefs.current[selectedIndex];
    if (!element) {
      setHeight(null);
      return;
    }

    setHeight(element.offsetHeight);

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === element) {
          const newHeight = entry.contentRect.height;
          setHeight(newHeight);
        }
      }
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [selectedIndex, ...deps]);

  return [height, contentRefs];
}
