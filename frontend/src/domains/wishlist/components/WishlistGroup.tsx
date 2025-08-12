import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { WishlistType, wishlist } from '@apis/wishlist';

import styled from '@emotion/styled';
import { use, useState } from 'react';
import { useSearchParams } from 'react-router';

import Wishlist from './Wishlist';

type Props = {
  wishlistPromise: Promise<WishlistType[]>;
};

function WishlistGroup({ wishlistPromise }: Props) {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';
  const data = use(wishlistPromise);
  const wishCount = data.length;
  const [name, setName] = useState('');

  const registerWishList = () => {
    // TODO: try-catch
    wishlist.post(roomId, name);
  };

  const {
    opened,
    mounted,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();
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
          <S.ModalContent>
            <S.ModalTitle>나만의 위시</S.ModalTitle>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="위시 이름을 입력하세요."
            />
            <Button text="등록" onClick={registerWishList} />
          </S.ModalContent>
        </Modal>
      </S.TitleArea>

      {data.map(wishlist => (
        <Wishlist key={wishlist.id} wishlist={wishlist} />
      ))}
    </S.Container>
  );
}

export default WishlistGroup;

const S = {
  Container: styled.div`
    width: 100%;
    border-radius: ${({ theme }) => theme.RADIUS.large};
    display: flex;
    flex-direction: column;
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

  ModalContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  ModalTitle: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
};
