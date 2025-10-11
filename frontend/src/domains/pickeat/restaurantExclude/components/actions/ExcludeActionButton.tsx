import NewButton from '@components/actions/NewButton';

import { useRestaurantExcludeContext } from '@domains/pickeat/restaurantExclude/context/RestaurantExcludeProvider';

import { restaurants } from '@apis/restaurants';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

function ExcludeActionButton() {
  const { selectedRestaurantIds } = useRestaurantExcludeContext();

  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const navigate = useNavigate();
  const navigateToPrefer = () => {
    navigate(generateRouterPath.preferRestaurant(pickeatCode));
  };

  const submitExcludeRestaurants = () => {
    restaurants.patch(selectedRestaurantIds);
    navigateToPrefer();
  };

  return (
    <S.ButtonBox>
      <NewButton aria-label="제외 식당 제출" onClick={submitExcludeRestaurants}>
        제출하기
      </NewButton>
    </S.ButtonBox>
  );
}

export default ExcludeActionButton;

const S = {
  ButtonBox: styled.div`
    width: 100%;
    height: fit-content;

    display: flex;
    justify-content: flex-end;

    align-items: center;
    gap: ${({ theme }) => theme.GAP.level6};
  `,
};
