import Button from '@components/actions/Button';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { wish } from '@apis/wish';
import { Wishes, wishlist } from '@apis/wishlist';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import WishAddressFrom from './WishAddressForm';
import WishCard from './WishCard';

function WishlistTab() {
  const [searchParams] = useSearchParams();
  const wishId = Number(searchParams.get('wishId')) ?? '';

  const [wishlistData, setWishlistData] = useState<Wishes[]>([]);
  const {
    opened,
    mounted,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();

  const getWishlist = async () => {
    try {
      const response = await wishlist.get(wishId);
      setWishlistData(response);
    } catch {
      alert('찜 목록을 불러오던 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleCreateWish = () => {
    getWishlist();
    handleUnmountModal();
  };

  const handleDeleteWish = async (wishId: number) => {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (isDelete) {
      try {
        await wish.delete(wishId);
        getWishlist();
      } catch {
        alert('삭제 실패!');
      }
    }
  };

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
          <S.EmptyDescription>찜을 추가해보세요!</S.EmptyDescription>
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
  `,

  EmptyDescription: styled.span`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 20px;

    color: ${({ theme }) => theme.PALETTE.gray[30]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
    text-align: center;
  `,

  ModalContent: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  ModalTitle: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
};
