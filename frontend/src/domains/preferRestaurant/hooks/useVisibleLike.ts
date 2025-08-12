import { Restaurant } from '@apis/restaurant';

import { useState } from 'react';

export const useVisibleLike = (initialData: Restaurant[]) => {
  const getInitialLikedIds = () =>
    initialData
      .filter(restaurant => restaurant.isLiked)
      .map(restaurant => restaurant.id);

  const [visibleLikedIds, setVisibleLikedIds] =
    useState<number[]>(getInitialLikedIds);

  const isVisibleLike = (id: number) =>
    visibleLikedIds.some((visibleLikedId: number) => visibleLikedId === id);

  const syncVisibleLikes = (newLikedIds: number[]) => {
    setVisibleLikedIds(newLikedIds);
  };

  const addVisibleLike = (id: number) =>
    setVisibleLikedIds(prev => (prev.includes(id) ? prev : [...prev, id]));

  const removeVisibleLike = (id: number) =>
    setVisibleLikedIds(prev => prev.filter(x => x !== id));

  return { isVisibleLike, syncVisibleLikes, addVisibleLike, removeVisibleLike };
};
