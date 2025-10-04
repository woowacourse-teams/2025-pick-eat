import AddressList from '@domains/pickeat/components/AddressList';
import WishForm from '@domains/wishlist/components/WishForm';

import SearchBar from '@components/actions/SearchBar/SearchBar';

import { useFindAddress } from '@domains/pickeat/hooks/useFindAddress';
import { useCreateWish } from '@domains/wishlist/hooks/useCreateWish';

import styled from '@emotion/styled';

type Props = {
  wishlistId: number;
  onCreate: () => void;
};

function WishAddressFrom({ wishlistId, onCreate }: Props) {
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

  return (
    <S.Container>
      <S.TopArea>
        <S.Description>식당 이름을 검색하여 찜을 등록해 보세요.</S.Description>
        <SearchBar
          value={address}
          onChange={e => handleInputChange(e.target.value)}
          name="address"
          placeholder="맥도날드 잠실역점, 잠실 맥도날드..."
        >
          {addressList && (
            <AddressList
              addressList={addressList}
              onClick={handleAddressClick}
            />
          )}
        </SearchBar>
      </S.TopArea>
      {formData && (
        <WishForm
          formData={formData}
          onFormChange={handleFormData}
          onSubmit={() => createWish(wishlistId)}
          errorMessage={error}
        />
      )}
    </S.Container>
  );
}
export default WishAddressFrom;

const S = {
  Container: styled.div`
    height: 600px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  TopArea: styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  Description: styled.div`
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};
