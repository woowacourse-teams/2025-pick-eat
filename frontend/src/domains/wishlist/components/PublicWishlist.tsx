import Carousel from '@components/Carousel';
import ErrorMessage from '@components/errors/ErrorMessage';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

import useCreateWishPickeat from '../hooks/useCreateWishPickeat';

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
  const { createPickeat, errorMessage } = useCreateWishPickeat();

  const handlePublicWishlistClick = async (id: number) => {
    const code = await createPickeat(makePickeatName(), id);
    if (code) navigate(generateRouterPath.pickeatDetail(code));
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
      <ErrorMessage message={errorMessage} />
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
