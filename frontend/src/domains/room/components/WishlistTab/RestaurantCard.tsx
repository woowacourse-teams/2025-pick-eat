import Cross from '@components/assets/icons/Cross';
import Chip from '@components/labels/Chip';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useModal } from '@components/modal/useModal';

import { Wishes } from '@apis/wishlist';

import styled from '@emotion/styled';

type Props = {
  restaurantData: Wishes;
  onDelete: () => void;
};

function RestaurantCard({ restaurantData, onDelete }: Props) {
  const { tags, name, placeUrl, roadAddressName, pictures } = restaurantData;
  const { opened, mounted, handleUnmountModal, handleOpenModal } = useModal();
  const menuUrl = `${placeUrl}#menuInfo`;

  const handleConfirmDelete = () => {
    handleUnmountModal();
    onDelete();
  };

  return (
    <S.Container>
      <S.Image
        src={pictures[0]?.imageDownloadUrl || '/images/restaurant.png'}
        alt={name}
      />

      <S.Info>
        <S.Top>
          {tags?.length > 0 && (
            <S.TagBox>
              {tags.map((tag: string) => (
                <Chip key={tag} variant="outlined" size="sm">
                  {tag}
                </Chip>
              ))}
            </S.TagBox>
          )}

          <S.Name>{name}</S.Name>
          <S.Address>{roadAddressName}</S.Address>
        </S.Top>
        {placeUrl && (
          <S.Link href={menuUrl} target="_blank" rel="noopener noreferrer">
            메뉴 보러가기
          </S.Link>
        )}
      </S.Info>

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

export default RestaurantCard;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 312px;
    height: 122px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level2};
  `,
  Image: styled.img`
    width: 90px;
    height: 90px;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    object-fit: cover;
  `,
  Info: styled.div`
    width: 170px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  Top: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  TagBox: styled.div`
    width: 100%;
    height: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level2};
    overflow: hidden;
  `,
  Name: styled.span`
    overflow: hidden;

    font: ${({ theme }) => theme.FONTS.body.medium};

    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  Address: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
  Link: styled.a`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.xxsmall};
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
