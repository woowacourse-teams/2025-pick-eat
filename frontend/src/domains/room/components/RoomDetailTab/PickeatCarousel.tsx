import { useWishCarousel } from '@widgets/wishCarousel/hooks/useWishCarousel';

import Carousel from '@components/Carousel';

import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import ContentTitle from './components/ContentTitle';

function PickeatCarousel() {
  const [searchParams] = useSearchParams();
  const wishlistId = Number(searchParams.get('wishId')) ?? '';

  const wishCardContents = useMemo(() => {
    return [
      {
        id: wishlistId,
        name: '즐겨찾기에서',
        imageUrl: '/images/carousel/room_favorite_thumbnail.png',
        errorMessage: '식당 즐겨찾기에 식당이 존재하는지 확인해 주세요.',
        isTemplate: false,
      },
    ];
  }, []);

  const { getWishCardContent } = useWishCarousel();

  const pickeatContents = useMemo(
    () => getWishCardContent(wishCardContents),
    []
  );

  return (
    <>
      <ContentTitle
        title="투표 시작하기"
        description="방 멤버와 함께 투표를 시작해보세요!"
      />
      <Carousel contentArr={pickeatContents} />
    </>
  );
}

export default PickeatCarousel;
