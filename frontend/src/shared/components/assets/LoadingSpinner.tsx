import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

function LoadingSpinner() {
  return (
    <S.Container>
      <S.Spinner aria-label="Loading" />
    </S.Container>
  );
}

export default LoadingSpinner;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Spinner: styled.div`
    width: 40px;
    height: 40px;

    border: 4px solid ${({ theme }) => theme.PALETTE.gray[10]};

    animation: ${spin} 1s linear infinite;
    border-radius: 50%;
    border-top: 4px solid ${({ theme }) => theme.PALETTE.primary[50]};
  `,
};
