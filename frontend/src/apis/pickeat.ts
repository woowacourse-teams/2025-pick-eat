import { joinCode } from '@domains/pickeat/utils/joinStorage';
import { getLatLngByAddress } from '@domains/pickeat/utils/kakaoLocalAPI';

import { generateRouterPath, ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { joinAsPath } from '@utils/createUrl';

import { useSuspenseQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { apiClient, ApiError, BASE_URL_VERSION } from './apiClient';

export type PickeatType = {
  id: number;
  name: string;
  code: string;
};

export type PickeatResponse = {
  id: number;
  code: string;
  name: string;
  participantCount: number;
  isActive: boolean;
};

export type Pickeat = {
  id: number;
  code: string;
  name: string;
  participantCount: number;
  active: boolean;
};

type CreatePickeatFormData = {
  address: string;
  radius: number;
};

type JoinPickeatFormData = {
  nickname: string;
  pickeatId: number;
};

type ParticipantsResponse = {
  totalParticipants: number;
  eliminatedParticipants: number;
};

type ParticipatingResponse = {
  id: number;
  code: string;
  name: string;
  participantCount: number;
  isActive: boolean;
};

export type Participating = {
  id: number;
  code: string;
  name: string;
  participantCount: number;
  isActive: boolean;
};

export type ParticipantState = {
  id: number;
  nickname: string;
  isCompleted: boolean;
};

export type ParticipantsState = {
  totalParticipants: number;
  participants: ParticipantState[];
};

type PickeatResultResponse = {
  id: number;
  name: string;
  category: string;
  tags: string[];
  distance: number;
  placeUrl: string;
  roadAddressName: string;
  likeCount: number;
  x: number;
  y: number;
  pictureUrls: string[];
  type: 'WISH' | 'LOCATION';
  hasEqualLike: boolean;
};

export type PickeatResult = {
  id: number;
  name: string;
  category: string;
  tags: string[];
  distance: number;
  placeUrl: string | null;
  roadAddressName: string;
  likeCount: number;
  x: number;
  y: number;
  pictureUrls: string[];
  type: 'WISH' | 'LOCATION';
  hasEqualLike: boolean;
};

export type PickeatStateResponse = {
  isActive: boolean;
};

const convertResponseToPickeatDetail = async (
  data: PickeatResponse
): Promise<PickeatType> => ({
  id: data.id,
  name: data.name,
  code: data.code,
});

const convertResponseToResult = async (
  data: PickeatResultResponse
): Promise<PickeatResult> => ({
  id: data.id,
  name: data.name,
  category: data.category,
  tags: data.tags,
  distance: data.distance,
  placeUrl: data.placeUrl,
  roadAddressName: data.roadAddressName,
  likeCount: data.likeCount,
  x: data.x,
  y: data.y,
  pictureUrls: data.pictureUrls,
  type: data.type,
  hasEqualLike: data.hasEqualLike,
});

const convertResponseToParticipating = async (
  data: ParticipatingResponse
): Promise<Participating> => ({
  id: data.id,
  code: data.code,
  name: data.name,
  participantCount: data.participantCount,
  isActive: data.isActive,
});

const convertResponseToParticipantsState = async (
  data: ParticipantsState
): Promise<ParticipantsState> => ({
  totalParticipants: data.totalParticipants,
  participants: data.participants.map(participant => ({
    id: participant.id,
    nickname: participant.nickname,
    isCompleted: participant.isCompleted,
  })),
});

const convertResponseToReJoin = async (data: { isAvailable: boolean }) =>
  data.isAvailable;

const BASE_PATH = 'pickeats';

export const pickeat = {
  post: async (roomId: number, name: string): Promise<string> => {
    const url = roomId
      ? joinAsPath(BASE_URL_VERSION[1], 'rooms', `${roomId}`, BASE_PATH)
      : joinAsPath(BASE_URL_VERSION[1], BASE_PATH);
    const response = await apiClient.post<PickeatResponse>(url, {
      name,
    });
    if (response) return response.code;
    return '';
  },
  postWish: async (roomId: number, pickeatCode: string) => {
    const getUrl = joinAsPath(
      BASE_URL_VERSION[2],
      BASE_PATH,
      pickeatCode,
      'restaurants',
      'wish'
    );
    await apiClient.post<PickeatResponse>(getUrl, {
      roomId: roomId,
    });
  },
  postLocation: async (data: CreatePickeatFormData, pickeatCode: string) => {
    const coords = await getLatLngByAddress(data.address);
    if (!coords) throw new Error('INVALID_ADDRESS');
    const url = joinAsPath(
      BASE_URL_VERSION[2],
      BASE_PATH,
      pickeatCode,
      'restaurants',
      'location'
    );
    await apiClient.post(url, {
      x: coords.x,
      y: coords.y,
      radius: data.radius,
    });
  },
  postTemplate: async ({
    pickeatCode,
    templateId,
  }: {
    pickeatCode: string;
    templateId: number;
  }) => {
    const url = joinAsPath(
      BASE_URL_VERSION[2],
      BASE_PATH,
      pickeatCode,
      'restaurants',
      'template'
    );
    await apiClient.post<PickeatResponse>(url, { templateId });
  },
  get: async (pickeatId: string) => {
    const url = joinAsPath(BASE_URL_VERSION[1], BASE_PATH, pickeatId);
    const response = await apiClient.get<PickeatResponse>(url);
    if (response) return await convertResponseToPickeatDetail(response);
    throw new Error('픽잇 정보가 존재하지 않습니다.');
  },
  postJoin: async (data: JoinPickeatFormData): Promise<string> => {
    const url = joinAsPath(BASE_URL_VERSION[1], 'participants');
    const response = await apiClient.post<{ token: string }>(url, data);
    return response?.token || '';
  },
  getParticipantsCount: async (
    pickeatCode: string
  ): Promise<ParticipantsResponse | null> => {
    const url = joinAsPath(
      BASE_URL_VERSION[1],
      BASE_PATH,
      pickeatCode,
      'participants',
      'state'
    );
    const data = await apiClient.get<ParticipantsResponse>(url);

    return data ?? null;
  },
  getParticipating: async (): Promise<ParticipatingResponse | null> => {
    const url = joinAsPath(BASE_URL_VERSION[1], BASE_PATH, 'participating');
    try {
      const response = await apiClient.get<ParticipatingResponse>(url);
      if (response) return convertResponseToParticipating(response);
      return null;
    } catch (e) {
      if (e instanceof ApiError && (e.status === 401 || e.status === 400)) {
        return null;
      }
      throw e;
    }
  },
  getParticipantsState: async (
    pickeatCode: string
  ): Promise<ParticipantsState> => {
    const url = joinAsPath(
      BASE_URL_VERSION[1],
      BASE_PATH,
      pickeatCode,
      'participants',
      'state'
    );
    const response = await apiClient.get<ParticipantsState>(url);
    if (response) return convertResponseToParticipantsState(response);
    return { totalParticipants: 0, participants: [] };
  },
  getResult: async (pickeatCode: string): Promise<PickeatResult | null> => {
    const url = joinAsPath(
      BASE_URL_VERSION[1],
      BASE_PATH,
      pickeatCode,
      'result'
    );
    const response = await apiClient.get<PickeatResultResponse>(url);
    if (response) return convertResponseToResult(response);
    return null;
  },
  getPickeatState: async (
    pickeatCode: string
  ): Promise<PickeatStateResponse | null> => {
    const url = joinAsPath(
      BASE_URL_VERSION[1],
      BASE_PATH,
      pickeatCode,
      'state'
    );
    const response = await apiClient.get<PickeatStateResponse>(url);
    if (response) return response;
    return null;
  },
  getRejoin: async (pickeatCode: string): Promise<boolean> => {
    const url = joinAsPath(
      BASE_URL_VERSION[1],
      BASE_PATH,
      pickeatCode,
      'rejoin-available'
    );
    const response = await apiClient.get<{ isAvailable: boolean }>(url);
    if (response) return convertResponseToReJoin(response);
    return false;
  },
  postResult: async (pickeatCode: string): Promise<PickeatResult | null> => {
    const url = joinAsPath(
      BASE_URL_VERSION[1],
      BASE_PATH,
      pickeatCode,
      'result'
    );
    const response = await apiClient.post<PickeatResultResponse>(url);
    if (response) return convertResponseToResult(response);
    return null;
  },
  patchDeactive: async (pickeatCode: string) => {
    const url = joinAsPath(
      BASE_URL_VERSION[1],
      BASE_PATH,
      pickeatCode,
      'deactive'
    );
    await apiClient.patch(url);
    return null;
  },
};

export const pickeatQuery = {
  useGetResult: (pickeatCode: string) => {
    const showToast = useShowToast();
    const navigate = useNavigate();

    return useSuspenseQuery({
      queryKey: [BASE_PATH, 'result', pickeatCode],
      queryFn: async () => {
        try {
          const delay = new Promise(resolve => setTimeout(resolve, 2500));
          const actual = pickeat.getResult(pickeatCode);
          const [result] = await Promise.all([actual, delay]);

          if (!result) {
            throw new Error('투표 결과가 없습니다.');
          }

          return result;
        } catch (e) {
          if (e instanceof ApiError && e.status === 401) {
            showToast({
              mode: 'ERROR',
              message: '해당 픽잇에 접근할 수 없습니다.',
            });
            navigate(ROUTE_PATH.MAIN);
          } else {
            showToast({
              mode: 'ERROR',
              message: '투표 결과를 불러오지 못했습니다!',
            });
          }

          throw e;
        }
      },
      staleTime: 1000 * 60 * 60 * 24, // 24시간
      gcTime: 1000 * 60 * 60 * 24,
    });
  },

  useGet: (pickeatId: string) => {
    return (async () => {
      const result = await pickeat.get(pickeatId);
      if (!result) throw new Error('픽잇 정보가 존재하지 않습니다.');
      return result;
    })();
  },
  usePostPickeat: () =>
    useMutation({
      mutationFn: ({ roomId, name }: { roomId: number; name: string }) =>
        pickeat.post(roomId, name),
    }),

  usePostLocation: () =>
    useMutation({
      mutationFn: ({
        address,
        radius,
        pickeatCode,
      }: {
        address: string;
        radius: number;
        pickeatCode: string;
      }) => pickeat.postLocation({ address, radius }, pickeatCode),
    }),

  usePostWish: () => {
    const navigate = useNavigate();
    const showToast = useShowToast();

    return useMutation({
      mutationFn: async ({
        roomId,
        pickeatCode,
      }: {
        roomId: number;
        pickeatCode: string;
      }) => {
        await pickeat.postWish(roomId, pickeatCode);
        return pickeatCode;
      },
      onSuccess: (pickeatCode: string) => {
        navigate(generateRouterPath.pickeatDetail(pickeatCode));
      },
      onError: () => {
        showToast({
          mode: 'ERROR',
          message: '즐겨찾기에 식당을 추가했는지 확인해 주세요!',
        });
      },
    });
  },

  usePostTemplate: () => {
    const navigate = useNavigate();
    const showToast = useShowToast();

    return useMutation({
      mutationFn: async ({
        pickeatCode,
        templateId,
      }: {
        pickeatCode: string;
        templateId: number;
      }) => {
        await pickeat.postTemplate({ pickeatCode, templateId });
        return pickeatCode;
      },
      onSuccess: (pickeatCode: string) => {
        navigate(generateRouterPath.pickeatDetail(pickeatCode));
      },
      onError: (error: unknown) => {
        console.error('템플릿 설정 실패', error);
        showToast({
          mode: 'ERROR',
          message:
            error instanceof Error
              ? error.message
              : '투표 생성에 실패했습니다. 다시 시도해 주세요.',
        });
      },
    });
  },

  usePostJoin: () => {
    const navigate = useNavigate();

    return useMutation({
      mutationFn: async ({
        nickname,
        pickeatId,
        pickeatCode,
      }: {
        nickname: string;
        pickeatId: number;
        pickeatCode: string;
      }) => {
        const token = await pickeat.postJoin({ nickname, pickeatId });
        return { token, pickeatCode };
      },
      onSuccess: ({ token, pickeatCode }) => {
        joinCode.save(token);
        navigate(generateRouterPath.restaurantsExclude(pickeatCode));
      },
      onError: error => {
        console.error('픽잇 참가 실패:', error);
      },
    });
  },

  useParticipantCount: (pickeatCode: string) => {
    const { data } = useQuery({
      queryKey: [BASE_PATH, 'participants', pickeatCode],
      queryFn: async () => {
        const response = await pickeat.getParticipantsCount(pickeatCode);
        return response ?? { totalParticipants: 0, eliminatedParticipants: 0 };
      },
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
      staleTime: 0,
    });

    return {
      participant: data ?? { totalParticipants: 0, eliminatedParticipants: 0 },
    };
  },

  useGetParticipating: () => {
    return useSuspenseQuery({
      queryKey: ['participatingPickeat'],
      queryFn: async () => pickeat.getParticipating(),
    });
  },

  useParticipantsState: (pickeatCode: string) => {
    const showToast = useShowToast();

    const {
      data: participantsState = { totalParticipants: 0, participants: [] },
      error,
    } = useQuery<ParticipantsState>({
      queryKey: [BASE_PATH, 'participants-state', pickeatCode],
      queryFn: async () => {
        const data = await pickeat.getParticipantsState(pickeatCode);
        return data;
      },
      refetchInterval: 3000,
      refetchOnWindowFocus: false,
      staleTime: 0,
    });

    if (error instanceof Error) {
      showToast({
        mode: 'ERROR',
        message: `${error.message}: 참가자 정보를 불러오지 못했습니다.`,
      });
    }

    return { participantsState };
  },
  useGetPickeatState: (pickeatCode: string) => {
    const navigate = useNavigate();
    const showToast = useShowToast();

    return useQuery({
      queryKey: [BASE_PATH, 'state', pickeatCode],
      queryFn: async () => {
        try {
          const response = await pickeat.getPickeatState(pickeatCode);

          return response ?? { isActive: true };
        } catch (e) {
          if (e instanceof ApiError && e.message === 'PICKEAT_NOT_FOUND') {
            showToast({ mode: 'ERROR', message: '해당 픽잇이 종료되었습니다' });
            navigate(ROUTE_PATH.MAIN);
          }
        }
      },
      refetchInterval: 3000,
    });
  },
  useRejoin: (pickeatCode: string) => {
    const navigate = useNavigate();
    const showToast = useShowToast();
    return useQuery({
      queryKey: [BASE_PATH, 'rejoin', pickeatCode],
      queryFn: async () => {
        try {
          const isAvailable = await pickeat.getRejoin(pickeatCode);
          if (!isAvailable) {
            navigate(generateRouterPath.pickeatDetail(pickeatCode));
            return;
          }
          navigate(generateRouterPath.restaurantsExclude(pickeatCode));
        } catch (e) {
          if (e instanceof ApiError) {
            if (e.status === 401) {
              navigate(generateRouterPath.pickeatDetail(pickeatCode));
              console.error('Rejoin error:', e.message);
            } else {
              navigate(ROUTE_PATH.MAIN);
              showToast({
                mode: 'ERROR',
                message:
                  '픽잇 재참여 중 알 수 없는 오류가 발생했습니다. 메인 화면으로 이동합니다.',
              });
            }
          }
        }
      },
      retry: false,
      throwOnError: false,
    });
  },

  usePostResult: () => {
    const showToast = useShowToast();
    const navigate = useNavigate();

    return useMutation({
      mutationFn: async (pickeatCode: string) => {
        const response = await pickeat.postResult(pickeatCode);

        return response;
      },
      onSuccess: (_data, pickeatCode) => {
        navigate(generateRouterPath.matchResult(pickeatCode));
      },
      onError: error => {
        console.error('투표 결과 생성 실패', error);
        showToast({
          mode: 'ERROR',
          message: '픽잇 결과를 가져오는 데 실패했습니다.',
        });
      },
    });
  },

  usePatchDeactive: () => {
    const showToast = useShowToast();

    return useMutation({
      mutationFn: async (pickeatCode: string) => {
        await pickeat.patchDeactive(pickeatCode);
      },
      onError: error => {
        console.error('픽잇 종료 실패', error);
        showToast({
          mode: 'ERROR',
          message:
            error instanceof Error
              ? error.message
              : '픽잇을 종료를 실패했습니다.',
        });
      },
    });
  },
};
