import RestaurantExcludeWithProvider from '@domains/restaurantExclude/components/RestaurantExclude';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { restaurants } from '@apis/restaurant';

import styled from '@emotion/styled';
import { Suspense } from 'react';

import TitleArea from './components/TitleArea';

function RestaurantExcludePage() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  return (
    <S.Container>
      <TitleArea />
      <ErrorBoundary>
        <Suspense fallback={<></>}>
          <RestaurantExcludeWithProvider
            restaurantData={restaurants.get(code ?? '')}
          />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
}

export default RestaurantExcludePage;

const S = {
  Container: styled.div`
    width: 100%;
    height: fit-content;
    min-height: calc(100vh - 72px);

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
};
