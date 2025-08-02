import { Restaurant } from '@apis/restaurant';
import { restaurants } from '@apis/restaurants';

import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
} from 'react';
import { useSearchParams } from 'react-router';

interface PreferRestaurantContextType {
  restaurantList: Restaurant[];
  updateSortedRestaurantList: (
    content: (prev: Restaurant[]) => Restaurant[]
  ) => void;
}

const PreferRestaurantContext =
  createContext<PreferRestaurantContextType | null>(null);

export const PreferRestaurantProvider = ({ children }: PropsWithChildren) => {
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);

  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const updateSortedRestaurantList = (
    content: (prev: Restaurant[]) => Restaurant[]
  ) => {
    setRestaurantList(prev => sortByLike(content(prev)));
  };

  const sortByLike = (restaurantList: Restaurant[]) => {
    return restaurantList.sort((a, b) => {
      if (b.likeCount !== a.likeCount) {
        return b.likeCount - a.likeCount;
      }

      return a.name.localeCompare(b.name, 'ko');
    });
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

  return (
    <PreferRestaurantContext.Provider
      value={{
        restaurantList,
        updateSortedRestaurantList,
      }}
    >
      {children}
    </PreferRestaurantContext.Provider>
  );
};

export const usePreferRestaurantContext = () => {
  const context = useContext(PreferRestaurantContext);
  if (!context) {
    throw new Error(
      'usePreferRestaurantContext는 PreferRestaurantProvider 안에서 사용해야 합니다.'
    );
  }
  return context;
};
