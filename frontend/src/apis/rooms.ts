import { apiClient } from './apiClient';
import { Room, RoomResponse } from './room';

const convertResponseToRooms = (data: RoomResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
    memberCount: d.userCount,
  }));
};

const basePath = 'rooms';

export const rooms = {
  get: async (): Promise<Room[]> => {
    const response = await apiClient.get<RoomResponse[]>(basePath);
    if (response) return convertResponseToRooms(response);
    return [];
  },
};
