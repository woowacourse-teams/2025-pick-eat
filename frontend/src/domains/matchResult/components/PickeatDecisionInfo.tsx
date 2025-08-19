import { restaurants } from '@apis/restaurants';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

function PickeatDecisionInfo() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const [hasTie, setHasTie] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantsData = await restaurants.get(pickeatCode);
        const maxLikeCount = Math.max(
          ...restaurantsData.map(restaurant => restaurant.likeCount)
        );
        const topRestaurants = restaurantsData.filter(
          restaurant => restaurant.likeCount === maxLikeCount
        );
        setHasTie(topRestaurants.length > 1);
      } catch {
        alert('현재 통신이 원활하지 않습니다');
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <S.Container>
      현재 좋아요가 제일 많은 식당으로 결정됩니다
      {hasTie && (
        <S.Description>
          동점으로 인해 최대 득표수를 기록한 식당들 중 하나가 무작위로
          결정됩니다.
        </S.Description>
      )}
    </S.Container>
  );
}

export default PickeatDecisionInfo;

const S = {
  Container: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level2};
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
