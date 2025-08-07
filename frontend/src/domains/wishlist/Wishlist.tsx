import Button from '@components/actions/Button';

import { WishlistResponse } from '@apis/wishlist';

import styled from '@emotion/styled';
import { Wishlist } from '@pages/ChooseWishlist';

type Prop = {
  wishlist: WishlistResponse;
  selected: boolean;
  onSelect: (id: number) => void;
};

function Wishlist({ wishlist, selected, onSelect }: Prop) {
  const { id, name } = wishlist;

  return (
    <S.Container selected={selected} onClick={() => onSelect(id)}>
      <S.Name>{name}</S.Name>
      <Button
        text="상세"
        color={selected ? 'primary' : 'gray'}
        size="sm"
        type="button"
      />
    </S.Container>
  );
}

export default Wishlist;

const S = {
  Container: styled.div<{ selected: boolean }>`
    height: 90px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p7};

    background-color: ${({ selected, theme }) =>
      selected && theme.PALETTE.secondary[10]};

    ${({ selected, theme }) =>
      !selected &&
      `cursor: pointer;

       &:hover {
         background-color: ${theme.PALETTE.secondary[5]};
        }

      &:active {
        background-color: ${theme.PALETTE.secondary[20]};
        }
    `};

    border-bottom: solid 1px ${({ theme }) => theme.PALETTE.gray[20]};
  `,

  Name: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};
