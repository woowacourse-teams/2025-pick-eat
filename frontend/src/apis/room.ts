import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

export type RoomResponse = {
  id: number;
  name: string;
  userCount: number;
};

export type Room = {
  id: number;
  name: string;
  memberCount: number;
};

const convertResponseToRoom = (data: RoomResponse) => {
  return {
    id: data.id,
    name: data.name,
    memberCount: data.userCount,
  };
};

const basePath = 'rooms';

export const room = {
  get: async (roomId: number): Promise<Room | null> => {
    const response = await apiClient.get<RoomResponse>(
      joinAsPath(basePath, `${roomId}`)
    );
    if (response) return convertResponseToRoom(response);
    return null;
  },
  post: async (name: string): Promise<number> => {
    const response = await apiClient.post<Room>(basePath, { name });
    if (response) return response.id;
    return 0;
  },
  postMember: async (roomId: number, userIds: number[]) => {
    await apiClient.post(joinAsPath(basePath, `${roomId}`, 'invite'), {
      userIds,
    });
  },
};
