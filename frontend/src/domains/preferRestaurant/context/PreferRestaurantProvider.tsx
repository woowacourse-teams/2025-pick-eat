import {
  includedRestaurants,
  Restaurant,
  like,
  unlike,
} from '@apis/restaurant';

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
  handleLike: (id: string) => void;
  handleUnlike: (id: string) => void;
  liked: (id: string) => boolean;
}

const PreferRestaurantContext =
  createContext<PreferRestaurantContextType | null>(null);

export const PreferRestaurantProvider = ({ children }: PropsWithChildren) => {
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('code') ?? '';

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

  const handleLike = async (id: string) => {
    updateSortedRestaurantList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
      )
    );

    try {
      like.patch(id);
      setLikedIds(prev => [...prev, id]);
    } catch (error) {
      setLikedIds(prev => prev.filter(likedId => likedId !== id));
      updateSortedRestaurantList(prev =>
        prev.map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount - 1 } : item
        )
      );

      console.log('좋아요 실패:', error);
    }
  };

  const handleUnlike = async (id: string) => {
    updateSortedRestaurantList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likeCount: item.likeCount - 1 } : item
      )
    );
    try {
      unlike.patch(id);
      setLikedIds(prev => prev.filter(likedId => likedId !== id));
    } catch (error) {
      setLikedIds(prev => [...prev, id]);
      updateSortedRestaurantList(prev =>
        prev.map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
        )
      );

      updateSortedRestaurantList(prev =>
        prev.map(item =>
          item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
        )
      );
      console.error('좋아요 취소 실패:', error);
    }
  };

  const liked = (id: string) => {
    return likedIds.some((likedId: string) => likedId === id);
  };

  useEffect(() => {
    let isUnmounted = false;

    const fetchRestaurantList = async () => {
      const response = await includedRestaurants.get(roomCode);
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
