import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  opened: boolean;
  onClose: () => void;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

function Modal({ opened, onClose, children, size = 'md' }: Props) {
  const modalRoot = document.querySelector('#modal') as HTMLElement;

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

  if (!opened) return null;

  return ReactDOM.createPortal(
    <>
      <S.BackDrop onClick={() => onClose()} />
      <S.Container size={size}>{children}</S.Container>
    </>,
    modalRoot
  );
}

export default Modal;

const S = {
  BackDrop: styled.div`
    height: 100vh;
    width: 100%;
    background-color: rgba(1, 1, 1, 0.2);
    top: 0;
    left: 0;
    position: fixed;
    z-index: ${({ theme }) => theme.Z_INDEX.overlay};
  `,

  Container: styled.div<{ size: 'sm' | 'md' | 'lg' }>`
    width: ${({ size }) =>
      size === 'sm' ? '500px' : size === 'md' ? '600px' : '700px'};
    background-color: white;
    border-radius: ${({ theme }) => theme.RADIUS.medium3};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: ${({ theme }) => theme.PADDING.p10};
    z-index: ${({ theme }) => theme.Z_INDEX.modal};
  `,
};
