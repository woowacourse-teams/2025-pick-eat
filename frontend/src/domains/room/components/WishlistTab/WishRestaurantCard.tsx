import Cross from '@components/assets/icons/Cross';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useModal } from '@components/modal/useModal';
import RestaurantCard from '@components/RestaurantCard';

import { Wishes } from '@apis/wishlist';

import styled from '@emotion/styled';

type Props = {
  restaurantData: Wishes;
  onDelete: () => void;
};

function WishRestaurantCard({ restaurantData, onDelete }: Props) {
  const { opened, mounted, handleUnmountModal, handleOpenModal } = useModal();

  const handleConfirmDelete = () => {
    handleUnmountModal();
    onDelete();
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
