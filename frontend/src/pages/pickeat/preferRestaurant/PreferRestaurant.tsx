import PreferRestaurantList from '@domains/pickeat/preferRestaurant/components/PreferRestaurantList';

import Button from '@components/actions/Button';
import Arrow from '@components/assets/icons/Arrow';
import LoadingSpinner from '@components/assets/LoadingSpinner';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { usePickeatStateChecker } from '@domains/pickeat/matchResult/hooks/usePickeatEndCheck';
import ParticipantsProvider from '@domains/pickeat/provider/ParticipantsProvider';

import { restaurants } from '@apis/restaurants';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import TitleSection from '../components/TitleSection';

import PickeatEndTriggerButton from './components/PickeatEndTriggerButton';
import Title from './components/Title';

function PreferRestaurant() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  usePickeatStateChecker(pickeatCode);

  const navigate = useNavigate();

  return (
    <ParticipantsProvider pickeatCode={pickeatCode}>
      <S.Container>
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
        <S.Footer>
          <Button
            text="이전"
            color="gray"
            size="md"
            onClick={() =>
              navigate(generateRouterPath.restaurantsExclude(pickeatCode))
            }
            leftIcon={<Arrow size="sm" direction="left" color={'black'} />}
          />
          <PickeatEndTriggerButton />
        </S.Footer>
      </S.Container>
    </ParticipantsProvider>
  );
}

export default PreferRestaurant;

const S = {
  Container: styled.div`
    width: 100%;
    min-height: calc(100vh - ${({ theme }) => theme.LAYOUT.headerHeight});
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
  `,

  RestaurantListContainer: styled.div`
    width: 100%;
    min-height: 580px;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-top: 2px solid ${({ theme }) => theme.PALETTE.gray[20]};
  `,

  Footer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    bottom: 0;

    padding: ${({ theme }) => theme.PADDING.p4};

    background-color: white;
    border-top: 1px solid ${({ theme }) => theme.PALETTE.gray[20]};
  `,
};
