import styled from '@emotion/styled';
import { RefObject, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

type TooltipProps = {
  opened: boolean;
  coords: { x: number; y: number };
  offsetX?: number;
  offsetY?: number;
  showRight?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  excludeRefs?: RefObject<HTMLElement | null>[];
};

function Tooltip({
  opened,
  coords,
  offsetX = 0,
  offsetY = 8,
  showRight = false,
  children,
  onClose,
  excludeRefs = [],
}: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [adjustedX, setAdjustedX] = useState(coords.x);
  const [adjustedY, setAdjustedY] = useState(coords.y);

  useEffect(() => {
    if (opened && tooltipRef.current) {
      const width = tooltipRef.current.offsetWidth;
      let x = coords.x + offsetX;
      const y = coords.y + offsetY;

      if (!showRight) {
        x = x - width / 2;
      } else {
        x = x + width;
      }
      setAdjustedX(x);
      setAdjustedY(y);
    }
  }, [opened, coords, offsetX, offsetY, showRight]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        excludeRefs?.some(
          ref => ref.current && ref.current.contains(event.target as Node)
        )
      )
        return;
      if (
        opened &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      )
        onClose?.();
    }

    if (opened) {
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [onClose, opened]);

  useEffect(() => {
    if (!opened) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened]);

  if (!opened) return null;

  const tooltipRoot = document.querySelector('#tooltip') as HTMLElement;

  return ReactDOM.createPortal(
    <S.Container ref={tooltipRef} adjustedX={adjustedX} adjustedY={adjustedY}>
      {children}
    </S.Container>,
    tooltipRoot
  );
}

export default Tooltip;

const S = {
  Container: styled.div<{ adjustedX: number; adjustedY: number }>`
    position: absolute;
    top: ${props => props.adjustedY}px;
    left: ${props => props.adjustedX}px;
    background-color: ${({ theme }) => theme.PALETTE.gray[80]};
    color: ${({ theme }) => theme.PALETTE.gray[0]};
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.RADIUS.small};
    white-space: nowrap;
    pointer-events: auto;
    user-select: none;
    z-index: ${({ theme }) => theme.Z_INDEX.tooltip};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
