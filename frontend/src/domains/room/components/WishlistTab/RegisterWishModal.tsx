import RegisterForm from '@domains/wishlist/components/WishForm/RegisterFrom';

import { HEADER_HEIGHT } from '@widgets/Header';

import LineSearchBar from '@components/actions/SearchBar/LineSearchBar';
import Arrow from '@components/assets/icons/Arrow';
import BottomSheet from '@components/BottomSheet';
import { useModal } from '@components/modal/useModal';

import { useFindAddress } from '@domains/pickeat/hooks/useFindAddress';
import { useCreateWish } from '@domains/wishlist/hooks/useCreateWish';

import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router';

import SearchRestaurant from './SearchRestaurant';

type Props = {
  onClick: () => void;
  onCreate: () => void;
};

function RegisterWishModal({ onClick, onCreate }: Props) {
  const { opened, handleCloseModal, handleOpenModal } = useModal();
  const [searchParams] = useSearchParams();
  const wishId = Number(searchParams.get('wishId')) ?? '';
  const modalRoot = document.querySelector('#modal') as HTMLElement;

  const handleCreateWish = () => {
    onCreate();
    handleInputChange('');
  };
  const { formData, handleFormData, initialWishFormData, createWish, error } =
    useCreateWish({ onCreate: handleCreateWish, onClose: handleCloseModal });

  const { address, handleInputChange, addressList, handleAddressClick } =
    useFindAddress({
      onSelectedAddress: initialWishFormData,
      option: { category_group_code: 'FD6' },
    });

  return createPortal(
    <S.Container>
      <S.Header>
        <S.BackButton onClick={onClick}>
          <Arrow direction="left" size="lg" />
        </S.BackButton>
      </S.Header>

      <S.SearchWrapper>
        <S.Title>즐겨찾기 등록하기</S.Title>
        <S.SearchButton onClick={handleOpenModal}>
          <LineSearchBar
            readOnly
            label="식당 검색"
            placeholder="식당 이름 검색으로 간편 입력"
            value={address}
            xIcon
            defenseClick
          />
        </S.SearchButton>
        <RegisterForm
          formData={formData}
          onFormChange={handleFormData}
          onSubmit={() => createWish(wishId)}
          errorMessage={error}
        />
      </S.SearchWrapper>

      <BottomSheet opened={opened} onClose={handleCloseModal}>
        <SearchRestaurant
          name="address"
          value={address}
          onChange={e => handleInputChange(e.target.value)}
          onClear={() => handleInputChange('')}
          placeholder="맥도날드 잠실역점, 잠실 맥도날드..."
          addressList={addressList}
          onClick={handleAddressClick}
        />
      </BottomSheet>
    </S.Container>,
    modalRoot
  );
}
export default RegisterWishModal;

const S = {
  Container: styled.div`
    width: 100vw;
    max-width: 480px;
    position: absolute;
    top: 0;
    left: 50%;

    /* TODO: header 보다는 크게 bottom-sheet 보단 작게 */
    z-index: ${({ theme }) => theme.Z_INDEX.fixed};

    padding: 0 ${({ theme }) => theme.PADDING.p5}
      ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    transform: translateX(-50%);
  `,
  Header: styled.div`
    height: ${HEADER_HEIGHT};
    display: flex;
    position: sticky;
    top: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.sticky};
    backdrop-filter: blur(12px) saturate(180%);
  `,
  BackButton: styled.button``,
  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  SearchWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level8};
  `,
  SearchButton: styled.div``,
};
