import { joinAsPath } from '@utils/createUrl';

import { useSuspenseQuery } from '@tanstack/react-query';

import { apiClient, BASE_URL_VERSION } from './apiClient';
import { Room, RoomResponse } from './room';

const convertResponseToRooms = (data: RoomResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
    memberCount: d.userCount,
  }));
};

const BASE_PATH = 'rooms';

export const rooms = {
  get: async (): Promise<Room[]> => {
    const response = await apiClient.get<RoomResponse[]>(
      joinAsPath(BASE_URL_VERSION[2], BASE_PATH)
    );
    if (response) return convertResponseToRooms(response);
    return [];
  },
};

export const roomsQuery = {
  useGet: () => {
    return useSuspenseQuery({
      queryKey: ['rooms'],
      queryFn: async () => rooms.get(),
    });
  },
};
