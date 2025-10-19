import PickeatInfo from '@domains/pickeat/components/PickeatInfo';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { pickeat } from '@apis/pickeat';

import styled from '@emotion/styled';
import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'react-router';

function PickeatDetail() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const pickeatData = useMemo(() => pickeat.get(pickeatCode), [pickeatCode]);

  return (
    <S.Container>
      <ErrorBoundary>
        <Suspense>
          <PickeatInfo pickeatData={pickeatData} />
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
