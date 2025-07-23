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
    const current = contentRefs.current[selectedIndex];
    if (current) {
      setHeight(current.offsetHeight);
    } else {
      setHeight(null);
    }
  }, [selectedIndex, ...deps]);

  return [height, contentRefs];
}
