import Cross from '@components/assets/icons/Cross';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useModal } from '@components/modal/useModal';
import RestaurantCard from '@components/RestaurantCard';

import { Wish, wishQuery } from '@apis/wish';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

type Props = {
  restaurantData: Wish;
};

function WishRestaurantCard({ restaurantData }: Props) {
  const { opened, mounted, handleUnmountModal, handleOpenModal } = useModal();
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const { mutate } = wishQuery.useDelete(roomId);

  const handleConfirmDelete = () => {
    handleUnmountModal();
    mutate(restaurantData.id);
  };

  return (
    <S.Container>
      <RestaurantCard restaurantData={restaurantData} />

      <S.Xicon onClick={handleOpenModal}>
        <Cross size="xs" color="white" strokeWidth={4} />
      </S.Xicon>

      <ConfirmModal
        opened={opened}
        mounted={mounted}
        message="정말 삭제하시겠습니까?"
        onConfirm={handleConfirmDelete}
        onCancel={handleUnmountModal}
      />
    </S.Container>
  );
}

export default WishRestaurantCard;

const S = {
  Container: styled.div`
    position: relative;
  `,
  Xicon: styled.button`
    width: 28px;
    height: 28px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -10px;
    right: -10px;

    background-color: #f95f5f;
    border-radius: ${({ theme }) => theme.RADIUS.half};
  `,
};
