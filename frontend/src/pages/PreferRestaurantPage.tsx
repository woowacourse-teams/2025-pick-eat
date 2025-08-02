import PreferRestaurantList from '@domains/preferRestaurant/components/PreferRestaurantList';

import Button from '@components/actions/Button';
import Arrow from '@components/assets/icons/Arrow';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import useParticipant from '@domains/preferRestaurant/hooks/useParticipant';

import { restaurants } from '@apis/restaurants';

import { useGA } from '@hooks/useGA';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

function PreferRestaurantPage() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const { participant } = useParticipant(pickeatCode);
  const navigate = useNavigate();

  const handleResultClick = () => {
    navigate(generateRouterPath.matchResult(pickeatCode));
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '결과 페이지 이동 버튼',
      value: 1,
    });
  };

  return (
    <S.Container>
      <S.TitleArea>
        <S.Title>
          가고 싶은 식당에 <br /> ❤️를 눌러 투표해 주세요.
        </S.Title>
        <S.ParticipantInfo>
          <S.Completed>참여자 총{participant.totalParticipants}명</S.Completed>
        </S.ParticipantInfo>
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
        <Button
          text="결과"
          color="secondary"
          size="md"
          onClick={handleResultClick}
          rightIcon={<Arrow size="sm" direction="right" color={'black'} />}
        />
      </S.Footer>
    </S.Container>
  );
}

export default PreferRestaurantPage;

const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `,

  RestaurantListContainer: styled.div`
    width: 100%;
    height: 78%;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};

    overflow-y: auto;
  `,

  TitleArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: ${({ theme }) => theme.PADDING.p7}
      ${({ theme }) => theme.PADDING.p6} 0;
  `,

  ParticipantInfo: styled.div`
    width: 100%;

    text-align: end;
  `,

  Completed: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  Footer: styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;

    padding: 0 10px;
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
