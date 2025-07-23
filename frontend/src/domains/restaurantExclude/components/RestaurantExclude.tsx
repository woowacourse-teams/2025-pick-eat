import CheckBox from '@components/actions/Checkbox';
import TabMenu from '@components/tabMenus/TabMenu';

import {
  RestaurantExcludeProvider,
  useRestaurantExcludeContext,
} from '@domains/restaurantExclude/context/RestaurantExcludeProvider';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';
import { use, useMemo } from 'react';

import ExcludeActionButtons from './actions/ExcludeActionButtons';
import RestaurantList from './restaurantList/RestaurantList';

type RestaurantTabCategory = '한식' | '중식' | '일식' | '양식' | '기타';

type Props = {
  restaurantData: Promise<Restaurant[]>;
};
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

function RestaurantExclude({ restaurantData }: Props) {
  const restaurants = use(restaurantData);
  const restaurantsByCategory = useMemo(
    () => groupByCategory(restaurants),
    [restaurants]
  );
  const {
    selectedRestaurantIds,
    handleRestaurantSetPush,
    handleRestaurantSelectionDelete,
  } = useRestaurantExcludeContext();

  const handleRestaurantAllSelectionToggle = (tab: RestaurantTabCategory) => {
    const restaurantIds = restaurantsByCategory[tab].map(r => r.id);
    const isAllSelected = restaurantIds.every(id =>
      selectedRestaurantIds.includes(id)
    );
    if (isAllSelected) {
      handleRestaurantSelectionDelete(restaurantIds);
    } else {
      handleRestaurantSetPush(restaurantIds);
    }
  };

  const tabData = TAB_NAMES.map(tab => ({
    tab,
    content: (
      <S.Container>
        <S.CheckBoxWrapper>
          <CheckBox
            checked={restaurantsByCategory[tab]
              .map(r => r.id)
              .every(id => selectedRestaurantIds.includes(id))}
            onToggle={() => handleRestaurantAllSelectionToggle(tab)}
          />
          <p> {tab} 식당 전체 선택</p>
        </S.CheckBoxWrapper>
        <RestaurantList restaurantList={restaurantsByCategory[tab]} />
      </S.Container>
    ),
  }));

  return (
    <>
      <TabMenu tabData={tabData} style={{ minHeight: '100vh' }} />
      <S.Footer>
        <ExcludeActionButtons />
      </S.Footer>
    </>
  );
}

export default function RestaurantExcludeWithProvider(props: Props) {
  return (
    <RestaurantExcludeProvider>
      <RestaurantExclude {...props} />
    </RestaurantExcludeProvider>
  );
}

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
