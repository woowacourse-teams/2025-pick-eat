import PreferRestaurantList from '@domains/pickeat/preferRestaurant/components/PreferRestaurantList';

import { HEADER_HEIGHT } from '@widgets/Header';

import LoadingSpinner from '@components/assets/LoadingSpinner';
import ProgressBar from '@components/progressBar/ProgressBar';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { usePickeatStateChecker } from '@domains/pickeat/matchResult/hooks/usePickeatEndCheck';
import ParticipantsProvider from '@domains/pickeat/provider/ParticipantsProvider';

import { restaurants } from '@apis/restaurants';

import styled from '@emotion/styled';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import TitleSection from '../components/TitleSection';

import PickeatEndTriggerButton from './components/PickeatEndTriggerButton';
import Title from './components/Title';

const footerHeight = 74;

function PreferRestaurant() {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  usePickeatStateChecker(pickeatCode);

  useEffect(() => {
    setStep(2);
  }, []);

  return (
    <ParticipantsProvider pickeatCode={pickeatCode}>
      <S.Container>
        <S.ProgressBarWrapper>
          <ProgressBar total={3} current={step} />
        </S.ProgressBarWrapper>
        <TitleSection>
          <Title />
        </TitleSection>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <S.RestaurantListContainer>
              <PreferRestaurantList
                preferRestaurantListPromise={restaurants.get(pickeatCode, {
                  isExcluded: 'false',
                })}
              />
            </S.RestaurantListContainer>
          </Suspense>
        </ErrorBoundary>

        <PickeatEndTriggerButton />
      </S.Container>
    </ParticipantsProvider>
  );
}

export default PreferRestaurant;

const S = {
  Container: styled.div`
    width: 100%;
    padding-top: ${HEADER_HEIGHT};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  RestaurantListContainer: styled.div`
    width: 100%;
    min-height: 580px;
    padding: ${({ theme }) => theme.PADDING.p5};
    padding-bottom: ${footerHeight}px;
  `,

  ProgressBarWrapper: styled.div`
    width: 100vw;
    max-width: 480px;
    position: fixed;
    top: ${HEADER_HEIGHT};
    left: 50%;
    z-index: ${({ theme }) => theme.Z_INDEX.fixed};
    transform: translateX(-50%);
  `,
};
