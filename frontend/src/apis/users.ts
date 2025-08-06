import { createQueryString, joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

export type UserResponse = {
  id: number;
  nickname: string;
  providerId: number;
  provider: string;
};

export type User = {
  id: number;
  nickname: string;
};

const convertResponseToUser = (data: UserResponse) => {
  return {
    id: data.id,
    nickname: data.nickname,
  };
};

export const convertResponseToUsers = (data: UserResponse[]) => {
  return data.map(d => ({
    id: d.id,
    nickname: d.nickname,
  }));
};

const basePath = 'users';

export const users = {
  get: async (): Promise<User | null> => {
    const response = await apiClient.get<UserResponse>(basePath);
    if (response) return convertResponseToUser(response);
    return null;
  },
  getMembers: async (nickname: string): Promise<User[]> => {
    const url = joinAsPath(basePath, 'search');
    const params = createQueryString({ nickname: nickname });
    const response = await apiClient.get<UserResponse[]>(`${url}${params}`);
    if (response) return convertResponseToUsers(response);
    return [];
  },
};
