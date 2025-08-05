import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  opened: boolean;
  onClose: () => void;
  children?: ReactNode;
};

function Modal({ opened, onClose, children }: Props) {
  const modalRoot = document.querySelector('#modal') as HTMLElement;
  if (!opened) return null;

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  return ReactDOM.createPortal(
    opened && (
      <>
        <S.BackDrop onClick={() => onClose()} />
        <S.Container>{children}</S.Container>
      </>
    ),
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

  Container: styled.div`
    width: 500px;
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
