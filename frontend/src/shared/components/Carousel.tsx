import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef, useState } from 'react';

import Arrow from './assets/icons/Arrow';

type Props = {
  dd: ReactNode[];
};

function Carousel({ dd }: Props) {
  const [currentContentIdx, setCurrentContentIdx] = useState(0);
  const atFirstContentIdx = currentContentIdx === 0;
  const atLastContentIdx = currentContentIdx === dd.length - 1;
  const isFocused = (idx: number) => currentContentIdx === idx;
  const containerRef = useRef<HTMLDivElement>(null);

  //TODO: 리뷰 후 주석 지우기: 포커스된 요소가 가운데로 오게 스크롤 조정하는 아이입니다!
  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const item = container.children[index] as HTMLElement;
    const offset =
      item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2;
    container.scrollTo({ left: offset });
  };

  useEffect(() => {
    scrollToIndex(0);
  }, []);

  return (
    <S.Container>
      <S.ContentWrapper ref={containerRef}>
        {dd.map((item, i) => (
          <S.Content
            key={i}
            focus={isFocused(i)}
            atFirstContent={i === 0}
            atLastContent={i === dd.length - 1}
          >
            {item}
          </S.Content>
        ))}
      </S.ContentWrapper>

      <S.LeftArrowButton
        onClick={() => {
          setCurrentContentIdx(prev => prev - 1);
          scrollToIndex(currentContentIdx - 1);
        }}
        active={!atFirstContentIdx}
      >
        <Arrow size="sm" direction="left" color="white" />
      </S.LeftArrowButton>

      <S.RightArrowButton
        onClick={() => {
          setCurrentContentIdx(prev => prev + 1);
          scrollToIndex(currentContentIdx + 1);
        }}
        active={!atLastContentIdx}
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
    focus: boolean;
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
    opacity: ${({ focus }) => (focus ? 1 : 0.6)};
    pointer-events: ${({ focus }) => !focus && 'none'};
    transform: ${({ focus }) => (focus ? 'scale(1)' : 'scale(0.6)')};
  `,
};
