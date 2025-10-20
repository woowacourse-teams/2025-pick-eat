import { pickeatQuery } from '@apis/pickeat';
import { Restaurant } from '@apis/restaurant';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const usePreferRestaurant = (
  restaurantsData: Restaurant[],
  syncOptimisticLikes: (newLikedIds: number[]) => void
) => {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const { mutate: deactivatePickeat } = pickeatQuery.usePatchDeactive();

  const sortRestaurants = (restaurantList: Restaurant[]) => {
    return restaurantList.sort((a, b) => {
      if (b.likeCount !== a.likeCount) {
        return b.likeCount - a.likeCount;
      }

      return a.name.localeCompare(b.name, 'ko');
    });
  };

  const [restaurantList, setRestaurantList] = useState<Restaurant[]>(() =>
    sortRestaurants(restaurantsData)
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

  useEffect(() => {
    handleUpdateRestaurantList(restaurantsData);
  }, [restaurantsData]);

  useEffect(() => {
    if (restaurantList.length > 0) return;
    const endPickeat = async () => {
      deactivatePickeat(pickeatCode);
    };
    endPickeat();
  }, [restaurantList]);

  return { restaurantList, updateLikeCount };
};

export default usePreferRestaurant;
