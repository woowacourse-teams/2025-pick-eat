import Button from '@components/actions/Button';
import Arrow from '@components/assets/icons/Arrow';
import DoubleArrow from '@components/assets/icons/DoubleArrow';

import { useRestaurantExcludeContext } from '@domains/restaurantExclude/context/RestaurantExcludeProvider';

import { restaurants } from '@apis/restaurant';

import styled from '@emotion/styled';
import { generateRouterPath } from '@routes/routePath';
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
      <S.RightButtonWrapper>
        <S.RightButtonBox>
          <Button
            text="건너뛰기"
            color="gray"
            rightIcon={
              <DoubleArrow size="sm" direction="right" color="black" />
            }
            onClick={navigateToPrefer}
          />
        </S.RightButtonBox>
        <Button
          text="다음"
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
      </S.RightButtonWrapper>
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

    padding: 0 ${({ theme }) => theme.PADDING.px3};
  `,
  RightButtonWrapper: styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: 0 ${({ theme }) => theme.PADDING.px5};
  `,
  RightButtonBox: styled.div`
    flex-grow: 1;
  `,
};
