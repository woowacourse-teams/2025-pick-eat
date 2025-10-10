import PickeatEndModal from '@domains/pickeat/matchResult/components/PickeatEndModal';
import RestaurantExclude from '@domains/pickeat/restaurantExclude/components/RestaurantExclude';

import { HEADER_HEIGHT } from '@widgets/Header';

import LoadingSpinner from '@components/assets/LoadingSpinner';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { usePickeatStateChecker } from '@domains/pickeat/matchResult/hooks/usePickeatEndCheck';
import ParticipantsProvider from '@domains/pickeat/provider/ParticipantsProvider';

import { restaurants } from '@apis/restaurants';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

import TitleSection from '../components/TitleSection';

import Title from './components/Title';

function RestaurantExcludePage() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const { hasRestaurants } = usePickeatStateChecker(pickeatCode);

  return (
    <ParticipantsProvider pickeatCode={pickeatCode}>
      <S.Container>
        {!hasRestaurants && <PickeatEndModal />}
        <TitleSection>
          <Title />
        </TitleSection>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <RestaurantExclude
              restaurantsPromise={restaurants.get(pickeatCode)}
            />
          </Suspense>
        </ErrorBoundary>
      </S.Container>
    </ParticipantsProvider>
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
