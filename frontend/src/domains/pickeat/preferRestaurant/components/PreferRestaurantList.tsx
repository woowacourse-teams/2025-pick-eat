import PickeatEndModal from '@domains/pickeat/matchResult/components/PickeatEndModal';

import LikeButton from '@components/actions/LikeButton/LikeButton';
import RestaurantCard from '@components/RestaurantCard';

import { restaurant, Restaurant } from '@apis/restaurant';
import { restaurantsQuery } from '@apis/restaurants';

import { useFlip } from '@hooks/useFlip';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

import { useOptimisticLike } from '../hooks/useOptimisticLike';
import usePreferRestaurant from '../hooks/usePreferRestaurant';

function PreferRestaurantList() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const { data: restaurantsData } = restaurantsQuery.useSuspenseGet(
    pickeatCode,
    {
      isExcluded: 'false',
      pollingInterval: 3000,
    }
  );

  const {
    isOptimisticLike,
    syncOptimisticLikes,
    addOptimisticLike,
    removeOptimisticLike,
  } = useOptimisticLike(restaurantsData);

  const { restaurantList, updateLikeCount } = usePreferRestaurant(
    restaurantsData,
    syncOptimisticLikes
  );

  const { itemRefs } = useFlip(restaurantList);

  const handleLike = async (id: number) => {
    addOptimisticLike(id);
    updateLikeCount(id, +1);

    try {
      restaurant.patchLike(id);
    } catch (error) {
      removeOptimisticLike(id);
      updateLikeCount(id, -1);

      console.log('좋아요 실패:', error);
    }
  };

  const handleUnlike = async (id: number) => {
    removeOptimisticLike(id);
    updateLikeCount(id, -1);

    try {
      restaurant.patchUnlike(id);
    } catch (error) {
      addOptimisticLike(id);
      updateLikeCount(id, +1);
      console.error('좋아요 취소 실패:', error);
    }
  };

  return (
    <S.Container>
      {!restaurantList.length && <PickeatEndModal />}

      {restaurantList.map((restaurant: Restaurant) => (
        <S.ItemWrapper
          key={restaurant.id}
          ref={el => {
            if (el) itemRefs.current.set(restaurant.id, el);
          }}
        >
          <RestaurantCard restaurantData={restaurant} />

          <S.LikeWrapper>
            <LikeButton
              id={restaurant.id}
              count={restaurant.likeCount}
              onLike={() => handleLike(restaurant.id)}
              onUnlike={() => handleUnlike(restaurant.id)}
              liked={isOptimisticLike(restaurant.id)}
            />
          </S.LikeWrapper>
        </S.ItemWrapper>
      ))}
    </S.Container>
  );
}

export default PreferRestaurantList;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  ItemWrapper: styled.div`
    width: 350px;
    display: flex;
    justify-content: center;
    position: relative;
    overflow-anchor: none;
  `,

  LikeWrapper: styled.div`
    width: 66px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    bottom: 10px;

    padding: ${({ theme }) => theme.PADDING.p1}
      ${({ theme }) => theme.PADDING.p4};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,
};
