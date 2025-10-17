import AddressList from '@domains/pickeat/components/AddressList';

import LineSearchBar from '@components/actions/SearchBar/LineSearchBar';

import { AddressType } from '@domains/pickeat/utils/kakaoLocalAPI';

import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

type Props = {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder: string;
  addressList: AddressType[] | null;
  onClick: (value: string) => void;
};

function SearchRestaurant({ addressList, onClick, ...props }: Props) {
  return (
    <S.Container>
      <S.Title>등록할 식당을 검색해주세요.</S.Title>
      <LineSearchBar xIcon {...props} />
      {addressList && (
        <AddressList addressList={addressList} onClick={onClick} />
      )}
    </S.Container>
  );
}

export default SearchRestaurant;

const S = {
  Container: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  Title: styled.h2`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
