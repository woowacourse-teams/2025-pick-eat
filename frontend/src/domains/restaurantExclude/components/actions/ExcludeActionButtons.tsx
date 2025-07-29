import Button from '@components/actions/Button';
import Arrow from '@components/assets/icons/Arrow';
import DoubleArrow from '@components/assets/icons/DoubleArrow';

import { useRestaurantExcludeContext } from '@domains/restaurantExclude/context/RestaurantExcludeProvider';

import { restaurants } from '@apis/restaurant';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

function ExcludeActionButtons() {
  const { selectedRestaurantIds } = useRestaurantExcludeContext();

  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('code') ?? '';

  const navigate = useNavigate();
  const navigateToPrefer = () => {
    navigate(generateRouterPath.preferRestaurant(roomCode));
  };

  const submitExcludeRestaurants = () => {
    restaurants.patch(selectedRestaurantIds);
    navigateToPrefer();
  };

  const disabled = selectedRestaurantIds.length === 0;

  return (
    <S.ButtonBox>
          <S.SkipButtonBox>
            <Button
              text="건너뛰기"
              color="gray"
              rightIcon={
                <DoubleArrow size="sm" direction="right" color="black" />
              }
              onClick={navigateToPrefer}
            />
          </S.SkipButtonBox>
        <Button
          text="제출"
          size="md"
          rightIcon={
            <Arrow
              size="sm"
              direction="right"
              color={disabled ? 'gray' : 'white'}
            />
          }
          onClick={submitExcludeRestaurants}
          disabled={disabled}
        />
    </S.ButtonBox>
  );
}

export default ExcludeActionButtons;

const S = {
  ButtonBox: styled.div`
    width: 100%;
    height: fit-content;

    display: flex;
    justify-content: flex-end;

    align-items: center;
    gap: ${({ theme }) => theme.GAP.level6};
  `,
  SkipButtonBox: styled.div`
    width: 150px;
    height: fit-content;
  `,
  RightButtonBox: styled.div`
  `,
};
