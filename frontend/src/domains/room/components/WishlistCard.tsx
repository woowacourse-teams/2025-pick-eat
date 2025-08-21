import Button from '@components/actions/Button';
import Trash from '@components/assets/icons/Trash';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { pickeat } from '@apis/pickeat';
import { wishlist, WishlistType } from '@apis/wishlist';

import { generateRouterPath } from '@routes/routePath';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

import Wishlist from './Wishlist';

type Prop = {
  wishlistData: WishlistType;
  onRefetch?: () => void;
};

function WishlistCard({ wishlistData, onRefetch }: Prop) {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') ?? '';
  const navigate = useNavigate();
  const { id, name, isPublic } = wishlistData;
  const {
    mounted,
    opened,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();

  const deleteWishlist = async (wishId: number) => {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (isDelete) {
      try {
        await wishlist.delete(wishId);
        onRefetch?.();
      } catch {
        alert('삭제 실패!');
      }
    }
  };

  const handlePublicWishlistClick = async (id: number) => {
    try {
      const code = await pickeat.post(roomId, makePickeatName());
      await pickeat.postWish(id, code);
      if (code) navigate(generateRouterPath.pickeatDetail(code));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <S.Container>
      <S.Name>{name}</S.Name>
      <S.ButtonWrapper>
        <Button
          text="상세"
          color="gray"
          size="sm"
          type="button"
          onClick={handleOpenModal}
        />
        {isPublic ? (
          <Button
            text="픽잇 시작"
            size="sm"
            onClick={() => handlePublicWishlistClick(id)}
          />
        ) : (
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
  Container: styled.div`
    height: 90px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p7};

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
