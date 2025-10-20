import ResultContent from '@domains/pickeat/matchResult/components/ResultContent';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

import PendingResultScreen from './components/PendingResultScreen';

function MatchResult() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  return (
    <S.Container>
      <ErrorBoundary>
        <Suspense fallback={<PendingResultScreen />}>
          <ResultContent pickeatCode={pickeatCode} />
        </Suspense>
      </ErrorBoundary>
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

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
};
