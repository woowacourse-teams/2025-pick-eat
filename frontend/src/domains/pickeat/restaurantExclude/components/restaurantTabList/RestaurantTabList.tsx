import TabMenu from '@components/tabMenus/TabMenu';

import { Restaurant } from '@apis/restaurant';

import { useRestaurantsData } from './hooks/useRestaurantsData';
import { useRestaurantTabs } from './hooks/useRestaurantTabs';

type Props = {
  restaurantList: Restaurant[];
};

function RestaurantTabList({ restaurantList }: Props) {
  const restaurantsData = useRestaurantsData(restaurantList);
  const tabData = useRestaurantTabs(restaurantsData);

  return <TabMenu tabData={tabData} />;
}

export default RestaurantTabList;
