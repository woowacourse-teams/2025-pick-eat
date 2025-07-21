import Button from '@components/actions/Button';

import { useRestaurantExcludeContext } from './RestaurantExcludeProvider';

function ExcludeSubmitButton() {
  const { selectedRestaurantIds } = useRestaurantExcludeContext();

  const handleSubmit = () => {
    alert(`선택된 식당 ID: ${selectedRestaurantIds.join(', ')}`);
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
