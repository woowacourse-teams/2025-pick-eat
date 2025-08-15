import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import ErrorMessage from '@components/errors/ErrorMessage';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { wishlist, WishlistType } from '@apis/wishlist';

import styled from '@emotion/styled';
import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { useCreateWishlist } from '../hooks/useCreateWishlist';

import WishlistCard from './WishlistCard';

function WishlistGroupTab() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const [wishlistData, setWishlistData] = useState<WishlistType[]>();

  const getWishlist = async () => {
    // todo: try-catch
    const response = await wishlist.getWishGroup(roomId);
    setWishlistData(response);
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const wishCount = wishlistData?.length;

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
    await getWishlist();
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

      {wishlistData?.map(wishlist => (
        <WishlistCard
          key={wishlist.id}
          wishlistData={wishlist}
          onRefetch={getWishlist}
        />
      ))}
    </S.Container>
  );
}

export default WishlistGroupTab;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,

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

  ModalContent: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  ModalTitle: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
};
