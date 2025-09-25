import Button from '@components/actions/Button';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { useManageWishlist } from '@domains/room/hooks/useManageWishlist';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

import WishAddressFrom from './WishAddressForm';
import WishCard from './WishCard';

function WishlistTab() {
  const [searchParams] = useSearchParams();
  const wishId = Number(searchParams.get('wishId')) ?? '';
  const { error, wishlistData, handleGetWish, handleDeleteWish } =
    useManageWishlist(wishId);

  const handleCreateWish = () => {
    handleGetWish();
    handleUnmountModal();
  };
  const {
    opened,
    mounted,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();
  if (error) throw new Error();
  return (
    <S.Container>
      <S.Description>찜({wishlistData.length})</S.Description>

      <S.Wishlist>
        {wishlistData.length > 0 ? (
          wishlistData.map(wish => (
            <WishCard
              key={wish.id}
              wishData={wish}
              onDelete={() => handleDeleteWish(wish.id)}
            />
          ))
        ) : (
          <S.EmptyDescriptionPointText>
            찜을 추가해보세요!
          </S.EmptyDescriptionPointText>
        )}
      </S.Wishlist>

      <Button text="찜 등록" color="secondary" onClick={handleOpenModal} />

      <Modal
        mounted={mounted}
        opened={opened}
        onClose={handleCloseModal}
        onUnmount={handleUnmountModal}
        size="lg"
      >
        <WishAddressFrom wishlistId={wishId} onCreate={handleCreateWish} />
      </Modal>
    </S.Container>
  );
}

export default WishlistTab;

const S = {
  Container: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  Description: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  Wishlist: styled.div`
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    overflow: scroll;
    scrollbar-width: none;
  `,
  EmptyDescriptionPointText: styled.span`
    width: 100%;

    margin-top: 20px;

    color: ${({ theme }) => theme.PALETTE.gray[30]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
    text-align: center;
  `,
};
