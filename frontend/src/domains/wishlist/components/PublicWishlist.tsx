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
  const wishlist = use(wishlistPromise);
  const navigate = useNavigate();
  const { createPickeat, errorMessage } = useCreateWishPickeat();

  const handleCreatePickeat = async (id: number) => {
    const code = await createPickeat(makePickeatName(), id);
    if (code) navigate(generateRouterPath.pickeatDetail(code));
  };

  return (
    <>
      <Carousel stepSize={220}>
        <S.Container>
          {wishlist.map(item => (
            <S.Box key={item.id} onClick={() => handleCreatePickeat(item.id)}>
              {item.name}
            </S.Box>
          ))}
        </S.Container>
      </Carousel>
      <ErrorMessage message={errorMessage} />
    </>
  );
};

export default PublicWishlist;

const S = {
  Container: styled.div`
    width: max-content;
    height: 200px;

    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  Box: styled.div`
    width: 200px;
    height: 100%;
    flex-shrink: 0;

    background-color: white;
    border-radius: ${({ theme }) => theme.RADIUS.medium3};
    cursor: pointer;
  `,
};
