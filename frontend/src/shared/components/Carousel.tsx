import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef, useState } from 'react';

import Arrow from './assets/icons/Arrow';

type Props = {
  children: ReactNode;
  stepSize: number;
};

function Carousel({ children, stepSize }: Props) {
  const [leftArrowVisible, setLeftArrowVisible] = useState(true);
  const [rightArrowVisible, setRightArrowVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setLeftArrowVisible(el.scrollLeft <= 20);
    setRightArrowVisible(el.scrollLeft >= maxScrollLeft - 20);
  };

  const scrollLeft = () =>
    containerRef.current?.scrollBy({ left: -stepSize, behavior: 'smooth' });
  const scrollRight = () =>
    containerRef.current?.scrollBy({ left: stepSize, behavior: 'smooth' });

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <S.Container>
      <S.ContentWrapper ref={containerRef} onScroll={handleScroll}>
        {children}
      </S.ContentWrapper>
      {!leftArrowVisible && (
        <S.LeftArrowButton onClick={scrollLeft}>
          <Arrow size="sm" direction="left" color="white" />
        </S.LeftArrowButton>
      )}
      {!rightArrowVisible && (
        <S.RightArrowButton onClick={scrollRight}>
          <Arrow size="sm" direction="right" color="white" />
        </S.RightArrowButton>
      )}
    </S.Container>
  );
}

export default Carousel;

const ArrowButton = styled.button`
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  background-color: ${({ theme }) => theme.PALETTE.primary[50]};
  border-radius: ${({ theme }) => theme.RADIUS.half};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary[30]};
  }

  &:active {
    background-color: ${({ theme }) => theme.PALETTE.primary[60]};
  }
`;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    position: relative;
  `,

  ContentWrapper: styled.div`
    overflow: auto hidden;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  LeftArrowButton: styled(ArrowButton)`
    left: 10px;
  `,

  RightArrowButton: styled(ArrowButton)`
    right: 10px;
  `,
};
