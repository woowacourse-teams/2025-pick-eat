import RegisterForm from '@domains/room/components/WishlistTab/RegisterFrom';

import LineSearchBar from '@components/actions/SearchBar/LineSearchBar';
import Arrow from '@components/assets/icons/Arrow';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import { useFindAddress } from '@domains/pickeat/hooks/useFindAddress';
import { useCreateWish } from '@domains/wishlist/hooks/useCreateWish';

import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router';

type Props = {
  onClick: () => void;
  onCreate: () => void;
};

function RegisterWish({ onClick, onCreate }: Props) {
  const [searchParams] = useSearchParams();
  const wishId = Number(searchParams.get('wishId')) ?? '';
  const modalRoot = document.querySelector('#modal') as HTMLElement;

  const handleCreateWish = () => {
    onCreate();
    handleInputChange('');
  };
  const { formData, handleFormData, initialWishFormData, createWish, error } =
    useCreateWish(handleCreateWish);

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

      <S.Wrapper>
        <S.Title>즐겨찾기 등록하기</S.Title>
        <LineSearchBar
          label="식당 검색"
          xIcon
          placeholder="식당 이름 검색으로 간편 입력"
          value={address}
        />
        <RegisterForm
          formData={formData}
          onFormChange={handleFormData}
          onSubmit={() => createWish(wishId)}
          errorMessage={error}
        />
      </S.Wrapper>
    </S.Container>,
    modalRoot
  );
}

export default RegisterWish;

const S = {
  Container: styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.overlay};

    padding: 0 ${({ theme }) => theme.PADDING.p5}
      ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
  Header: styled.div`
    height: ${HEADER_HEIGHT};
    display: flex;
  `,
  BackButton: styled.button``,
  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level8};
  `,
};
