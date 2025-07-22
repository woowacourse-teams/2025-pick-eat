import { apiClient } from '@apis/apiClient';
import { RestaurantsResponse } from '@apis/prefer';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import PreferRestaurantItem from './PreferRestaurantItem';

const roomCode = '42be1480-b8d7-4c3b-8c04-d66c2ed4b6e6';

function PreferRestaurantList() {
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const [restaurantList, setRestaurantList] = useState<RestaurantsResponse[]>(
    []
  );

  const handleLike = async (id: number) => {
    await apiClient.patch(`restaurants/${id}/like`, undefined, {
      'Content-Type': 'application/json',
    });

    setLikedIds(pre => [...pre, id]);
  };

  const handleUnlike = async (id: number) => {
    await apiClient.patch(`restaurants/${id}/unlike `, undefined, {
      'Content-Type': 'application/json',
    });
    setLikedIds(pre => pre.filter(likedId => likedId !== id));
  };

  useEffect(() => {
    let isUnmounted = false;

    const fetchRestaurantList = async () => {
      const response = await apiClient.get<RestaurantsResponse[]>(
        `rooms/${roomCode}/restaurants?isExcluded=false`
      );

      if (!isUnmounted && response) {
        setRestaurantList(response);
      }
    };

    fetchRestaurantList();

    const intervalId = setInterval(fetchRestaurantList, 10000);

    return () => {
      isUnmounted = true;
      clearInterval(intervalId);
    };
  }, []);

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
          liked={likedIds.some((likedid: number) => likedid === data.id)}
          onLike={handleLike}
          onUnlike={handleUnlike}
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
