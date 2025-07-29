import styled from '@emotion/styled';

import { AddressType } from '../utils/convertAddress';

type Props = {
  addressList: AddressType[];
  onClick: (value: string) => void;
};

function AddressList({ addressList, onClick }: Props) {
  return (
    <S.List>
      {addressList.map(address => (
        <S.Address
          key={address.addressName}
          onClick={() => onClick(address.placeName)}
        >
          <S.PlaceName>{address.placeName}</S.PlaceName>
          <S.AddressName>{address.addressName}</S.AddressName>
        </S.Address>
      ))}
    </S.List>
  );
}

export default AddressList;

const S = {
  List: styled.ul`
    width: 100%;
    height: 300px;
    position: absolute;
    top: 110%;
    z-index: ${({ theme }) => theme.Z_INDEX.dropdown};

    padding: ${({ theme }) => theme.PADDING.p3};
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[60]};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 5px;
    overflow-x: scroll;
  `,

  Address: styled.li`
    display: flex;
    flex-direction: column;
    gap: 2px;

    padding: ${({ theme }) => theme.PADDING.p5} +
      ${({ theme }) => theme.PADDING.px3};
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
