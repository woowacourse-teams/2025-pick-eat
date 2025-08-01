import TabMenu from '@components/tabMenus/TabMenu';

import { Restaurant } from '@apis/restaurant';

import { useRestaurantsPolling } from './hooks/useRestaurantsPolling';
import { useRestaurantTabs } from './hooks/useRestaurantTabs';

type Props = {
  restaurantList: Restaurant[];
};

function RestaurantTabList({ restaurantList }: Props) {
  const restaurantsData = useRestaurantsPolling(restaurantList);
  const tabData = useRestaurantTabs(restaurantsData);

  return <TabMenu tabData={tabData} />;
}

export default RestaurantTabList;
