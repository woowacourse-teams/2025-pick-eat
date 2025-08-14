import Button from '@components/actions/Button';
import Trash from '@components/assets/icons/Trash';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { wishlist, WishlistType } from '@apis/wishlist';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

import Wishlist from './Wishlist';

type Prop = {
  wishlistData: WishlistType;
  selected?: boolean;
  onSelect?: (id: number) => void;
  onRefetch?: () => void;
};

function WishlistCard({
  wishlistData,
  selected = false,
  onSelect,
  onRefetch,
}: Prop) {
  const { id, name, isPublic } = wishlistData;
  const {
    mounted,
    opened,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();

  const deleteWishlist = async (wishId: number) => {
    // todo: try-catch
    const isDelete = confirm('정말 삭제하시겠습니까?');
    await wishlist.delete(wishId);
    if (isDelete) {
      onRefetch?.();
    }
  };

  return (
    <S.Container selected={selected} onClick={() => onSelect?.(id)}>
      <S.Name>{name}</S.Name>
      <S.ButtonWrapper>
        <Button
          text="상세"
          color={selected ? 'primary' : 'gray'}
          size="sm"
          type="button"
          onClick={handleOpenModal}
        />
        {isPublic || (
          <S.RemoveButton type="button" onClick={() => deleteWishlist(id)}>
            <Trash size="sm" color={THEME.PALETTE.primary[90]} />
          </S.RemoveButton>
        )}
      </S.ButtonWrapper>

      <Modal
        opened={opened}
        mounted={mounted}
        onUnmount={handleUnmountModal}
        onClose={handleCloseModal}
      >
        <Wishlist id={id} name={name} isPublic={isPublic} />
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

      &:active {
        background-color: ${theme.PALETTE.secondary[20]};
        }
    `};

    border-bottom: solid 1px ${({ theme }) => theme.PALETTE.gray[20]};
  `,

  Name: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,

  ButtonWrapper: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  RemoveButton: styled.button``,
};
