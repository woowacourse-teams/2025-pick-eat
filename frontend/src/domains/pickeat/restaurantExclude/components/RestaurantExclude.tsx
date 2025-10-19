import { RestaurantExcludeProvider } from '@domains/pickeat/restaurantExclude/context/RestaurantExcludeProvider';

import styled from '@emotion/styled';

import ExcludeActionButton from './actions/ExcludeActionButton';
import RestaurantTabList from './restaurantTabList/RestaurantTabList';

const footerHeight = 90;

function RestaurantExclude() {
  return (
    <RestaurantExcludeProvider>
      <S.RestaurantTabContainer>
        <RestaurantTabList />
      </S.RestaurantTabContainer>
      <ExcludeActionButton />
      <S.FooterGradient />
    </RestaurantExcludeProvider>
  );
}

export default RestaurantExclude;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  RestaurantTabContainer: styled.div`
    padding: ${({ theme }) => theme.PADDING.p5};
    padding-bottom: ${footerHeight}px;
  `,
  FooterGradient: styled.footer`
    ${({ theme }) => theme.POSITION.fixedCenter};
    height: ${footerHeight}px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    z-index: 0;

    background: linear-gradient(to top, white, transparent);
  `,
};
