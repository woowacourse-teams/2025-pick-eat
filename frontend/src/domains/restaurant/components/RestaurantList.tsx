import { Restaurant } from '@apis/restaurant';
import styled from '@emotion/styled';

import RestaurantItem from './RestaurantItem';

type Props = {
  restaurantList: Restaurant[];
};

function RestaurantList({ restaurantList }: Props) {
  return (
    <S.Container>
      {restaurantList.map(restaurant => (
        <RestaurantItem key={restaurant.id} {...restaurant} />
      ))}
    </S.Container>
  );
}
export default RestaurantList;

const S = {
  Container: styled.div`
    width: 100%;
    display: grid;
    gap: 16px;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));

    padding: 16px;
  `,
};
