import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef, useState } from 'react';

import Arrow from './assets/icons/Arrow';

type Props = {
  contentArr: ReactNode[];
  interval?: number;
  showArrows?: boolean;
  indicator?: boolean;
};

function Carousel({
  contentArr,
  interval = 0,
  showArrows = false,
  indicator = true,
}: Props) {
  const [focusedIdx, setFocusedIdx] = useState(0);
  const focusedFirstIdx = focusedIdx === 0;
  const focusedLastIdx = focusedIdx === contentArr.length - 1;
  const isFocused = (idx: number) => focusedIdx === idx;
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const item = container.children[index] as HTMLElement;
    item?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const changeFocus = (idx: number) => {
    setFocusedIdx(idx);
    scrollToIndex(idx);
  };

  const handleContentClick = (e: React.MouseEvent, idx: number) => {
    if (isFocused(idx)) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    changeFocus(idx);
  };

  useEffect(() => {
    if (interval === 0) return;
    const id = setInterval(() => {
      setFocusedIdx(prev => {
        const next = prev === contentArr.length - 1 ? 0 : prev + 1;
        scrollToIndex(next);
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [interval, contentArr.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const { left, width } = container.getBoundingClientRect();
      const centerX = left + width / 2;
      let minDistanceItem = 0;
      let minDistance = Infinity;
      Array.from(container.children).forEach((child, i) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - centerX);
        if (dist < minDistance) {
          minDistance = dist;
          minDistanceItem = i;
        }
      });
      setFocusedIdx(minDistanceItem);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [contentArr.length]);

  return (
    <S.Container>
      <S.ContentWrapper ref={containerRef}>
        {contentArr.map((content, i) => (
          <S.Content
            key={i}
            focused={isFocused(i)}
            onClickCapture={e => handleContentClick(e, i)}
          >
            {content}
          </S.Content>
        ))}
      </S.ContentWrapper>

      {showArrows && (
        <>
          <S.LeftArrowButton
            onClick={() => changeFocus(focusedIdx - 1)}
            active={!focusedFirstIdx}
            aria-label="이전"
          >
            <Arrow size="sm" direction="left" color="white" />
          </S.LeftArrowButton>

          <S.RightArrowButton
            onClick={() => changeFocus(focusedIdx + 1)}
            active={!focusedLastIdx}
            aria-label="다음"
          >
            <Arrow size="sm" direction="right" color="white" />
          </S.RightArrowButton>
        </>
      )}
      {indicator && (
        <S.Indicator>
          {Array.from({ length: contentArr.length }).map((_, i) => (
            <S.Dot key={i} active={i === focusedIdx} />
          ))}
        </S.Indicator>
      )}
    </S.Container>
  );
}

export default Carousel;

const ArrowButton = styled.button<{ active: boolean }>`
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  background-color: ${({ theme }) => theme.PALETTE.primary[50]};

  transition: opacity 0.5s ease;
  border-radius: ${({ theme }) => theme.RADIUS.half};

  opacity: ${({ active }) => (active ? '1' : '0')};
  pointer-events: ${({ active }) => (!active ? 'none' : 'auto')};

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary[30]};
  }

  &:active {
    background-color: ${({ theme }) => theme.PALETTE.primary[60]};
  }
`;

const S = {
  Container: styled.div`
    width: 100%;
    position: relative;
  `,

  ContentWrapper: styled.div`
    width: 100%;
    display: flex;

    padding: 0 50%;

    overflow-x: auto;
    scroll-behavior: smooth;

    scroll-snap-type: x mandatory;

    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  LeftArrowButton: styled(ArrowButton)`
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  `,

  RightArrowButton: styled(ArrowButton)`
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  `,

  Content: styled.div<{ focused: boolean }>`
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
    opacity: ${({ focused }) => (focused ? 1 : 0.6)};
    scroll-snap-align: center;
    scroll-snap-stop: always;
    transform: ${({ focused }) => (focused ? 'scale(1)' : 'scale(0.85)')};

    will-change: transform, opacity;
  `,

  Indicator: styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;

    margin: 27px 0 0;
  `,

  Dot: styled.div<{ active: boolean }>`
    width: 8px;
    height: 8px;

    background: ${({ active, theme }) =>
      active ? theme.PALETTE.gray[90] : theme.PALETTE.gray[30]};

    transition: background 0.2s;
    border-radius: 50%;
  `,
};
