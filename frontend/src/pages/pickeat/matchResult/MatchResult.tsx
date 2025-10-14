import { HEADER_HEIGHT } from '@widgets/Header';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import PendingResultScreen from './components/PendingResultScreen';
import ResultScreen from './components/ResultScreen';

const scaleUp = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

function MatchResult() {
  const [readied, setReadied] = useState(false);
  return (
    <S.Container>
      {readied ? (
        <S.ResultScreenWrapper>
          <ResultScreen />
        </S.ResultScreenWrapper>
      ) : (
        <PendingResultScreen onReady={() => setReadied(true)} />
      )}
    </S.Container>
  );
}

export default MatchResult;

const S = {
  Container: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: ${HEADER_HEIGHT};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
  ResultScreenWrapper: styled.div`
    animation: ${scaleUp} 0.3s ease forwards;
  `,
};
