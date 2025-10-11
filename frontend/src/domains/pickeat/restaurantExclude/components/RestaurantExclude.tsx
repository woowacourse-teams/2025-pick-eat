import { RestaurantExcludeProvider } from '@domains/pickeat/restaurantExclude/context/RestaurantExcludeProvider';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';
import { use } from 'react';

import ExcludeActionButton from './actions/ExcludeActionButton';
import RestaurantTabList from './restaurantTabList/RestaurantTabList';

type Props = {
  restaurantsPromise: Promise<Restaurant[]>;
};

const footerHeight = 74;

function RestaurantExclude({ restaurantsPromise }: Props) {
  const restaurantsData = use(restaurantsPromise);
  return (
    <RestaurantExcludeProvider>
      <S.RestaurantTabContainer>
        <RestaurantTabList restaurantList={restaurantsData} />
      </S.RestaurantTabContainer>
      <S.Footer>
        <ExcludeActionButton />
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
  RestaurantTabContainer: styled.div`
    padding: ${({ theme }) => theme.PADDING.p5};
    padding-bottom: ${footerHeight}px;
  `,
  Footer: styled.footer`
    width: 100vw;
    max-width: 480px;
    height: ${footerHeight}px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    bottom: 8px;
    left: 50%;
    z-index: ${({ theme }) => theme.Z_INDEX.fixed};

    padding: ${({ theme }) => theme.PADDING.py4};
    transform: translateX(-50%);
  `,
};
