import CheckBox from '@components/actions/Checkbox';
import TabMenu from '@components/tabMenus/TabMenu';

import {
    useRestaurantExcludeContext
} from '@domains/restaurantExclude/context/RestaurantExcludeProvider';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';
import { useMemo } from 'react';

import { createGroupByCategory, RestaurantTabCategory, TAB_NAMES } from './createGroupByCategory';
import RestaurantList from './restaurantList/RestaurantList';


type Props = {
  restaurants: Restaurant[];
};


function RestaurantTabList({ restaurants }: Props) {
  const restaurantsByCategory = useMemo(
    () => createGroupByCategory(restaurants),
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
        <S.CheckBoxWrapper onClick={() => handleRestaurantAllSelectionToggle(tab)}>
          <CheckBox
            checked={restaurantsByCategory[tab]
              .map(r => r.id)
              .every(id => selectedRestaurantIds.includes(id))}
          />
          <S.CheckLabelText> {tab} 식당 전체 선택</S.CheckLabelText>
        </S.CheckBoxWrapper>
        <RestaurantList restaurantList={restaurantsByCategory[tab]} />
      </S.Container>
    ),
  }));

  return (
      <TabMenu tabData={tabData} style={{ minHeight: '100vh' }} />
  );
}

export default RestaurantTabList;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
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
  `
};
