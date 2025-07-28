import { Restaurant } from "@apis/restaurant";


export type RestaurantTabCategory = '한식' | '중식' | '일식' | '양식' | '기타';


export const TAB_NAMES = [
  '한식',
  '중식',
  '일식',
  '양식',
  '기타',
] as RestaurantTabCategory[];

export function createGroupByCategory(restaurants: Restaurant[]) {
  return TAB_NAMES.reduce<Record<RestaurantTabCategory, Restaurant[]>>(
    (acc, tab) => {
      acc[tab] = restaurants.filter(item => item.category === tab);
      return acc;
    },
    {} as Record<RestaurantTabCategory, Restaurant[]>
  );
}