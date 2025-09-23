import PreferRestaurantList from '@domains/preferRestaurant/components/PreferRestaurantList';

import Button from '@components/actions/Button';
import Arrow from '@components/assets/icons/Arrow';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { usePickeatStateChecker } from '@domains/matchResult/hooks/usePickeatEndCheck';

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
  );
}

export default PreferRestaurant;

const S = {
  Container: styled.div`
    width: 100%;
    min-height: calc(100vh - ${HEADER_HEIGHT});
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
