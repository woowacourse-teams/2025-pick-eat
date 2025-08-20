import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid ${({ theme }) => theme.PALETTE.gray[10]};
  border-top: 4px solid ${({ theme }) => theme.PALETTE.primary[50]};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

function LoadingSpinner() {
  return (
    <S.Container>
      <Spinner aria-label="Loading" />
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
};
