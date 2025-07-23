import { apiClient } from '@apis/apiClient';
import { RestaurantsResponse } from '@apis/prefer';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

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

  const roomCode = '36f41043-01a3-401d-bdc6-e984b62722d3';

  const handleLike = useCallback(async (id: number) => {
    setRestaurantList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
      )
    );

    setTimeout(() => {
      setRestaurantList(prev =>
        [...prev].sort((a, b) => b.likeCount - a.likeCount)
      );
    }, 500);

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
  }, []);

  const handleUnlike = useCallback(async (id: number) => {
    setRestaurantList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likeCount: item.likeCount - 1 } : item
      )
    );

    setTimeout(() => {
      setRestaurantList(prev =>
        [...prev].sort((a, b) => b.likeCount - a.likeCount)
      );
    }, 500);

    try {
      await apiClient.patch(`restaurants/${id}/unlike`, undefined, {
        'Content-Type': 'application/json',
      });
      setLikedIds(prev => prev.filter(likedId => likedId !== id));
    } catch (error) {
      setLikedIds(prev => [...prev, id]);
      setRestaurantList(prev =>
        prev.map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
        )
      );
      console.log('좋아요 취소 실패:', error);
    }
  }, []);

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
