import Button from '@components/actions/Button';
import Trash from '@components/assets/icons/Trash';
import Badge from '@components/labels/Badge';

import { wish } from '@apis/wish';
import { Wishes } from '@apis/wishlist';

import styled from '@emotion/styled';

type Props = {
  wishlist: Wishes[];
  onTabChange: (index: number) => void;
  onRefetch: () => void;
};

function WishlistTab({ wishlist, onTabChange, onRefetch }: Props) {
  const deleteWish = async (wishId: number) => {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (isDelete) {
      try {
        await wish.delete(wishId);
        onRefetch();
      } catch {
        alert('삭제 실패!');
      }
    }
  };

  return (
    <>
      <Button
        text="새 위시 등록"
        onClick={() => onTabChange(1)}
        style={{ position: 'sticky', top: 0 }}
      />
      {wishlist.length > 0 ? (
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
              <S.TopArea>
                <Badge>{category}</Badge>

                <S.RemoveBtn type="button" onClick={() => deleteWish(id)}>
                  <Trash size="xs" color="red" />
                </S.RemoveBtn>
              </S.TopArea>
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
    height: 90px;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    object-fit: cover;
    flex-shrink: 0;
  `,

  Info: styled.div`
    flex: 1;
  `,

  TopArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-right: ${({ theme }) => theme.PADDING.px2};
  `,

  RemoveBtn: styled.button``,

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
