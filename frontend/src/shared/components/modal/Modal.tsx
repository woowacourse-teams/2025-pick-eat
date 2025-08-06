import Cross from '@components/assets/icons/Cross';

import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Inner from './Inner';

export type ModalProps = {
  opened: boolean;
  mounted: boolean;
  onClose: () => void;
  onOpen: () => void;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeButton?: boolean;
  onUnmount?: () => void;
};

function Modal({
  mounted,
  opened,
  onClose,
  onOpen,
  children,
  size = 'md',
  closeButton = true,
  onUnmount,
}: ModalProps) {
  if (!mounted) return;
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

  return ReactDOM.createPortal(
    <>
      {mounted && !opened && (
        <S.Mini onClick={() => onOpen()}>
          <S.IconWrapper onClick={onUnmount}>
            <Cross color="white" size="sm" strokeWidth={4} />
          </S.IconWrapper>
        </S.Mini>
      )}
      <Inner
        opened={opened}
        onClose={onClose}
        size={size}
        closeButton={closeButton}
        onUnmount={onUnmount}
      >
        {children}
      </Inner>
    </>,
    modalRoot
  );
}

export default Modal;

const S = {
  Mini: styled.div`
    width: 40px;
    height: 40px;
    position: fixed;
    top: 10px;
    right: 30px;
    background-color: white;
    border: solid 3px ${({ theme }) => theme.PALETTE.primary[50]};
    border-radius: ${({ theme }) => theme.RADIUS.half};
    cursor: pointer;
  `,

  IconWrapper: styled.div`
    width: 22px;
    height: 22px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: -10px;
    right: -10px;

    margin-left: auto;

    padding: 2px;

    background-color: ${({ theme }) => theme.PALETTE.primary[50]};

    border-radius: ${({ theme }) => theme.RADIUS.half};
    cursor: pointer;
  `,
};
