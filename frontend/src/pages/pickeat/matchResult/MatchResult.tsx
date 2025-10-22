import ResultContent from '@domains/pickeat/matchResult/components/ResultContent';

import VisuallyHiddenWithFocus from '@components/accessibility/VisuallyHiddenWithFocus';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import styled from '@emotion/styled';
import { Suspense } from 'react';

import PendingResultScreen from './components/PendingResultScreen';

function MatchResult() {
  return (
    <S.Container>
      <VisuallyHiddenWithFocus aria-live="polite" role="status">
        제외하기 페이지 입니다.
      </VisuallyHiddenWithFocus>
      <ErrorBoundary>
        <Suspense fallback={<PendingResultScreen />}>
          <ResultContent />
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
