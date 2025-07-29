
import {
  RestaurantExcludeProvider
} from '@domains/restaurantExclude/context/RestaurantExcludeProvider';

import styled from '@emotion/styled';

import ExcludeActionButtons from './actions/ExcludeActionButtons';
import RestaurantTabList from './restaurantTabList/RestaurantTabList';


function RestaurantExclude() {
  return (
    <RestaurantExcludeProvider>
      <RestaurantTabList />
      <S.Footer>
        <ExcludeActionButtons />
      </S.Footer>
    </RestaurantExcludeProvider>
  );
}

export default RestaurantExclude;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  CheckBoxWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: ${({ theme }) => theme.PADDING.py4} +
      ${({ theme }) => theme.PADDING.px6};

    p {
      color: ${({ theme }) => theme.PALETTE.gray[80]};
      font: ${({ theme }) => theme.FONTS.body.medium};
    }
  `,
  SelectAllCheckbox: styled.input`
    width: 100%;
  `,
  Footer: styled.footer`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    bottom: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.fixed};

    padding: ${({ theme }) => theme.PADDING.py4};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-top: 1px solid ${({ theme }) => theme.PALETTE.gray[20]};
  `,
};
