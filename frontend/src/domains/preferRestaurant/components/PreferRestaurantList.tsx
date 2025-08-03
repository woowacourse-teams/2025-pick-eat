import { Restaurant } from '@apis/restaurant';

import { useFlip } from '@hooks/useFlip';

import styled from '@emotion/styled';
import { use } from 'react';

import usePreferRestaurant from '../hooks/usePreferRestaurant';

import PreferRestaurantItem from './PreferRestaurantItem';

type Prop = {
  preferRestaurantListPromise: Promise<Restaurant[]>;
};

function PreferRestaurantList({ preferRestaurantListPromise }: Prop) {
  const initialData = use(preferRestaurantListPromise);
  const { restaurantList, updateSortedRestaurantList } =
    usePreferRestaurant(initialData);
  const { itemRefs } = useFlip(restaurantList);

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
            onUpdateRestaurant={updateSortedRestaurantList}
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
