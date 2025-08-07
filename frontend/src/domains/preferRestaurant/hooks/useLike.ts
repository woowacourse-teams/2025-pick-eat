import { Restaurant } from '@apis/restaurant';
import { restaurant } from '@apis/restaurant';

const useLike = (
  updateSortedRestaurantList: (
    content: (prev: Restaurant[]) => Restaurant[]
  ) => void,
  likedIds: string[],
  setLikedIds: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const isLiked = (id: string) =>
    likedIds.some((likedId: string) => likedId === id);

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

  return { isLiked, handleLike, handleUnlike, setLikedIds };
};

export default useLike;
