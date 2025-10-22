import PickeatEndModal from '@domains/pickeat/matchResult/components/PickeatEndModal';

import LikeButton from '@components/actions/LikeButton/LikeButton';
import RestaurantCard from '@components/RestaurantCard';

import { Restaurant } from '@apis/restaurant';
import { restaurantsQuery } from '@apis/restaurants';

import { useFlip } from '@hooks/useFlip';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

function PreferRestaurantList() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const { data: restaurantList } = restaurantsQuery.useSuspenseGet(
    pickeatCode,
    {
      isExcluded: 'false',
      pollingInterval: 3000,
    }
  );

  const sortRestaurants = (restaurantList: Restaurant[]) => {
    return restaurantList.sort((a, b) => {
      if (b.likeCount !== a.likeCount) {
        return b.likeCount - a.likeCount;
      }

      return a.name.localeCompare(b.name, 'ko');
    });
  };

  const { itemRefs } = useFlip(sortRestaurants(restaurantList));

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
          <RestaurantCard restaurantData={restaurant} />
          <LikeButton
            id={restaurant.id}
            count={restaurant.likeCount}
            liked={restaurant.isLiked}
            name={restaurant.name}
          />
        </S.ItemWrapper>
      ))}
    </S.Container>
  );
}

export default PreferRestaurantList;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  ItemWrapper: styled.div`
    width: 350px;
    display: flex;
    justify-content: center;
    position: relative;
    overflow-anchor: none;
  `,
};
