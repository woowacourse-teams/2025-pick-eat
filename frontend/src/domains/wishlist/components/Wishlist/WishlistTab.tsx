import Button from '@components/actions/Button';
import Badge from '@components/labels/Badge';

import { Wishes } from '@apis/wishlist';

import styled from '@emotion/styled';

type Props = {
  wishlist: Wishes[];
  onClick: (index: number) => void;
  isPublic: boolean;
};

function WishlistTab({ wishlist, onClick, isPublic }: Props) {
  return (
    <>
      {isPublic || <Button text="새 위시 등록" onClick={() => onClick(1)} />}
      {wishlist && wishlist.length > 0 ? (
        wishlist.map(({ id, name, pictures, category, roadAddressName }) => (
          <S.Container key={id}>
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
          </S.Container>
        ))
      ) : (
        <S.Description>위시를 등록해보세요!</S.Description>
      )}
    </>
  );
}

export default WishlistTab;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  Image: styled.img`
    width: 90px;
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

  Description: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    text-align: center;
  `,
};
