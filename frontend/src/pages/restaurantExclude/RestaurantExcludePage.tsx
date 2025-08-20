import RestaurantExclude from '@domains/restaurantExclude/components/RestaurantExclude';

import LoadingSpinner from '@components/assets/LoadingSpinner';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { usePickeatStateChecker } from '@domains/matchResult/hooks/usePickeatEndCheck';

import { restaurants } from '@apis/restaurants';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

import TitleArea from './components/TitleArea';

function RestaurantExcludePage() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  usePickeatStateChecker(pickeatCode);

  return (
    <S.Container>
      <TitleArea />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <RestaurantExclude
            restaurantsPromise={restaurants.get(pickeatCode)}
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
    min-height: calc(100vh - ${HEADER_HEIGHT});

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
};
