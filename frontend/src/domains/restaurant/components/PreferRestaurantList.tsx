import styled from '@emotion/styled';
import { useState } from 'react';

import PreferRestaurantItem from './PreferRestaurantItem';

const PREFER_RESTAURANT_MOCK_DATA = [
  {
    id: 1,
    name: '스시준',
    category: '일식',
    distance: 30,
    roadAddressName: '대충 도로명 주소',
    likeCount: 3,
    x: 127.234124,
    y: 25.3294871,
  },
  {
    id: 2,
    name: '스시준2',
    category: '양식',
    distance: 30,
    roadAddressName: '대충 도로명 주소',
    likeCount: 3,
    x: 127.234124,
    y: 25.3294871,
  },
  {
    id: 3,
    name: '스시준3',
    category: '양식',
    distance: 30,
    roadAddressName: '대충 도로명 주소',
    likeCount: 3,
    x: 127.234124,
    y: 25.3294871,
  },
];

function PreferRestaurantList() {
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const handleLike = (id: number) => {
    setLikedIds(pre => [...pre, id]);
  };

  const handleCancel = (id: number) => {
    setLikedIds(pre => pre.filter(likedId => likedId !== id));
  };

  return (
    <S.Container>
      {PREFER_RESTAURANT_MOCK_DATA.map(data => (
        <PreferRestaurantItem
          key={data.id}
          id={data.id}
          name={data.name}
          category={data.category}
          distance={data.distance}
          likeCount={data.likeCount}
          liked={likedIds.some((likedid: number) => likedid === data.id)}
          onLike={handleLike}
          onCancel={handleCancel}
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
