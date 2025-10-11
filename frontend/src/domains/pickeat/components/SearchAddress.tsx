import LineSearchBar from '@components/actions/SearchBar/LineSearchBar';

import styled from '@emotion/styled';

import { useFindAddress } from '../hooks/useFindAddress';

import AddressList from './AddressList';

type Props = {
  onAddressClick: (value: string) => void;
};

function SearchAddress({ onAddressClick }: Props) {
  const { address, handleInputChange, addressList } = useFindAddress();

  return (
    <S.Container>
      <S.Title>어디서 식사하시나요?</S.Title>
      <>
        <S.SearchBarWrapper>
          <LineSearchBar
            xIcon
            placeholder="강남역 2호선, 성담 빌딩 등등.."
            value={address}
            onChange={e => handleInputChange(e.target.value)}
            onClear={() => handleInputChange('')}
          />
          {addressList && (
            <AddressList addressList={addressList} onClick={onAddressClick} />
          )}
        </S.SearchBarWrapper>
      </>
    </S.Container>
  );
}

export default SearchAddress;

const S = {
  Container: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Title: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,

  SearchBarWrapper: styled.div``,
};
