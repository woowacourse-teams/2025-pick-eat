import FixedButton from '@components/actions/FixedButton';

import { useRestaurantExcludeContext } from '@domains/pickeat/restaurantExclude/context/RestaurantExcludeProvider';

import { restaurants } from '@apis/restaurants';

import { generateRouterPath } from '@routes/routePath';

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
    <FixedButton aria-label="제외 식당 제출" onClick={submitExcludeRestaurants}>
      제출하기
    </FixedButton>
  );
}

export default ExcludeActionButton;
