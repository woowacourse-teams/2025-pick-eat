import { restaurants } from '@apis/restaurants';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

function PickeatDecisionInfo() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const [hasTie, setHasTie] = useState(false);

  useEffect(() => {
    restaurants.get(pickeatCode).then(restaurantsData => {
      const maxLikeCount = Math.max(
        ...restaurantsData.map(restaurant => restaurant.likeCount)
      );
      const topRestaurants = restaurantsData.filter(
        restaurant => restaurant.likeCount === maxLikeCount
      );
      setHasTie(topRestaurants.length > 1);
    });
  }, []);

  return (
    <S.Container>
      종료 시점에 좋아요가 제일 많은 식당으로 결정됩니다
      {hasTie && (
        <S.Description>
          현재 동점이 있어 랜덤으로 결과가 결정됩니다
        </S.Description>
      )}
    </S.Container>
  );
}

export default PickeatDecisionInfo;

const S = {
  Container: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
    flex-direction: column;
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
