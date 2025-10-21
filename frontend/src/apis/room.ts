import { useShowToast } from '@provider/ToastProvider';

import { joinAsPath } from '@utils/createUrl';

import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { apiClient, BASE_URL_VERSION } from './apiClient';
import { Pickeat, PickeatResponse } from './pickeat';
import { queryClient } from './queryClient';
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

// TODO: pickeat domain으로 이동할지 이야기 해보기
const convertResponseToProgressPickeat = (data: PickeatResponse[]) => {
  return data.map(d => ({
    id: d.id,
    code: d.code,
    name: d.name,
    participantCount: d.participantCount,
    active: d.isActive,
  }));
};

const BASE_PATH = 'rooms';

export const room = {
  get: async (roomId: number): Promise<Room | null> => {
    const response = await apiClient.get<RoomResponse>(
      joinAsPath(BASE_URL_VERSION[2], BASE_PATH, `${roomId}`)
    );
    if (response) return convertResponseToRoom(response);
    return null;
  },
  post: async (name: string): Promise<number | null> => {
    const response = await apiClient.post<Room>(
      joinAsPath(BASE_URL_VERSION[2], BASE_PATH),
      { name }
    );
    if (response) return response.id;
    return null;
  },
  postMember: async (roomId: number, userIds: number[]) => {
    await apiClient.post(
      joinAsPath(BASE_URL_VERSION[2], BASE_PATH, `${roomId}`, 'invite'),
      {
        userIds,
      }
    );
  },
  getIncludeMembers: async (roomId: number): Promise<User[]> => {
    const url = joinAsPath(
      BASE_URL_VERSION[2],
      BASE_PATH,
      `${roomId}`,
      'users'
    );
    const response = await apiClient.get<UserResponse[]>(url);
    if (response) return convertResponseToUsers(response);
    return [];
  },
  // TODO: pickeat domain으로 이동할지 이야기 해보기
  getProgressPickeats: async (roomId: number): Promise<Pickeat[]> => {
    const url = joinAsPath(
      BASE_URL_VERSION[1],
      'room',
      `${roomId}`,
      'pickeats',
      'active'
    );
    const response = await apiClient.get<PickeatResponse[]>(url);
    if (response) return convertResponseToProgressPickeat(response);
    return [];
  },
  exitRoom: async (roomId: number): Promise<void> => {
    const url = joinAsPath(BASE_URL_VERSION[2], BASE_PATH, `${roomId}`, 'exit');
    await apiClient.delete<void>(url);
  },
};

export const roomQuery = {
  useGet: (roomId: number) => {
    return useQuery({
      queryKey: ['room', roomId],
      queryFn: async () => {
        const showToast = useShowToast();
        try {
          const response = await room.get(roomId);
          if (!response) throw new Error('방 정보를 불러올 수 없습니다.');
          return response;
        } catch {
          showToast({
            mode: 'ERROR',
            message: '방 정보를 불러오는데 실패했습니다.',
          });
        }
      },
      throwOnError: false,
    });
  },
  usePost: (onCreate: () => void) => {
    const showToast = useShowToast();

    return useMutation({
      mutationFn: async ({
        name,
        userIds,
      }: {
        name: string;
        userIds: number[];
      }) => {
        const roomId = await room.post(name);
        return { roomId, userIds };
      },
      onSuccess: async ({ roomId, userIds }) => {
        if (roomId && userIds.length > 0) {
          try {
            await room.postMember(roomId, userIds);
          } catch {
            showToast({
              mode: 'WARN',
              message: '방 생성은 완료 되었지만, 초대 중 문제가 발생했습니다.',
            });
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
            onCreate();
            return;
          }
        }
        queryClient.invalidateQueries({ queryKey: ['rooms'] });
        showToast({
          mode: 'SUCCESS',
          message: '방 생성 완료!',
        });
        onCreate();
      },
      onError() {
        showToast({
          mode: 'ERROR',
          message: '방 생성 중 문제가 발생했습니다.',
        });
      },
    });
  },
  usePostMember: (roomId: number) => {
    const showToast = useShowToast();

    return useMutation({
      mutationFn: ({ userIds }: { userIds: number[] }) =>
        room.postMember(roomId, userIds),
      onSuccess() {
        showToast({
          mode: 'SUCCESS',
          message: '초대 성공!',
        });
        queryClient.invalidateQueries({ queryKey: ['includeMembers', roomId] });
      },
      onError() {
        showToast({
          mode: 'ERROR',
          message: '초대에 실패했습니다. 다시 시도해 주세요.',
        });
      },
    });
  },
  useGetIncludeMembers: (roomId: number) => {
    return useSuspenseQuery({
      queryKey: ['includeMembers', roomId],
      queryFn: async () => room.getIncludeMembers(roomId),
    });
  },
  // TODO: pickeat domain으로 이동할지 이야기 해보기
  useGetProgressPickeats: (roomId: number) => {
    return useSuspenseQuery({
      queryKey: ['progressPickeat', roomId],
      queryFn: async () => room.getProgressPickeats(roomId),
    });
  },
  useExitRoom: ({ onExit }: { onExit: () => void }) => {
    const showToast = useShowToast();

    return useMutation({
      mutationFn: async (roomId: number) => room.exitRoom(roomId),
      onSuccess() {
        showToast({
          mode: 'SUCCESS',
          message: '방을 탈퇴하였습니다.',
        });
        onExit();
        // rooms api 의 쿼리를 이렇게 상수화 안해도 되는걸까?
        queryClient.invalidateQueries({ queryKey: ['rooms'] });
      },
      onError() {
        showToast({
          mode: 'ERROR',
          message: '방 나가기 중 문제가 발생했습니다.',
        });
      },
    });
  },
};
