import AddressList from '@domains/pickeat/components/AddressList';

import SearchBar from '@components/actions/SearchBar';

import { useFindAddress } from '@domains/pickeat/hooks/useFindAddress';

import styled from '@emotion/styled';

import { useCreateWish } from '../hooks/useCreateWish';

import WishForm from './WishForm';

type Props = {
  wishlistId: number;
};

function WishFormTab({ wishlistId }: Props) {
  const { formData, handleFormData, createInitialWishFormData, createWish } =
    useCreateWish();
  const { address, handleInputChange, addressList, handleAddressClick } =
    useFindAddress(createInitialWishFormData);

  return (
    <>
      <SearchBar
        value={address}
        onChange={e => handleInputChange(e.target.value)}
        name="address"
        placeholder="식당 이름을 입력하세요."
      >
        {addressList && (
          <AddressList addressList={addressList} onClick={handleAddressClick} />
        )}
      </SearchBar>
      {/* todo: 초기값 처리 */}
      {formData && (
        <WishForm
          formData={formData}
          onFormChange={handleFormData}
          onSubmit={() => createWish(wishlistId)}
        />
      )}
    </>
  );
}
export default WishFormTab;
