import { Restaurant } from '@apis/restaurant';

import { useFlip } from '@hooks/useFlip';

import styled from '@emotion/styled';

import { usePreferRestaurantContext } from '../context/PreferRestaurantProvider';

import PreferRestaurantItem from './PreferRestaurantItem';

function PreferRestaurantList() {
  const { restaurantList } = usePreferRestaurantContext();

  const { itemRefs } = useFlip(restaurantList);

  return (
    <S.Container>
      {restaurantList.map((item: Restaurant) => (
        <S.ItemWrapper
          key={item.id}
          ref={el => {
            if (el) itemRefs.current.set(item.id, el);
          }}
        >
          <PreferRestaurantItem
            id={item.id}
            name={item.name}
            tags={item.tags}
            category={item.category}
            distance={item.distance}
            likeCount={item.likeCount}
            placeUrl={item.placeUrl}
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
