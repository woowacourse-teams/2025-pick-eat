import PickeatInfo from '@domains/pickeat/components/PickeatInfo';

import VisuallyHiddenWithFocus from '@components/accessibility/VisuallyHiddenWithFocus';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import styled from '@emotion/styled';
import { Suspense } from 'react';

function PickeatDetail() {
  return (
    <S.Container>
      <VisuallyHiddenWithFocus>입장 페이지 입니다.</VisuallyHiddenWithFocus>
      <ErrorBoundary>
        <Suspense>
          <PickeatInfo />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
}
export default PickeatDetail;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: ${({ theme }) => theme.LAYOUT.headerHeight};
  `,
};
