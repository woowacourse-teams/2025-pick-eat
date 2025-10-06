import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: ReactNode;
  opened: boolean;
  mounted: boolean;
  onClose: () => void;
  onUnmount?: () => void;
};

function BottomSheet({ opened, mounted, onClose, children }: Props) {
  useEffect(() => {
    if (!opened) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened]);

  if (!mounted) return;
  const modalRoot = document.querySelector('#modal') as HTMLElement;

  return ReactDOM.createPortal(
    <>
      <S.Backdrop onClick={onClose} opened={opened} />
      <S.Container opened={opened}>
        <S.Header>
          <S.HandleBar />
        </S.Header>
        {children}
      </S.Container>
    </>,
    modalRoot
  );
}

export default BottomSheet;

const S = {
  //TODO:radius theme에서 뽑아쓰기
  Container: styled.div<{ opened: boolean }>`
    width: 100%;
    height: 70%;

    position: fixed;
    bottom: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.modal};

    padding: 0 ${({ theme }) => theme.PADDING.p5}
      ${({ theme }) => theme.PADDING.p5} ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    border-radius: 30px 30px 0 0;
    opacity: ${({ opened }) => (opened ? 1 : 0)};
    pointer-events: ${({ opened }) => (opened ? 'auto' : 'none')};
  `,

  Backdrop: styled.div<{ opened: boolean }>`
    width: 100%;
    height: 100vh;

    display: ${({ opened }) => (opened ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.overlay};

    background-color: rgb(0 0 0 / 46%);
    backdrop-filter: blur(2px);
  `,

  Header: styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  HandleBar: styled.div`
    width: 100px;
    height: 6px;

    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,
};
