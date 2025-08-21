import { Restaurant } from '@apis/restaurant';

import { useState } from 'react';

export const useOptimisticLike = (initialData: Restaurant[]) => {
  const getInitialLikedIds = () =>
    initialData
      .filter(restaurant => restaurant.isLiked)
      .map(restaurant => restaurant.id);

  const [optimisticLikedIds, setOptimisticLikedIds] =
    useState<number[]>(getInitialLikedIds);

  const isOptimisticLike = (id: number) =>
    optimisticLikedIds.some(
      (optimisticLikedId: number) => optimisticLikedId === id
    );

  const syncOptimisticLikes = (newLikedIds: number[]) => {
    setOptimisticLikedIds(newLikedIds);
  };

  const addOptimisticLike = (id: number) =>
    setOptimisticLikedIds(prev => (prev.includes(id) ? prev : [...prev, id]));

  const removeOptimisticLike = (id: number) =>
    setOptimisticLikedIds(prev => prev.filter(x => x !== id));

  return {
    isOptimisticLike,
    syncOptimisticLikes,
    addOptimisticLike,
    removeOptimisticLike,
  };
};
