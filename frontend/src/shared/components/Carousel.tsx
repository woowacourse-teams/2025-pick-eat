import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef, useState } from 'react';

import Arrow from './assets/icons/Arrow';

type Props = {
  contentArr: ReactNode[];
  interval?: number;
};

function Carousel({ contentArr, interval = 3000 }: Props) {
  const [focusedIdx, setFocusedIdx] = useState(0);
  const focusedFirstIdx = focusedIdx === 0;
  const focusedLastIdx = focusedIdx === contentArr.length - 1;
  const isFocused = (idx: number) => focusedIdx === idx;
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const item = container.children[index] as HTMLElement;
    item.scrollIntoView({
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
    scrollToIndex(0);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFocusedIdx(prev => {
        const next = prev === contentArr.length - 1 ? 0 : prev + 1;
        scrollToIndex(next);
        return next;
      });
    }, interval);

    return () => clearInterval(intervalId);
  });

  return (
    <S.Container>
      <S.ContentWrapper ref={containerRef}>
        {contentArr.map((content, i) => (
          <S.Content
            key={i}
            focused={isFocused(i)}
            atFirstContent={i === 0}
            atLastContent={i === contentArr.length - 1}
            onClickCapture={e => {
              handleContentClick(e, i);
            }}
          >
            {content}
          </S.Content>
        ))}
      </S.ContentWrapper>

      <S.LeftArrowButton
        onClick={() => changeFocus(focusedIdx - 1)}
        active={!focusedFirstIdx}
      >
        <Arrow size="sm" direction="left" color="white" />
      </S.LeftArrowButton>

      <S.RightArrowButton
        onClick={() => changeFocus(focusedIdx + 1)}
        active={!focusedLastIdx}
      >
        <Arrow size="sm" direction="right" color="white" />
      </S.RightArrowButton>
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
  pointer-events: ${({ active }) => !active && 'none'};

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
    display: flex;
    align-items: center;
    position: relative;
  `,

  ContentWrapper: styled.div`
    min-width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    scroll-behavior: smooth;
  `,

  LeftArrowButton: styled(ArrowButton)`
    left: 10px;
  `,

  RightArrowButton: styled(ArrowButton)`
    right: 10px;
  `,

  Content: styled.div<{
    focused: boolean;
    atFirstContent: boolean;
    atLastContent: boolean;
  }>`
    display: flex;
    justify-content: center;

    margin-right: ${({ atLastContent }) => atLastContent && '100%'};
    margin-left: ${({ atFirstContent }) => atFirstContent && '100%'};

    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
    opacity: ${({ focused }) => (focused ? 1 : 0.6)};

    transform: ${({ focused }) => (focused ? 'scale(1)' : 'scale(0.6)')};
  `,
};
