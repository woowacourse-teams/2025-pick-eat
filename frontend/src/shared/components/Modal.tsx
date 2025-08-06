import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Button from './actions/Button';
import Cross from './assets/icons/Cross';

type Props = {
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

function Inner({
  opened,
  onClose,
  children,
  onUnmount,
  size = 'md',
  closeButton = true,
}: Omit<Props, 'mounted'>) {
  const [text, setText] = useState(0);

  if (!opened) return null;

  return (
    <>
      <S.BackDrop onClick={() => onClose()} />
      <S.Container size={size}>
        {closeButton && (
          <S.IconWrapper onClick={onUnmount}>
            <Cross color="white" size="sm" strokeWidth={4} />
          </S.IconWrapper>
        )}
        <Button text="+1" size="sm" onClick={() => setText(prev => prev + 1)} />
        <div>{text}</div>
        {children}
      </S.Container>
    </>
  );
}

const S = {
  BackDrop: styled.div`
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
    position: fixed;
    z-index: ${({ theme }) => theme.Z_INDEX.overlay};
    backdrop-filter: blur(2px);
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

    padding: 2px;

    background-color: ${({ theme }) => theme.PALETTE.primary[50]};

    border-radius: ${({ theme }) => theme.RADIUS.half};

    margin-left: auto;
    cursor: pointer;
  `,
};
