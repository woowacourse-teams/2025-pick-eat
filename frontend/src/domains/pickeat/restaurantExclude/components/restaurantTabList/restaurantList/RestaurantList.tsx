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
        <S.NoContentPointText>
          해당 카테고리에
          <br /> 식당이 없어요ㅠㅠ
        </S.NoContentPointText>
      ) : (
        <S.Container>
          {restaurantList.map(restaurant =>
            restaurant.isExcluded ? (
              <ExcludedRestaurantItem
                key={restaurant.id}
                restaurantData={restaurant}
              />
            ) : (
              <RestaurantItem key={restaurant.id} restaurantData={restaurant} />
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
  NoContentPointText: styled.p`
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.heading.large_style};
    text-align: center;
  `,
};
