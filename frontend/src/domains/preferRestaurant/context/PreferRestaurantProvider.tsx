import { apiClient } from '@apis/apiClient';
import { RestaurantsResponse } from '@apis/prefer';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router';

interface PreferRestaurantContextType {
  restaurantList: RestaurantsResponse[];
  handleLike: (id: number) => void;
  handleUnlike: (id: number) => void;
  liked: (id: number) => boolean;
}

const PreferRestaurantContext =
  createContext<PreferRestaurantContextType | null>(null);

export const PreferRestaurantProvider = ({ children }: PropsWithChildren) => {
  const [restaurantList, setRestaurantList] = useState<RestaurantsResponse[]>(
    []
  );
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('code') ?? '';

  const updateSortedRestaurantList = (
    restaurantList: RestaurantsResponse[]
  ) => {
    setRestaurantList(sortByLike(restaurantList));
  };

  const sortByLike = (restaurantList: RestaurantsResponse[]) => {
    return restaurantList.sort((a, b) => {
      if (b.likeCount !== a.likeCount) {
        return b.likeCount - a.likeCount;
      }

      return a.name.localeCompare(b.name, 'ko');
    });
  };

  const handleLike = async (id: number) => {
    updateSortedRestaurantList(
      restaurantList.map(item =>
        item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
      )
    );

    try {
      await apiClient.patch(`restaurants/${id}/like`, undefined, {});
      setLikedIds(prev => [...prev, id]);
    } catch (error) {
      setLikedIds(prev => prev.filter(likedId => likedId !== id));
      updateSortedRestaurantList(
        restaurantList.map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount - 1 } : item
        )
      );

      console.log('좋아요 실패:', error);
    }
  };

  const handleUnlike = async (id: number) => {
    updateSortedRestaurantList(
      restaurantList.map(item =>
        item.id === id ? { ...item, likeCount: item.likeCount - 1 } : item
      )
    );

    try {
      await apiClient.patch(`restaurants/${id}/unlike`, undefined, {});
      setLikedIds(prev => prev.filter(likedId => likedId !== id));
    } catch (error) {
      setLikedIds(prev => [...prev, id]);
      updateSortedRestaurantList(
        restaurantList.map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
        )
      );

      updateSortedRestaurantList(
        restaurantList.map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
        )
      );

      console.log('좋아요 취소 실패:', error);
    }
  };

  const liked = (id: number) => {
    return likedIds.some((likedId: number) => likedId === id);
  };

  useEffect(() => {
    let isUnmounted = false;

    const fetchRestaurantList = async () => {
      const response = await apiClient.get<RestaurantsResponse[]>(
        `rooms/${roomCode}/restaurants?isExcluded=false`
      );

      if (!isUnmounted && response) {
        updateSortedRestaurantList(response);
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
    <PreferRestaurantContext.Provider
      value={{
        restaurantList,
        handleLike,
        handleUnlike,
        liked,
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
