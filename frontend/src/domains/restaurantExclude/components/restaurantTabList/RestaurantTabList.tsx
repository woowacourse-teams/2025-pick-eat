import TabMenu from '@components/tabMenus/TabMenu';

import { Restaurant } from '@apis/restaurant';

import { useRestaurantsPolling } from './hooks/useRestaurantsPolling';
import { useRestaurantTabsContext } from './hooks/useRestaurantTabsContext';



type Props = {
  initialData?: Restaurant[];
};

function RestaurantTabList({ initialData = [] }: Props) {
  const restaurantsData = useRestaurantsPolling(initialData);
   const tabData = useRestaurantTabsContext(restaurantsData);

  return (
    <TabMenu tabData={tabData} style={{ minHeight: '100vh' }} />
  );
}

export default RestaurantTabList;