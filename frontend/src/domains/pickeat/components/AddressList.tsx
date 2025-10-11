import styled from '@emotion/styled';

import { AddressType } from '../utils/kakaoLocalAPI';

type Props = {
  addressList: AddressType[];
  onClick: (value: string) => void;
};

function AddressList({ addressList, onClick }: Props) {
  return (
    <S.List>
      {addressList.length > 0 ? (
        addressList.map(address => (
          <S.Address
            key={address.id}
            onClick={() => onClick(address.placeName)}
          >
            <S.PlaceName>{address.placeName}</S.PlaceName>
            <S.AddressName>{address.addressName}</S.AddressName>
          </S.Address>
        ))
      ) : (
        <div>존재하는 주소가 없습니다.</div>
      )}
    </S.List>
  );
}

export default AddressList;

const S = {
  List: styled.ul`
    width: 100%;
    height: 80%;

    overflow: scroll;
  `,

  Address: styled.li`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level1};

    padding: ${({ theme }) => theme.PADDING.px3};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    }
  `,

  PlaceName: styled.span``,
  AddressName: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
};
