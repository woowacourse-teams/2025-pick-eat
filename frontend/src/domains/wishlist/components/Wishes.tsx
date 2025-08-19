import Badge from '@components/labels/Badge';

import { Wishes, wishlist } from '@apis/wishlist';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

type Props = {
  wishlistId: number;
  wishlistName: string;
  isPublic: boolean;
};

function Wishes({ wishlistId, wishlistName, isPublic }: Props) {
  const [wishes, setWishes] = useState<Wishes[]>([]);

  useEffect(() => {
    const fetchWishes = async () => {
      const response = await wishlist.get(wishlistId, isPublic);
      setWishes(response);
    };
    fetchWishes();
  }, []);

  return (
    <S.Container>
      <S.Title>{wishlistName}</S.Title>

      {wishes.length > 0 ? (
        wishes.map(({ id, name, pictures, category, roadAddressName }) => (
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
        ))
      ) : (
        <div>위시가 존재하지 않습니다.</div>
      )}
    </S.Container>
  );
}

export default Wishes;

const S = {
  Container: styled.div`
    height: 450px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    overflow: scroll;
  `,

  Title: styled.span`
    top: 20px;

    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  Image: styled.img`
    width: 90px;
    height: 90px;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    object-fit: cover;
  `,

  Info: styled.div``,

  WishWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  Name: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  Address: styled.p`
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
