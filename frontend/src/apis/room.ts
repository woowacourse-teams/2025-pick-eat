import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';
import { PickeatResponse } from './pickeat';
import { convertResponseToUsers, User, UserResponse } from './users';

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

const convertResponseToProgressPickeat = (data: PickeatResponse[]) => {
  return data.map(d => ({
    id: d.id,
    code: d.code,
    name: d.name,
    participantCount: d.participantCount,
    isActive: d.isActive,
  }));
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
  getIncludeMembers: async (roomId: number): Promise<User[]> => {
    const url = joinAsPath(basePath, `${roomId}`, 'users');
    const response = await apiClient.get<UserResponse[]>(url);
    if (response) return convertResponseToUsers(response);
    return [];
  },
  getPickeats: async (roomId: number): Promise<PickeatResponse[]> => {
    const url = joinAsPath('room', `${roomId}`, 'pickeats', 'active');
    const response = await apiClient.get<PickeatResponse[]>(url);
    if (response) return convertResponseToProgressPickeat(response);
    return [];
  },
};
