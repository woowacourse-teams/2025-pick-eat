import { useAuth } from '@domains/login/context/AuthProvider';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { joinAsPath } from '@utils/createUrl';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { apiClient, ApiError, BASE_URL_VERSION } from './apiClient';
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
  useSuspenseGet: () => {
    const showToast = useShowToast();
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    return useSuspenseQuery({
      queryKey: [BASE_PATH],
      queryFn: async () => {
        try {
          return await rooms.get();
        } catch (e) {
          if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
            showToast({
              mode: 'WARN',
              message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
            });
            logoutUser();
            navigate(ROUTE_PATH.LOGIN);
          } else {
            showToast({
              mode: 'WARN',
              message: '로그인이 필요합니다.',
            });
          }
          return [];
        }
      },
    });
  },
};
