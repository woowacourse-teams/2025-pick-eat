import Badge from '@components/labels/Badge';

import { Wishes } from '@apis/wishlist';

import styled from '@emotion/styled';

function Wish({
  id,
  name,
  pictures,
  category,
  roadAddressName,
}: Omit<Wishes, 'tags' | 'wishlistId'>) {
  return (
    <S.WishWrapper key={id}>
      <S.Image
        src={
          pictures.length === 0
            ? '/images/restaurant.png'
            : pictures[0].imageDownloadUrl
        }
        alt={name}
        onError={e => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/images/restaurant.png';
        }}
      />

      <S.Info>
        <Badge>{category}</Badge>
        <S.Name>{name}</S.Name>
        <S.Address>{roadAddressName}</S.Address>
      </S.Info>
    </S.WishWrapper>
  );
}
export default Wish;

const S = {
  WishWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  Image: styled.img`
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    object-fit: cover;
  `,

  Info: styled.div``,

  Name: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  Address: styled.p`
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
