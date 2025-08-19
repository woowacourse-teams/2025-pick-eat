import PickeatEndButton from '@domains/matchResult/components/PickeatEndButton';
import Participant from '@domains/preferRestaurant/components/Participant';
import PreferRestaurantList from '@domains/preferRestaurant/components/PreferRestaurantList';

import Button from '@components/actions/Button';
import Arrow from '@components/assets/icons/Arrow';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { usePickeatStateChecker } from '@domains/matchResult/hooks/usePickeatEndCheck';

import { restaurants } from '@apis/restaurants';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

function PreferRestaurant() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const navigate = useNavigate();
  usePickeatStateChecker(pickeatCode);

  return (
    <S.Container>
      <S.TitleArea>
        <S.Title>
          가고 싶은 식당에 <br /> ❤️를 눌러 투표해 주세요.
        </S.Title>
        <Participant pickeatCode={pickeatCode} />
      </S.TitleArea>

      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중</div>}>
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
        <PickeatEndButton />
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

  TitleArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: ${({ theme }) => theme.PADDING.p7}
      ${({ theme }) => theme.PADDING.p6} 0;
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

  Title: styled.p`
    color: ${({ theme }) => theme.PALETTE.secondary[60]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,

  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,

  Restaurants: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Restaurant: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  RestaurantName: styled.p`
    width: 150px;

    font: ${({ theme }) => theme.FONTS.body.large};
  `,

  Adress: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  Distance: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
