import PickeatInfo from '@domains/pickeat/components/PickeatInfo';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { pickeat } from '@apis/pickeat';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

function PickeatDetail() {
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('code') ?? '';
  return (
    <S.Container>
      <ErrorBoundary>
        <Suspense>
          <PickeatInfo pickeatData={pickeat.get(roomCode)} />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
}
export default PickeatDetail;

const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - 72px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
