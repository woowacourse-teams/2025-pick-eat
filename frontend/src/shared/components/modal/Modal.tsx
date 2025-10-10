import Cross from '@components/assets/icons/Cross';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

export type Props = {
  opened: boolean;
  mounted: boolean;
  onClose: () => void;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeButton?: boolean;
  onUnmount?: () => void;
};

function Modal({
  mounted,
  opened,
  onClose,
  children,
  size = 'md',
  closeButton = true,
  onUnmount,
}: Props) {
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
      <S.BackDrop opened={opened} onClick={onClose} />
      <S.Container opened={opened} size={size}>
        {closeButton && (
          <S.IconWrapper onClick={onUnmount}>
            <Cross color="white" size="sm" strokeWidth={4} />
          </S.IconWrapper>
        )}
        {children}
      </S.Container>
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

    border: solid 3px ${({ theme }) => theme.PALETTE.primary[50]};

    background-color: white;
    border-radius: ${({ theme }) => theme.RADIUS.half};
    cursor: pointer;
  `,
  BackDrop: styled.div<{ opened: boolean }>`
    width: 100%;
    height: 100vh;

    display: ${({ opened }) => (opened ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.overlay};

    background-color: rgb(0 0 0 / 10%);
    backdrop-filter: blur(2px);
  `,

  Container: styled.div<{ size: 'sm' | 'md' | 'lg'; opened: boolean }>`
    width: ${({ size }) =>
      size === 'sm' ? '500px' : size === 'md' ? '600px' : '700px'};

    position: fixed;
    top: 50%;
    left: 50%;
    z-index: ${({ theme }) => theme.Z_INDEX.modal};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: white;

    border-radius: ${({ theme }) => theme.RADIUS.medium};
    opacity: ${({ opened }) => (opened ? 1 : 0)};
    pointer-events: ${({ opened }) => (opened ? 'auto' : 'none')};

    transform: translate(-50%, -50%);

    ${setMobileStyle(css`
      width: 90%;
    `)}
  `,

  IconWrapper: styled.div`
    width: 30px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: -10px;
    right: -10px;

    margin-left: auto;

    padding: ${({ theme }) => theme.PADDING.p1};

    background-color: ${({ theme }) => theme.PALETTE.primary[50]};
    border-radius: ${({ theme }) => theme.RADIUS.half};
    cursor: pointer;
  `,
};
