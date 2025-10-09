import Chip from '@components/labels/Chip';

import { Wishes } from '@apis/wishlist';

import styled from '@emotion/styled';

function Wish({
  id,
  name,
  pictures,
  category,
  roadAddressName,
  tags,
}: Omit<Wishes, 'wishlistId'>) {
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
        <S.ChipWrapper>
          <Chip color="primary">{category}</Chip>
          {tags.map(tag =>
            tag.length === 0 ? null : <Chip key={tag}>{tag}</Chip>
          )}
        </S.ChipWrapper>
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

  ChipWrapper: styled.div`
    max-height: 54px;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level2};
    overflow: hidden;
  `,

  Name: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  Address: styled.p`
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
