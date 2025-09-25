import { useLruCachedFetch } from 'store/useLruCachedFetch';

import { Wishes, wishlist } from '@apis/wishlist';

import styled from '@emotion/styled';

import Wish from './Wish';

type Props = {
  wishlistId: number;
  wishlistName: string;
  isPublic: boolean;
};

function Wishlist({ wishlistId, wishlistName }: Props) {
  const { data: wishes } = useLruCachedFetch<Wishes[]>(
    `wishlist-${wishlistId}`,
    async () => await wishlist.get(wishlistId)
  );
  if (!wishes) return;

  return (
    <S.Container>
      <S.Title>{wishlistName}</S.Title>

      {wishes.length > 0 ? (
        wishes.map(
          ({ id, name, pictures, category, roadAddressName, tags }) => (
            <Wish
              key={id}
              id={id}
              name={name}
              pictures={pictures}
              category={category}
              roadAddressName={roadAddressName}
              tags={tags}
            />
          )
        )
      ) : (
        <div>찜 목록이 존재하지 않습니다.</div>
      )}
    </S.Container>
  );
}

export default Wishlist;

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
};
