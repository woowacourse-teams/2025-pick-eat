import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';

import ExcludedRestaurantItem from './ExcludedRestaurantItem';
import RestaurantItem from './RestaurantItem';

type Props = {
  restaurantList: Restaurant[];
};

function RestaurantList({ restaurantList }: Props) {
  return (
    <S.Container>
      {restaurantList.map(restaurant => (
        restaurant.isExcluded ? (
          <ExcludedRestaurantItem key={restaurant.id} {...restaurant} />
        ) : <RestaurantItem key={restaurant.id} {...restaurant} />
      ))}
    </S.Container>
  );
}
export default RestaurantList;

const S = {
  Container: styled.div`
    width: 100%;
    display: grid;
    gap: ${({ theme }) => theme.GAP.level5};
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));

    padding: ${({ theme }) => theme.PADDING.p5};
  `,
};
