import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import ErrorMessage from '@components/errors/ErrorMessage';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { useCreateWishlist } from '@domains/wishlist/hooks/useCreateWishlist';

import { wishlist, WishlistType } from '@apis/wishlist';

import styled from '@emotion/styled';
import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import WishlistCard from './WishlistCard';

function WishlistGroupTab() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const [wishlistData, setWishlistData] = useState<WishlistType[]>([]);

  const getWishlistGroup = async () => {
    try {
      const response = await wishlist.getWishGroup(roomId);
      setWishlistData(response);
    } catch {
      alert('위시 리스트를 불러오던 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    getWishlistGroup();
  }, []);

  const wishCount = wishlistData.length;

  const {
    opened,
    mounted,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();

  const { name, handleName, error, createWishlist } = useCreateWishlist();

  const submitWishlist = async (e: FormEvent) => {
    e.preventDefault();
    createWishlist();
    handleUnmountModal();
    await getWishlistGroup();
  };
  return (
    <S.Container>
      <S.TitleArea>
        <S.Description>위시리스트({wishCount})</S.Description>
        <Button
          text="추가"
          size="sm"
          color="secondary"
          onClick={handleOpenModal}
        />
        <Modal
          mounted={mounted}
          opened={opened}
          onClose={handleCloseModal}
          onUnmount={handleUnmountModal}
          size="lg"
        >
          <S.ModalContent onSubmit={submitWishlist}>
            <S.ModalTitle>나만의 위시</S.ModalTitle>
            <Input
              value={name}
              onChange={e => handleName(e.target.value)}
              placeholder="위시 이름을 입력하세요."
            />
            <ErrorMessage message={error} />
            <Button text="등록" />
          </S.ModalContent>
        </Modal>
      </S.TitleArea>

      {wishlistData.length > 0 ? (
        wishlistData.map(wishlist => (
          <WishlistCard
            key={wishlist.id}
            wishlistData={wishlist}
            onRefetch={getWishlistGroup}
          />
        ))
      ) : (
        <S.EmptyDescription>위시리스트를 추가해보세요!</S.EmptyDescription>
      )}
    </S.Container>
  );
}

export default WishlistGroupTab;

const S = {
  Container: styled.div``,

  TitleArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Description: styled.span`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    font: ${({ theme }) => theme.FONTS.heading.small};
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
