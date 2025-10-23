import { useEffect } from 'react';

type Props = {
  onClose: () => void;
  shouldIgnoreClick?: (target: HTMLElement) => boolean;
};

export function useOutsideClickAndEscape({
  onClose,
  shouldIgnoreClick,
}: Props) {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (shouldIgnoreClick && !shouldIgnoreClick(target)) onClose();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, shouldIgnoreClick]);
}
