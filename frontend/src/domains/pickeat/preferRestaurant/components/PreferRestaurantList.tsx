import PickeatEndModal from '@domains/pickeat/matchResult/components/PickeatEndModal';

import { restaurant, Restaurant } from '@apis/restaurant';

import { useFlip } from '@hooks/useFlip';

import styled from '@emotion/styled';
import { use } from 'react';

import { useOptimisticLike } from '../hooks/useOptimisticLike';
import usePreferRestaurant from '../hooks/usePreferRestaurant';

import PreferRestaurantItem from './PreferRestaurantItem';

type Props = {
  preferRestaurantListPromise: Promise<Restaurant[]>;
};

function PreferRestaurantList({ preferRestaurantListPromise }: Props) {
  const initialData = use(preferRestaurantListPromise);
  const {
    isOptimisticLike,
    syncOptimisticLikes,
    addOptimisticLike,
    removeOptimisticLike,
  } = useOptimisticLike(initialData);
  const { restaurantList, updateLikeCount } = usePreferRestaurant(
    initialData,
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
          <PreferRestaurantItem
            restaurant={restaurant}
            liked={isOptimisticLike(restaurant.id)}
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
