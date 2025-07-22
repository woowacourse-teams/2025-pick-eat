import { apiClient } from './apiClient';

export type RestaurantResponse = {
  id: number;
  name: string;
  category: string;
  distance: number;
  roadAddressName: string;
  likeCount: number;
  x: number;
  y: number;
};

export type Restaurant = {
  id: string;
  name: string;
  category: string;
  distance: number;
  roadAddressName: string;
  likeCount: number;
  x: number;
  y: number;
};

export const convertResponseToRestaurant = ({
  id,
  name,
  category,
  distance,
  roadAddressName,
  likeCount,
  x,
  y,
}: RestaurantResponse): Restaurant => ({
  id: id.toString(),
  name: name.toString(),
  category: category.toString(),
  distance: Number(distance),
  roadAddressName: roadAddressName.toString(),
  likeCount: Number(likeCount),
  x: Number(x),
  y: Number(y),
});

const restaurantBaseUrl = '/restaurants';

export const restaurants = {
  get: async (roomCode: string): Promise<Restaurant[]> => {
    const data = await apiClient.get<RestaurantResponse[]>(
      `rooms/${roomCode}${restaurantBaseUrl}`
    );
    const results = (data ?? []).map(restaurant =>
      convertResponseToRestaurant(restaurant)
    );
    return results ?? [];
  },
  patch: async (restaurantsIds: string[]) => {
    const response = await apiClient.patch<RestaurantResponse>(
      `${restaurantBaseUrl}/exclude`,
      {
        body: {
          restaurantIds: restaurantsIds,
        },
      }
    );
    if (!response) return [];
    return convertResponseToRestaurant(response);
  },
};
