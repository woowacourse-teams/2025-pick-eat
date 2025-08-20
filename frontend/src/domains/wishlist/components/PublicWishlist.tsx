import Carousel from '@components/Carousel';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { pickeat } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

const WISHLIST_MOCK_DATA = [
  {
    id: 1,
    name: '잠실',
    image:
      'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/template_images/jamsil_restaurant.png',
  },
  {
    id: 2,
    name: '선릉',
    image:
      'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/template_images/seonreung_restaurant.png',
  },
];

const PublicWishlist = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') ?? '';

  const handlePublicWishlistClick = async (id: number) => {
    try {
      const code = await pickeat.post(roomId, makePickeatName());
      await pickeat.postWish(id, code);
      if (code) navigate(generateRouterPath.pickeatDetail(code));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <S.Container>
      <Carousel
        contentArr={WISHLIST_MOCK_DATA.map(item => (
          <S.ThumbnailImg
            key={item.id}
            onClick={() => handlePublicWishlistClick(item.id)}
            imgUrl={item.image}
          />
        ))}
      />
    </S.Container>
  );
};

export default PublicWishlist;

const S = {
  Container: styled.div`
    width: 100%;

    padding: ${({ theme }) => theme.PADDING.p5} 0;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  ThumbnailImg: styled.div<{ imgUrl: string }>`
    width: 190px;
    height: 190px;

    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: cover;
    border-radius: ${({ theme }) => theme.RADIUS.medium2};
    cursor: pointer;
  `,
};
