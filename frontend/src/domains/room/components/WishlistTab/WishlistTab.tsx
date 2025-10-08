import Plus from '@components/assets/icons/Plus';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { useManageWishlist } from '@domains/room/hooks/useManageWishlist';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

import RestaurantCard from './RestaurantCard';
import WishAddressFrom from './WishAddressForm';

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
      <S.RegisterWrapper onClick={handleOpenModal}>
        <Plus size="xlg" color={THEME.PALETTE.gray[30]} />
        <S.Description>식당을 추가해 보세요!</S.Description>
      </S.RegisterWrapper>

      <S.Wishlist>
        {wishlistData.length > 0 ? (
          wishlistData.map(wish => (
            <RestaurantCard
              key={wish.id}
              restaurantData={wish}
              onDelete={() => handleDeleteWish(wish.id)}
            />
          ))
        ) : (
          <S.EmptyDescriptionPointText>
            찜을 추가해보세요!
          </S.EmptyDescriptionPointText>
        )}
      </S.Wishlist>

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
    gap: ${({ theme }) => theme.GAP.level5};
  `,
  RegisterWrapper: styled.div`
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 20px 20px 0;

    border: 2px dashed ${({ theme }) => theme.PALETTE.gray[30]};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    border-radius: 20px;
    cursor: pointer;
  `,
  Description: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
  Wishlist: styled.div`
    height: 90%;
    display: grid;
    align-content: start;

    gap: ${({ theme }) => theme.GAP.level4};
    grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
    overflow: scroll;

    padding: 20px;

    justify-items: center;

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
