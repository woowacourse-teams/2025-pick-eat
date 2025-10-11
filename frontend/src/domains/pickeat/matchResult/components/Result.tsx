import ResultRestaurantCard from '@domains/pickeat/matchResult/components/ResultRestaurantCard';

import { usePickeatResult } from '@domains/pickeat/matchResult/hooks/usePickeatResult';

type Props = {
  pickeatCode: string;
};

function Result({ pickeatCode }: Props) {
  const pickeatResult = usePickeatResult(pickeatCode);

  if (!pickeatResult) return null;

  return <ResultRestaurantCard restaurantData={pickeatResult} />;
}

export default Result;
