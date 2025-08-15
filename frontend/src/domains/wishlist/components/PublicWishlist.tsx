import Carousel from '@components/Carousel';
import ErrorMessage from '@components/errors/ErrorMessage';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { WishlistType } from '@apis/wishlist';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { use } from 'react';
import { useNavigate } from 'react-router';

import useCreateWishPickeat from '../hooks/useCreateWishPickeat';

type Props = {
  wishlistPromise: Promise<WishlistType[]>;
};

const PublicWishlist = ({ wishlistPromise }: Props) => {
  // const wishlist = use(wishlistPromise);

  const navigate = useNavigate();
  const { createPickeat, errorMessage } = useCreateWishPickeat();
  const WISHLIST_MOCK_DATA = [
    { id: 1, name: '잠실', image: '/images/jamsil-wish-image.jpg' },
    { id: 2, name: '선릉', image: '/images/seolleung-wish-image.jpg' },
  ];

  const handleCreatePickeat = async (id: number) => {
    const code = await createPickeat(makePickeatName(), id);
    if (code) navigate(generateRouterPath.pickeatDetail(code));
  };

  return (
    <S.Container>
      <Carousel stepSize={220}>
        <S.WishlistWrapper>
          {WISHLIST_MOCK_DATA.map(item => (
            <S.Box
              key={item.id}
              onClick={() => handleCreatePickeat(item.id)}
              src={item.image}
              alt={item.name}
            />
          ))}
        </S.WishlistWrapper>
      </Carousel>
      <ErrorMessage message={errorMessage} />
    </S.Container>
  );
};

export default PublicWishlist;

const S = {
  Container: styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  WishlistWrapper: styled.div`
    width: max-content;
    height: 200px;

    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  Box: styled.img`
    flex-shrink: 0;
    cursor: pointer;
    object-fit: cover;
  `,
};
