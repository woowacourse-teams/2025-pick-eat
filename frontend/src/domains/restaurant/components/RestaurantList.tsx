import styled from '@emotion/styled';

import RestaurantItem from './RestaurantItem';

type RestaurantData = {
  name: string;
  category: string;
  link: string;
  distance: number;
};

type Props = {
  restaurantList: RestaurantData[];
};

function RestaurantList({ restaurantList }: Props) {
  return (
    <S.Container>
      {restaurantList.map(restaurant => (
        <RestaurantItem key={restaurant.link} {...restaurant} />
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
