import { Restaurant } from '@apis/restaurant';
import { restaurants } from '@apis/restaurants';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';

const usePreferRestaurant = (
  initialData: Restaurant[],
  syncVisibleLikes: (newLikedIds: number[]) => void
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
        syncVisibleLikes(
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

  return { restaurantList, updateLikeCount };
};

export default usePreferRestaurant;
