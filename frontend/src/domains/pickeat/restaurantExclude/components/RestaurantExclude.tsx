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
    margin-bottom: ${footerHeight}px;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
  Footer: styled.footer`
    width: 100%;
    max-width: 768px;
    height: ${footerHeight}px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.fixed};

    padding: ${({ theme }) => theme.PADDING.py4};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-top: 1px solid ${({ theme }) => theme.PALETTE.gray[20]};
  `,
};
