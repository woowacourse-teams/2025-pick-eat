import Button from '@components/actions/Button';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { WishlistType } from '@apis/wishlist';

import styled from '@emotion/styled';

import Wishlist from './Wishlist';

type Prop = {
  wishlistData: WishlistType;
  selected: boolean;
  onSelect: (id: number) => void;
};

function WishlistCard({ wishlistData, selected, onSelect }: Prop) {
  const { id, name, isPublic, wishCount } = wishlistData;
  const {
    mounted,
    opened,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();

  return (
    <S.Container selected={selected} onClick={() => onSelect(id)}>
      <S.LeftWrapper>
        <S.Name>{name}</S.Name>
        <S.WishCount>({wishCount})</S.WishCount>
      </S.LeftWrapper>
      <Button
        text="상세"
        color={selected ? 'primary' : 'gray'}
        size="sm"
        type="button"
        onClick={handleOpenModal}
      />

      <Modal
        opened={opened}
        mounted={mounted}
        onUnmount={handleUnmountModal}
        onClose={handleCloseModal}
      >
        <Wishlist wishlistId={id} wishlistName={name} isPublic={isPublic} />
      </Modal>
    </S.Container>
  );
}

export default WishlistCard;

const S = {
  Container: styled.div<{ selected: boolean }>`
    height: 90px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p7};

    background-color: ${({ selected, theme }) =>
      selected && theme.PALETTE.secondary[10]};

    ${({ selected, theme }) =>
      !selected &&
      `cursor: pointer;

       &:hover {
         background-color: ${theme.PALETTE.secondary[5]};
        }
    `};

    border-bottom: solid 1px ${({ theme }) => theme.PALETTE.gray[20]};
  `,
  LeftWrapper: styled.div`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.small};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};
  `,

  Name: styled.span``,

  WishCount: styled.span`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
