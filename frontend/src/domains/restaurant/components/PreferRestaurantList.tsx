import { apiClient } from '@apis/apiClient';
import { RestaurantsResponse } from '@apis/prefer';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import PreferRestaurantItem from './PreferRestaurantItem';

const roomCode = '36f41043-01a3-401d-bdc6-e984b62722d3';

function PreferRestaurantList() {
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const [restaurantList, setRestaurantList] = useState<RestaurantsResponse[]>(
    []
  );

  const handleLike = async (id: number) => {
    setRestaurantList(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
        )
        .sort((a, b) => b.likeCount - a.likeCount)
    );

    try {
      await apiClient.patch(`restaurants/${id}/like`, undefined, {
        'Content-Type': 'application/json',
      });
      setLikedIds(prev => [...prev, id]);
    } catch (error) {
      setLikedIds(prev => prev.filter(likedId => likedId !== id));
      setRestaurantList(prev =>
        prev.map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount - 1 } : item
        )
      );
      console.log('좋아요 실패:', error);
    }
  };

  const handleUnlike = async (id: number) => {
    setRestaurantList(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount - 1 } : item
        )
        .sort((a, b) => b.likeCount - a.likeCount)
    );

    try {
      await apiClient.patch(`restaurants/${id}/unlike `, undefined, {
        'Content-Type': 'application/json',
      });
      setLikedIds(pre => pre.filter(likedId => likedId !== id));
    } catch (error) {
      setLikedIds(prev => [...prev, id]);
      setRestaurantList(prev =>
        prev.map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
        )
      );
      console.log('좋아요 취소 실패:', error);
    }
  };

  useEffect(() => {
    let isUnmounted = false;

    const fetchRestaurantList = async () => {
      const response = await apiClient.get<RestaurantsResponse[]>(
        `rooms/${roomCode}/restaurants?isExcluded=false`
      );

      if (!isUnmounted && response) {
        response.sort((a, b) => b.likeCount - a.likeCount);
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
