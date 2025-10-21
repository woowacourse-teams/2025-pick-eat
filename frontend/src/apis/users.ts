import { createQueryString, joinAsPath } from '@utils/createUrl';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

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

const users = {
  get: async (): Promise<User> => {
    const path = joinAsPath(BASE_URL_VERSION[2], BASE_PATH);
    try {
      const response = await apiClient.get<UserResponse>(path);
      if (response) return convertResponseToUser(response);
      throw new Error('유저를 찾을 수 없습니다.');
    } catch {
      throw new Error('유저를 찾을 수 없습니다.');
    }
  },
  getMembers: async (nickname: string): Promise<User[]> => {
    const url = joinAsPath(BASE_URL_VERSION[2], BASE_PATH, 'search');
    const params = createQueryString({ nickname: nickname });
    const response = await apiClient.get<UserResponse[]>(`${url}${params}`);
    if (response) return convertResponseToUsers(response);
    return [];
  },
};

export const usersQuery = {
  useSuspenseGet: () => {
    return useSuspenseQuery({
      queryKey: [BASE_PATH],
      queryFn: async () => {
        try {
          return await users.get();
        } catch {
          // TODO : 현재는 user 정보에 에러 처리를 따로 해주는 곳이 없어
          // 빈 객체로 처리하고 있는데, try catch 역할을 하는 에러바운더리를 만들 때
          // default nickname 을 넣어주는 로직을 에러바운더리로 옮기면 어떨까합니다.
          return { id: -1, nickname: '' };
        }
      },
      retry: false,
    });
  },
  // useSuspenseQuery 로 하면 Suspense가 promise 를 감지하여 모달 뒷페이지도 리렌더링이 발생
  useGetMembers: (nickname: string, skipOnEmpty = true) => {
    return useQuery({
      queryKey: [BASE_PATH, 'search', nickname],
      queryFn: async () => {
        if (skipOnEmpty && !nickname) return null;
        return users.getMembers(nickname);
      },
    });
  },
};
