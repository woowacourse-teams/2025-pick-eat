import AddressList from '@domains/pickeat/components/AddressList';
import WishForm from '@domains/wishlist/components/WishForm';

import SearchBar from '@components/actions/SearchBar';

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
    <>
      <S.TopArea>
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
    </>
  );
}
export default WishAddressFrom;

const S = {
  TopArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  BackArrow: styled.button``,
};
