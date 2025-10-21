import TabMenu from '@components/tabMenus/TabMenu';

import { useRestaurantsData } from './hooks/useRestaurantsData';
import { useRestaurantTabs } from './hooks/useRestaurantTabs';

function RestaurantTabList() {
  const restaurantsData = useRestaurantsData();
  const tabData = useRestaurantTabs(restaurantsData);

  return <TabMenu tabData={tabData} />;
}

export default RestaurantTabList;
