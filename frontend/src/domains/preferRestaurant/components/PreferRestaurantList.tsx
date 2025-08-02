import { Restaurant } from '@apis/restaurant';

import { useFlip } from '@hooks/useFlip';

import styled from '@emotion/styled';

import usePreferRestaurant from '../hooks/usePreferRestaurant';

import PreferRestaurantItem from './PreferRestaurantItem';

function PreferRestaurantList() {
  const { restaurantList, updateSortedRestaurantList } = usePreferRestaurant();
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
            id={restaurant.id}
            name={restaurant.name}
            tags={restaurant.tags}
            category={restaurant.category}
            distance={restaurant.distance}
            likeCount={restaurant.likeCount}
            placeUrl={restaurant.placeUrl}
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
