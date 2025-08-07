import Cross from '@components/assets/icons/Cross';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ModalType } from './Modal';

function Inner({
  opened,
  onClose,
  children,
  onUnmount,
  size = 'md',
  closeButton = true,
}: Omit<ModalType, 'mounted' | 'onOpen'>) {
  if (!opened) return null;

  return (
    <>
      <S.BackDrop onClick={onClose} />
      <S.Container size={size}>
        {closeButton && (
          <S.IconWrapper onClick={onUnmount}>
            <Cross color="white" size="sm" strokeWidth={4} />
          </S.IconWrapper>
        )}
        {children}
      </S.Container>
    </>
  );
}

export default Inner;

const S = {
  BackDrop: styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.overlay};

    background-color: rgb(0 0 0 / 10%);
    backdrop-filter: blur(2px);
  `,

  Container: styled.div<{ size: 'sm' | 'md' | 'lg' }>`
    width: ${({ size }) =>
      size === 'sm' ? '500px' : size === 'md' ? '600px' : '700px'};

    position: fixed;
    top: 50%;
    left: 50%;
    z-index: ${({ theme }) => theme.Z_INDEX.modal};

    padding: ${({ theme }) => theme.PADDING.p10};

    background-color: white;

    animation: slide-up 0.3s ease-out forwards;

    border-radius: ${({ theme }) => theme.RADIUS.medium3};

    opacity: 0;
    transform: translate(-50%, 40%);

    ${setMobileStyle(css`
      width: 90%;
    `)}

    @keyframes slide-up {
      to {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
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
