import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import RestaurantExclude from '@domains/restaurantExclude/RestaurantExclude';

import { restaurants } from '@apis/restaurant';
import styled from '@emotion/styled';
import { Suspense } from 'react';

import TitleArea from './components/TitleArea';

function RestaurantExcludePage() {
  return (
    <S.Container>
      <TitleArea />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <RestaurantExclude
            restaurantData={restaurants.get(
              '05882bbe-93f9-4b5c-8c33-52d9b6732939'
            )}
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

    background-color: ${({ theme }) => theme.PALLETE.gray[0]};
  `,
};
