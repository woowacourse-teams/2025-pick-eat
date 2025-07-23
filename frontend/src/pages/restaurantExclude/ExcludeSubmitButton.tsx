import Button from '@components/actions/Button';

import { restaurants } from '@apis/restaurant';

import { useRestaurantExcludeContext } from '../../context/RestaurantExcludeProvider';

function ExcludeSubmitButton() {
  const { selectedRestaurantIds } = useRestaurantExcludeContext();

  const handleSubmit = () => {
    restaurants.patch(selectedRestaurantIds);
  };

  return (
    <Button
      text="다음"
      size="md"
      rightIcon="./images/arrow.svg"
      onClick={handleSubmit}
      disabled={selectedRestaurantIds.length === 0}
    />
  );
}

export default ExcludeSubmitButton;
