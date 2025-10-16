import { THEME } from '@styles/global';

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

      const maxX =
        Math.min(parseFloat(THEME.LAYOUT.maxWidth), window.innerWidth) -
        width -
        8;
      if (x < 8) x = 8;
      if (x > maxX) x = maxX;

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
    <S.ParentContainer>
      <S.Container ref={tooltipRef} adjustedX={adjustedX} adjustedY={adjustedY}>
        {children}
      </S.Container>
    </S.ParentContainer>,
    tooltipRoot
  );
}

export default Tooltip;

const S = {
  ParentContainer: styled.div`
    position: fixed;
    width: 100%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    max-width: ${({ theme }) => theme.LAYOUT.maxWidth};
    pointer-events: none;
    top: 0;
    height: 100vh;
    z-index: ${({ theme }) => theme.Z_INDEX.tooltip};
  `,
  Container: styled.div<{ adjustedX: number; adjustedY: number }>`
    position: absolute;
    top: ${({ adjustedY }) => adjustedY}px;
    left: ${({ adjustedX }) => adjustedX}px;
    pointer-events: auto;
    user-select: none;

    padding: 8px 12px;
    background-color: ${({ theme }) => theme.PALETTE.gray[80]};
    color: ${({ theme }) => theme.PALETTE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.small};
    white-space: nowrap;
    border-radius: ${({ theme }) => theme.RADIUS.small};
  `,
};
