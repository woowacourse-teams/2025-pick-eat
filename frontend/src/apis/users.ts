import { createQueryString, joinAsPath } from '@utils/createUrl';

import { apiClient, BASE_URL_VERSION } from './apiClient';

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

const BASE_PATH = 'users';

export const users = {
  get: async (): Promise<User | null> => {
    const path = joinAsPath(BASE_URL_VERSION[2], BASE_PATH);
    const response = await apiClient.get<UserResponse>(path);
    if (response) return convertResponseToUser(response);
    return null;
  },
  getMembers: async (nickname: string): Promise<User[]> => {
    const url = joinAsPath(BASE_URL_VERSION[2], BASE_PATH, 'search');
    const params = createQueryString({ nickname: nickname });
    const response = await apiClient.get<UserResponse[]>(`${url}${params}`);
    if (response) return convertResponseToUsers(response);
    return [];
  },
};
