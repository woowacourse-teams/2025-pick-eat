import { pickeat } from '@apis/pickeat';
import { Restaurant } from '@apis/restaurant';
import { restaurants } from '@apis/restaurants';

import { usePolling } from '@hooks/usePolling';

import { useShowToast } from '@provider/ToastProvider';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router';

const usePreferRestaurant = (
  initialData: Restaurant[],
  syncOptimisticLikes: (newLikedIds: number[]) => void
) => {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const showToast = useShowToast();

  const sortRestaurants = (restaurantList: Restaurant[]) => {
    return restaurantList.sort((a, b) => {
      if (b.likeCount !== a.likeCount) {
        return b.likeCount - a.likeCount;
      }

      return a.name.localeCompare(b.name, 'ko');
    });
  };

  const [restaurantList, setRestaurantList] = useState<Restaurant[]>(() =>
    sortRestaurants(initialData)
  );

  const updateSortedRestaurantList = (
    content: (prev: Restaurant[]) => Restaurant[]
  ) => {
    setRestaurantList(prev => sortRestaurants(content(prev)));
  };

  const updateLikeCount = (id: number, delta: 1 | -1) =>
    updateSortedRestaurantList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likeCount: item.likeCount + delta } : item
      )
    );

  const fetchRestaurantList = useCallback(async () => {
    return restaurants.get(pickeatCode, {
      isExcluded: 'false',
    });
  }, []);

  const handleUpdateRestaurantList = useCallback((data: Restaurant[]) => {
    if (data) {
      setRestaurantList(sortRestaurants(data));
      syncOptimisticLikes(
        data
          .filter((restaurant: Restaurant) => restaurant.isLiked)
          .map((restaurant: Restaurant) => restaurant.id)
      );
    }
  }, []);

  usePolling(fetchRestaurantList, {
    onData: handleUpdateRestaurantList,
    interval: 3000,
    immediate: false,
    enabled: true,
    errorHandler: (error: Error) => {
      showToast({
        mode: 'ERROR',
        message: '식당 리스트를 불러오는데 실패했습니다.' + error.message,
      });
    },
  });

  useEffect(() => {
    if (restaurantList.length > 0) return;
    const endPickeat = async () => {
      await pickeat.patchDeactive(pickeatCode);
    };
    endPickeat();
  }, [restaurantList]);

  return { restaurantList, updateLikeCount };
};

export default usePreferRestaurant;
