import PreferRestaurantList from '@domains/pickeat/preferRestaurant/components/PreferRestaurantList';

import VisuallyHiddenWithFocus from '@components/accessibility/VisuallyHiddenWithFocus';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import ProgressBar from '@components/progressBar/ProgressBar';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { usePickeatStateChecker } from '@domains/pickeat/matchResult/hooks/usePickeatEndCheck';
import ParticipantsProvider from '@domains/pickeat/provider/ParticipantsProvider';

import { usePreventGoBack } from '@hooks/usePreventGoBack';

import styled from '@emotion/styled';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import TitleSection from '../components/TitleSection';

import PickeatEndTriggerButton from './components/PickeatEndTriggerButton';
import Title from './components/Title';

const FOOTER_HEIGHT = 74;

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
        <VisuallyHiddenWithFocus>
          식당 투표하기 페이지입니다.
        </VisuallyHiddenWithFocus>
        <S.ProgressBarWrapper>
          <ProgressBar total={3} current={step} />
        </S.ProgressBarWrapper>

        <TitleSection>
          <Title />
        </TitleSection>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <S.RestaurantListContainer>
              <PreferRestaurantList />
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
    min-height: 100%;
    display: flex;
    flex-direction: column;

    padding-top: ${({ theme }) => theme.LAYOUT.headerHeight};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  RestaurantListContainer: styled.div`
    width: 100%;
    min-height: 580px;

    padding-bottom: ${FOOTER_HEIGHT}px;
  `,

  ProgressBarWrapper: styled.div`
    width: 100vw;
    max-width: 480px;
    position: fixed;
    top: ${({ theme }) => theme.LAYOUT.headerHeight};
    left: 50%;
    z-index: ${({ theme }) => theme.Z_INDEX.fixed};
    transform: translateX(-50%);
  `,
};
