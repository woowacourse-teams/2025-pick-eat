import { RestaurantExcludeProvider } from '@domains/pickeat/restaurantExclude/context/RestaurantExcludeProvider';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';
import { use } from 'react';

import ExcludeActionButton from './actions/ExcludeActionButton';
import RestaurantTabList from './restaurantTabList/RestaurantTabList';

type Props = {
  restaurantsPromise: Promise<Restaurant[]>;
};

const footerHeight = 90;

function RestaurantExclude({ restaurantsPromise }: Props) {
  const restaurantsData = use(restaurantsPromise);
  return (
    <RestaurantExcludeProvider>
      <S.RestaurantTabContainer>
        <RestaurantTabList restaurantList={restaurantsData} />
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
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0px;

    background: linear-gradient(to top, white, transparent);
  `,
};
