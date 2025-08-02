import { Restaurant } from '@apis/restaurant';
import { restaurants } from '@apis/restaurants';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';

const usePreferRestaurant = (initialData: Restaurant[]) => {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const sortByLike = (restaurantList: Restaurant[]) => {
    return restaurantList.sort((a, b) => {
      if (b.likeCount !== a.likeCount) {
        return b.likeCount - a.likeCount;
      }

      return a.name.localeCompare(b.name, 'ko');
    });
  };

  const [restaurantList, setRestaurantList] = useState<Restaurant[]>(
    sortByLike(initialData)
  );

  const updateSortedRestaurantList = (
    content: (prev: Restaurant[]) => Restaurant[]
  ) => {
    setRestaurantList(prev => sortByLike(content(prev)));
  };

  useEffect(() => {
    let isUnmounted = false;

    const fetchRestaurantList = async () => {
      const response = await restaurants.get(pickeatCode, {
        isExcluded: 'false',
      });
      if (!isUnmounted && response) {
        setRestaurantList(sortByLike(response));
      }
    };

    fetchRestaurantList();

    const intervalId = setInterval(fetchRestaurantList, 3000);

    return () => {
      isUnmounted = true;
      clearInterval(intervalId);
    };
  }, []);

  return { restaurantList, updateSortedRestaurantList };
};

export default usePreferRestaurant;
