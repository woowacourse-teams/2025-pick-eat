import CheckBox from '@components/actions/Checkbox';

import { useRestaurantExcludeContext } from '@domains/pickeat/restaurantExclude/context/RestaurantExcludeProvider';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';
import { useMemo } from 'react';

import RestaurantList from '../restaurantList/RestaurantList';

export type RestaurantTabCategory = '한식' | '중식' | '일식' | '양식' | '기타';

export const TAB_NAMES = [
  '한식',
  '중식',
  '일식',
  '양식',
  '기타',
] as RestaurantTabCategory[];

function createGroupByCategory(restaurants: Restaurant[]) {
  return TAB_NAMES.reduce<Record<RestaurantTabCategory, Restaurant[]>>(
    (acc, tab) => {
      acc[tab] = restaurants.filter(item => item.category === tab);
      return acc;
    },
    {} as Record<RestaurantTabCategory, Restaurant[]>
  );
}

export function useRestaurantTabs(restaurantsData: Restaurant[]) {
  const restaurantsByCategory = useMemo(
    () => createGroupByCategory(restaurantsData),
    [restaurantsData]
  );

  const {
    selectedRestaurantIds,
    handleRestaurantSetPush,
    handleRestaurantSelectionDelete,
  } = useRestaurantExcludeContext();

  const handleRestaurantAllSelectionToggle = (tab: RestaurantTabCategory) => {
    const restaurantIds = restaurantsByCategory[tab]?.map(r => r.id) ?? [];
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
        <S.CheckBoxWrapper
          aria-label={`${tab} 식당 전체 소거`}
          onClick={() => handleRestaurantAllSelectionToggle(tab)}
        >
          <CheckBox
            checked={
              restaurantsByCategory[tab]
                ?.map(r => r.id)
                .every(id => selectedRestaurantIds.includes(id)) ?? false
            }
          />
          <S.CheckLabelText> {tab} 식당 전체 소거</S.CheckLabelText>
        </S.CheckBoxWrapper>
        <RestaurantList restaurantList={restaurantsByCategory[tab] ?? []} />
      </S.Container>
    ),
  }));

  return tabData;
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    background: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
  CheckBoxWrapper: styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: ${({ theme }) => theme.PADDING.py4} +
      ${({ theme }) => theme.PADDING.px6};

    cursor: pointer;
  `,
  SelectAllCheckbox: styled.input`
    width: 100%;
  `,
  CheckLabelText: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
