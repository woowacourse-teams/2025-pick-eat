import { pickeat } from '@apis/pickeat';
import { Restaurant } from '@apis/restaurant';
import { restaurants } from '@apis/restaurants';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';

const usePreferRestaurant = (
  initialData: Restaurant[],
  syncOptimisticLikes: (newLikedIds: number[]) => void
) => {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

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

  useEffect(() => {
    let isUnmounted = false;

    const fetchRestaurantList = async () => {
      const response = await restaurants.get(pickeatCode, {
        isExcluded: 'false',
      });
      if (!isUnmounted && response) {
        setRestaurantList(sortRestaurants(response));
        syncOptimisticLikes(
          response
            .filter((restaurant: Restaurant) => restaurant.isLiked)
            .map((restaurant: Restaurant) => restaurant.id)
        );
      }
    };

    fetchRestaurantList();

    const intervalId = setInterval(fetchRestaurantList, 3000);

    return () => {
      isUnmounted = true;
      clearInterval(intervalId);
    };
  }, []);

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
