import Card from '@domains/wishlist/components/Card';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { pickeat } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

type WishContent = {
  id: number;
  name: string;
  imageUrl: string;
  errorMessage?: string;
};

const WISH_CONTENT: WishContent[] = [
  {
    id: 1,
    name: '잠실역',
    imageUrl: '/images/carousel/subway_thumbnail.png',
  },
  {
    id: 2,
    name: '선릉역',
    imageUrl: '/images/carousel/subway_thumbnail.png',
  },
  {
    id: 3,
    name: '내 위치에서',
    imageUrl: '/images/carousel/map_thumbnail.png',
  },
];

export function useWishCarousel() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';
  const navigate = useNavigate();
  const showToast = useShowToast();

  const handleWishCardClick = async (id: number, extraErrorMessage: string) => {
    try {
      const code = await pickeat.post(roomId, makePickeatName());
      await pickeat.postWish(id, code);
      if (code) navigate(generateRouterPath.pickeatDetail(code));
    } catch (e) {
      if (e instanceof Error)
        showToast({
          mode: 'ERROR',
          message: '투표 생성을 실패했습니다. 다시 시도해 주세요.',
        });
      if (extraErrorMessage)
        setTimeout(
          () => showToast({ mode: 'WARN', message: extraErrorMessage }),
          700
        );
    }
  };

  const getWishCardContent = useCallback((wishContent?: WishContent[]) => {
    const cardContent = [...(wishContent ?? []), ...WISH_CONTENT];
    return cardContent.map(item => (
      <Card
        key={item.id}
        title={item.name}
        imageUrl={item.imageUrl}
        onClick={() => handleWishCardClick(item.id, item.errorMessage ?? '')}
      />
    ));
  }, []);

  return { getWishCardContent };
}
