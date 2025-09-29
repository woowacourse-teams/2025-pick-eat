import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';
import { PickeatResponse } from './pickeat';
import { convertResponseToUsers, User, UserResponse } from './users';

export type RoomResponse = {
  id: number;
  name: string;
  userCount: number;
  wishlistId: number;
};

export type Room = {
  id: number;
  name: string;
  memberCount: number;
  wishlistId: number;
};

export type ProgressPickeat = {
  id: number;
  code: string;
  name: string;
  participantCount: number;
  active: boolean;
};

const convertResponseToRoom = (data: RoomResponse) => {
  return {
    id: data.id,
    name: data.name,
    memberCount: data.userCount,
    wishlistId: data.wishlistId,
  };
};

const convertResponseToProgressPickeat = (data: PickeatResponse[]) => {
  return data.map(d => ({
    id: d.id,
    code: d.code,
    name: d.name,
    participantCount: d.participantCount,
    active: d.isActive,
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
  post: async (
    name: string
  ): Promise<Omit<Room, 'name' | 'memberCount'> | null> => {
    const response = await apiClient.post<Room>(basePath, { name });
    if (response)
      return {
        id: response.id,
        wishlistId: response.wishlistId,
      };
    return null;
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
  getPickeats: async (roomId: number): Promise<ProgressPickeat[]> => {
    const url = joinAsPath('room', `${roomId}`, 'pickeats', 'active');
    const response = await apiClient.get<PickeatResponse[]>(url);
    if (response) return convertResponseToProgressPickeat(response);
    return [];
  },
};
