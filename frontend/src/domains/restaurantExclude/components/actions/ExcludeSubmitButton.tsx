import Button from '@components/actions/Button';
import Arrow from '@components/assets/icons/Arrow';

import { restaurants } from '@apis/restaurant';
import { generateRouterPath } from '@routes/routePath';

import { useNavigate, useSearchParams } from 'react-router';

import { useRestaurantExcludeContext } from '../../context/RestaurantExcludeProvider';

function ExcludeSubmitButton() {
  const { selectedRestaurantIds } = useRestaurantExcludeContext();

  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('code') ?? '';
  const navigate = useNavigate();

  const handleSubmit = () => {
    restaurants.patch(selectedRestaurantIds);
    navigate(generateRouterPath.preferRestaurant(roomCode));
  };

  const disabled = selectedRestaurantIds.length === 0;

  return (
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
      onClick={handleSubmit}
      disabled={disabled}
    />
  );
}

export default ExcludeSubmitButton;
