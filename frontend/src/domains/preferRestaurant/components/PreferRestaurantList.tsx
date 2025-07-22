import styled from '@emotion/styled';

import { usePreferRestaurantContext } from '../context/PreferRestaurantProvider';

import PreferRestaurantItem from './PreferRestaurantItem';

function PreferRestaurantList() {
  const { restaurantList } = usePreferRestaurantContext();

  return (
    <S.Container>
      {restaurantList.map(data => (
        <PreferRestaurantItem
          key={data.id}
          id={data.id}
          name={data.name}
          category={data.category}
          distance={data.distance}
          likeCount={data.likeCount}
        />
      ))}
    </S.Container>
  );
}

export default PreferRestaurantList;

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
