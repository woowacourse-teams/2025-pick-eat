import TabMenu from '@components/tabMenus/TabMenu';

import { Restaurant } from '@apis/restaurant';
import styled from '@emotion/styled';
import { use, useMemo } from 'react';

import ExcludeActionButtons from './components/actions/ExcludeActionButtons';
import RestaurantList from './components/RestaurantList';
import { RestaurantExcludeProvider } from './context/RestaurantExcludeProvider';

type RestaurantTabCategory = '한식' | '중식' | '일식' | '양식' | '기타';
const TAB_NAMES = [
  '한식',
  '중식',
  '일식',
  '양식',
  '기타',
] as RestaurantTabCategory[];

function groupByCategory(restaurants: Restaurant[]) {
  return TAB_NAMES.reduce<Record<RestaurantTabCategory, Restaurant[]>>(
    (acc, tab) => {
      acc[tab] = restaurants.filter(item => item.category === tab);
      return acc;
    },
    {} as Record<RestaurantTabCategory, Restaurant[]>
  );
}

function RestaurantExclude({
  restaurantData,
}: {
  restaurantData: Promise<Restaurant[]>;
}) {
  const restaurants = use(restaurantData);
  const restaurantsByCategory = useMemo(
    () => groupByCategory(restaurants),
    [restaurants]
  );
  const tabData = TAB_NAMES.map(tab => ({
    tab,
    content: <RestaurantList restaurantList={restaurantsByCategory[tab]} />,
  }));

  return (
    <RestaurantExcludeProvider>
      <TabMenu tabData={tabData} />
      <S.Footer>
        <ExcludeActionButtons />
      </S.Footer>
    </RestaurantExcludeProvider>
  );
}

export default RestaurantExclude;

const S = {
  Footer: styled.footer`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    bottom: 0;

    padding: ${({ theme }) => theme.PADDING.py4};

    background-color: ${({ theme }) => theme.PALLETE.gray[0]};
    border-top: 1px solid ${({ theme }) => theme.PALLETE.gray[20]};
  `,
};
