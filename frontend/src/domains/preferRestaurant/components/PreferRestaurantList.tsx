import { Restaurant } from '@apis/restaurant';

import { useFlip } from '@hooks/useFlip';

import styled from '@emotion/styled';

import { LikeProvider } from '../context/LikeProvider';
import { usePreferRestaurantContext } from '../context/PreferRestaurantProvider';

import PreferRestaurantItem from './PreferRestaurantItem';

function PreferRestaurantList() {
  const { restaurantList } = usePreferRestaurantContext();

  const { itemRefs } = useFlip(restaurantList);

  const { updateSortedRestaurantList } = usePreferRestaurantContext();

  return (
    <S.Container>
      {restaurantList.map((restaurant: Restaurant) => (
        <S.ItemWrapper
          key={restaurant.id}
          ref={el => {
            if (el) itemRefs.current.set(restaurant.id, el);
          }}
        >
          <LikeProvider updateSortedRestaurantList={updateSortedRestaurantList}>
            <PreferRestaurantItem
              id={restaurant.id}
              name={restaurant.name}
              tags={restaurant.tags}
              category={restaurant.category}
              distance={restaurant.distance}
              likeCount={restaurant.likeCount}
              placeUrl={restaurant.placeUrl}
            />
          </LikeProvider>
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
