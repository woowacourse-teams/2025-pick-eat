import { restaurant, Restaurant } from '@apis/restaurant';

import { createContext, PropsWithChildren, useState, useContext } from 'react';

interface LikeContextType {
  handleLike: (id: string) => void;
  handleUnlike: (id: string) => void;
  isLiked: (id: string) => boolean;
}

const LikeContext = createContext<LikeContextType | null>(null);

type Props = PropsWithChildren<{
  updateSortedRestaurantList: (
    content: (prev: Restaurant[]) => Restaurant[]
  ) => void;
}>;

export const LikeProvider = ({
  children,
  updateSortedRestaurantList,
}: Props) => {
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const isLiked = (id: string) => {
    return likedIds.some((likedId: string) => likedId === id);
  };

  const handleLike = async (id: string) => {
    updateSortedRestaurantList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likeCount: item.likeCount + 1 } : item
      )
    );

    try {
      restaurant.patchLike(id);
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
      restaurant.patchUnlike(id);
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

  return (
    <LikeContext.Provider
      value={{
        handleLike,
        handleUnlike,
        isLiked,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLikeContext는 LikeProvider 안에서 사용해야 합니다.');
  }
  return context;
};
