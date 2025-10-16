import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import Cross from './assets/icons/Cross';

type Props = {
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
};

/*
    BOTTOM_SHEET_HEIGHT : 시트가 닫혀있을 때의 이동 거리 기준이 되기 위한바텀 시트 height를 계산
    AUTO_CLOSE_MIN_DRAG : 100px 이상 아래로 드래그 시 시트 자동 닫힘
    FADE_END : 백드롭이 완전히 투명해지는 바텀 시트 이동 거리
*/
const BOTTOM_SHEET_HEIGHT = window.innerHeight * 0.8;
const AUTO_CLOSE_MIN_DRAG = 100;
const FADE_END = 300;

function BottomSheet({ opened, onClose, children }: Props) {
  /*
    startY : 터치 드래그 시 처음 손가락을 놓은 위치
    sheetDistanceFromBottom : 시트가 현재 화면에서 얼마나 아래로 이동했는지(px)
    isDragging: 드래그 중일 때는 부드럽게 변화하는 transition을 없애기 위해 상태 정의
  */
  const startY = useRef<number | null>(null);
  const [sheetDistanceFromBottom, setSheetDistanceFromBottom] =
    useState<number>(BOTTOM_SHEET_HEIGHT);
  const [isDragging, setIsDragging] = useState(false);

  const closeBottomSheet = () => {
    setSheetDistanceFromBottom(BOTTOM_SHEET_HEIGHT);
    onClose();
  };

  useEffect(() => {
    if (!opened) return;

    setSheetDistanceFromBottom(0);

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
    handleTouchMove : 드래그 거리를 계산하여 sheetDistanceFromBottom 값 변경(바텀 시트 위치 이동)
    handleTouchEnd : AUTO_CLOSE_MIN_DRAG 이상 아래로 드래그 => 바텀 시트 닫힘
                     AUTO_CLOSE_MIN_DRAG 이하 => 원위치
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
      setSheetDistanceFromBottom(delta);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (sheetDistanceFromBottom > AUTO_CLOSE_MIN_DRAG) {
      closeBottomSheet();
    } else {
      setSheetDistanceFromBottom(0);
    }

    startY.current = null;
  };

  /* 
    opacity : 바텀 시트 이동 거리에 따른 백드롭 투명도
    => FADE_END 만큼 이동하면 백드롭 투명해짐, 완전히 바텀 시트가 닫혔을 때 투명해지는 것 보다 자연스러워 보였음!
  */

  const opacity = !opened
    ? 0
    : 1 - Math.min(sheetDistanceFromBottom / FADE_END, 1);

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
        sheetDistanceFromBottom={sheetDistanceFromBottom}
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
    sheetDistanceFromBottom: number;
  }>`
    ${({ theme }) => theme.POSITION.fixedCenter}

    height: 80%;

    bottom: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.modal};

    padding: 0 ${({ theme }) => theme.PADDING.p5}
      ${({ theme }) => theme.PADDING.p5} ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    transition: ${({ dragging }) =>
      dragging ? 'none' : 'transform 0.35s ease-out'};
    border-radius: ${({ theme }) => theme.RADIUS.xlarge}
      ${({ theme }) => theme.RADIUS.xlarge} 0 0;
    opacity: ${({ opened }) => (opened ? 1 : 0)};
    pointer-events: ${({ opened }) => (opened ? 'auto' : 'none')};
    transform: ${({ sheetDistanceFromBottom }) =>
      `translate3d(-50% ,${sheetDistanceFromBottom}px, 0)`};

    will-change: transform;
  `,

  Backdrop: styled.div<{ opened: boolean; opacity: number }>`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.overlay};

    background-color: rgb(0 0 0 / 50%);

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

    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    border-radius: ${({ theme }) => theme.RADIUS.small};

    @media (pointer: coarse) {
      display: block;
    }
  `,
};
