import PickeatInfo from '@domains/pickeat/components/PickeatInfo';

import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { pickeat } from '@apis/pickeat';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

function PickeatDetail() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  return (
    <S.Container>
      <ErrorBoundary>
        <Suspense>
          <PickeatInfo pickeatData={pickeat.get(pickeatCode)} />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
}
export default PickeatDetail;

const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - ${HEADER_HEIGHT});
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
