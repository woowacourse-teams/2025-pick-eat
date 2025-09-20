import AddressList from '@domains/pickeat/components/AddressList';
import WishForm from '@domains/wishlist/components/WishForm';

import SearchBar from '@components/actions/SearchBar';
import Arrow from '@components/assets/icons/Arrow';

import { useFindAddress } from '@domains/pickeat/hooks/useFindAddress';
import { useCreateWish } from '@domains/wishlist/hooks/useCreateWish';

import styled from '@emotion/styled';

type Props = {
  wishlistId: number;
  onCreate: () => void;
  onTabChange: (index: number) => void;
};

function WishFormTab({ wishlistId, onCreate, onTabChange }: Props) {
  const handleCreateWish = () => {
    onCreate();
    handleInputChange('');
  };
  const { formData, handleFormData, initialWishFormData, createWish, error } =
    useCreateWish(handleCreateWish);
  const { address, handleInputChange, addressList, handleAddressClick } =
    useFindAddress(initialWishFormData);

  return (
    <>
      <S.TopArea>
        <S.BackArrow onClick={() => onTabChange(0)}>
          <Arrow size="lg" direction="left" />
        </S.BackArrow>

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
export default WishFormTab;

const S = {
  TopArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  BackArrow: styled.button``,
};
