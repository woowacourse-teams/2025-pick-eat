import { restaurant, Restaurant } from '@apis/restaurant';

import { useFlip } from '@hooks/useFlip';

import styled from '@emotion/styled';
import { use } from 'react';

import usePreferRestaurant from '../hooks/usePreferRestaurant';
import { useVisibleLike } from '../hooks/useVisibleLike';

import PreferRestaurantItem from './PreferRestaurantItem';

type Props = {
  preferRestaurantListPromise: Promise<Restaurant[]>;
};

function PreferRestaurantList({ preferRestaurantListPromise }: Props) {
  const initialData = use(preferRestaurantListPromise);
  const { isLikeVisible, syncVisibleLikes, addVisibleLike, removeVisibleLike } =
    useVisibleLike(initialData);
  const { restaurantList, updateLikeCount } = usePreferRestaurant(
    initialData,
    syncVisibleLikes
  );
  const { itemRefs } = useFlip(restaurantList);

  const handleLike = async (id: number) => {
    addVisibleLike(id);
    updateLikeCount(id, +1);

    try {
      restaurant.patchLike(id);
    } catch (error) {
      removeVisibleLike(id);
      updateLikeCount(id, -1);

      console.log('좋아요 실패:', error);
    }
  };

  const handleUnlike = async (id: number) => {
    removeVisibleLike(id);
    updateLikeCount(id, -1);

    try {
      restaurant.patchUnlike(id);
    } catch (error) {
      addVisibleLike(id);
      updateLikeCount(id, +1);
      console.error('좋아요 취소 실패:', error);
    }
  };

  return (
    <S.Container>
      {restaurantList.map((restaurant: Restaurant) => (
        <S.ItemWrapper
          key={restaurant.id}
          ref={el => {
            if (el) itemRefs.current.set(restaurant.id, el);
          }}
        >
          <PreferRestaurantItem
            restaurant={restaurant}
            liked={isLikeVisible(restaurant.id)}
            onLike={handleLike}
            onUnlike={handleUnlike}
          />
        </S.ItemWrapper>
      ))}
    </S.Container>
  );
}

export default PreferRestaurantList;

const S = {
  Container: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.GAP.level5};
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));

    padding: ${({ theme }) => theme.PADDING.p5};
  `,

  ItemWrapper: styled.div`
    overflow-anchor: none;
  `,
};
