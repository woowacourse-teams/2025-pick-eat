import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';

import ExcludedRestaurantItem from './ExcludedRestaurantItem';
import RestaurantItem from './RestaurantItem';

type Props = {
  restaurantList: Restaurant[];
};

function RestaurantList({ restaurantList }: Props) {
  return (
    <>
      {restaurantList.length === 0 ? (
        <S.NoContentTitle>
          해당 카테고리에
          <br /> 식당이 없어요ㅠㅠ
        </S.NoContentTitle>
      ) : (
        <S.Container>
          {restaurantList.map(restaurant =>
            restaurant.isExcluded ? (
              <ExcludedRestaurantItem key={restaurant.id} {...restaurant} />
            ) : (
              <RestaurantItem key={restaurant.id} {...restaurant} />
            )
          )}
        </S.Container>
      )}
    </>
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
  NoContentTitle: styled.p`
    width: 100%;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    font: ${({ theme }) => theme.FONTS.heading.large_style};
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    text-align: center;
  `,
};
