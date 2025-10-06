import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import Cross from './assets/icons/Cross';

type Props = {
  children: ReactNode;
  opened: boolean;
  mounted: boolean;
  onUnmount: () => void;
  onClose: () => void;
};

//시트가 닫혀있을 때의 이동 거리 기준이 되기 위한바텀 시트 height를 계산
const BOTTOM_SHEET_HEIGHT = window.innerHeight * 0.8;

function BottomSheet({ opened, mounted, onClose, children }: Props) {
  /*
    startY : 터치 드래그 시 처음 손가락을 놓은 위치
    translateY : 시트가 현재 화면에서 얼마나 아래로 이동했는지(px)
    isDragging: 드래그 중일 때는 부드럽게 변화하는 transition을 없애기 위해 상태 정의
  */
  const startY = useRef<number | null>(null);
  const [translateY, setTranslateY] = useState<number>(BOTTOM_SHEET_HEIGHT);
  const [isDragging, setIsDragging] = useState(false);

  const closeBottomSheet = () => {
    setTranslateY(BOTTOM_SHEET_HEIGHT);
    onClose();
  };

  useEffect(() => {
    if (!opened || !mounted) return;

    setTranslateY(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeBottomSheet();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened]);

  const modalRoot = document.querySelector('#modal') as HTMLElement;

  /*
    handleTouchStart : 터치를 시작한 Y 좌표 저장
    handleTouchMove : 드래그 거리를 계산하여 translateY 값 변경(바텀 시트 위치 이동)
    handleTouchEnd : 100px 이상 아래로 드래그 => 바텀 시트 닫힘
                     100px 이하 => 원위치
  */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;

    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) {
      setTranslateY(delta);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (translateY > 100) {
      closeBottomSheet();
    } else {
      setTranslateY(0);
    }

    startY.current = null;
  };

  /* 
    opacity : 바텀 시트 이동 거리에 따른 백드롭 투명도
    FADE_END : 백드롭이 완전히 투명해지는 바텀 시트 이동 거리
    => FADE_END 만큼 이동하면 백드롭 투명해짐, 완전히 바텀 시트가 닫혔을 때 투명해지는 것 보다 자연스러워 보였음!
  */
  const FADE_END = 300;
  const opacity = !opened ? 0 : 1 - Math.min(translateY / FADE_END, 1);

  return ReactDOM.createPortal(
    <>
      <S.Backdrop
        opened={opened}
        opacity={opacity}
        onClick={closeBottomSheet}
      />
      <S.Container
        opened={opened}
        dragging={isDragging}
        translateY={translateY}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <S.Header>
          <S.HandleBar />
          <S.CloseButton onClick={closeBottomSheet}>
            <Cross color={THEME.PALETTE.gray[10]} size="sm" strokeWidth={2} />
          </S.CloseButton>
        </S.Header>
        {children}
      </S.Container>
    </>,
    modalRoot
  );
}

export default BottomSheet;

const S = {
  Container: styled.div<{
    opened: boolean;
    dragging: boolean;
    translateY: number;
  }>`
    width: 100%;
    height: 80%;
    position: fixed;
    bottom: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.modal};

    padding: 0 ${({ theme }) => theme.PADDING.p5}
      ${({ theme }) => theme.PADDING.p5} ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    transition: ${({ dragging }) =>
      dragging ? 'none' : 'transform 0.35s ease-out'};
    border-radius: 30px 30px 0 0;

    transform: ${({ translateY }) => `translateY(${translateY}px)`};
    will-change: transform;
  `,

  Backdrop: styled.div<{ opened: boolean; opacity: number }>`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.overlay};

    background-color: rgb(0 0 0 / 46%);

    transition: opacity 0.3s ease;
    opacity: ${({ opacity }) => opacity};
    pointer-events: ${({ opened }) => (opened ? 'auto' : 'none')};
  `,

  Header: styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `,

  CloseButton: styled.button`
    position: absolute;
    right: 10px;

    @media (pointer: coarse) {
      display: none;
    }
  `,

  HandleBar: styled.div`
    width: 100px;
    height: 6px;
    display: none;

    margin: 0 auto;

    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    border-radius: ${({ theme }) => theme.RADIUS.large};

    @media (pointer: coarse) {
      display: block;
    }
  `,
};
