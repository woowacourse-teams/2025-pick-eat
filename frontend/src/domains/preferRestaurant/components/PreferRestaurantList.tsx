import { Restaurant } from '@apis/restaurant';

import { useFlip } from '@hooks/useFlip';

import styled from '@emotion/styled';
import { use } from 'react';

import useLike from '../hooks/useLike';
import usePreferRestaurant from '../hooks/usePreferRestaurant';

import PreferRestaurantItem from './PreferRestaurantItem';

type Props = {
  preferRestaurantListPromise: Promise<Restaurant[]>;
};

function PreferRestaurantList({ preferRestaurantListPromise }: Props) {
  const initialData = use(preferRestaurantListPromise);

  const { restaurantList, updateSortedRestaurantList, likedIds, setLikedIds } =
    usePreferRestaurant(initialData);
  const { itemRefs } = useFlip(restaurantList);
  const { isLiked, handleLike, handleUnlike } = useLike(
    updateSortedRestaurantList,
    likedIds,
    setLikedIds
  );

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
            liked={isLiked(restaurant.id)}
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
