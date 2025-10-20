import Plus from '@components/assets/icons/Plus';
import { useModal } from '@components/modal/useModal';

import { wishQuery } from '@apis/wish';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

import RegisterWishModal from './RegisterWishModal';
import WishRestaurantCard from './WishRestaurantCard';

function WishlistTab() {
  const { opened, handleCloseModal, handleOpenModal } = useModal();
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const { data } = wishQuery.useGet(roomId);

  return (
    <S.Container>
      <S.RegisterButton onClick={handleOpenModal}>
        <Plus size="xlg" color={THEME.PALETTE.gray[30]} />
        <S.Description>식당을 추가해 보세요!</S.Description>
      </S.RegisterButton>

      <S.Wishlist>
        {data.length > 0 ? (
          data.map(wish => (
            <WishRestaurantCard key={wish.id} restaurantData={wish} />
          ))
        ) : (
          <S.EmptyDescriptionPointText>
            즐겨찾기에 식당을 추가해보세요!
          </S.EmptyDescriptionPointText>
        )}
      </S.Wishlist>

      {opened && <RegisterWishModal onClose={handleCloseModal} />}
    </S.Container>
  );
}

export default WishlistTab;

const S = {
  Container: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
  RegisterButton: styled.div`
    width: 312px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 2px dashed ${({ theme }) => theme.PALETTE.gray[30]};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    border-radius: ${({ theme }) => theme.RADIUS.medium};
    cursor: pointer;
  `,
  Description: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
  Wishlist: styled.div`
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    overflow: scroll;

    padding: ${({ theme }) => theme.PADDING.p6};

    scrollbar-width: none;
  `,
  EmptyDescriptionPointText: styled.span`
    width: 100%;

    margin-top: 20px;

    color: ${({ theme }) => theme.PALETTE.gray[30]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
    text-align: center;
  `,
};
