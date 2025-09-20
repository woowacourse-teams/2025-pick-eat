import { getLatLngByAddress } from '@domains/pickeat/utils/kakaoLocalAPI';

import { joinAsPath } from '@utils/createUrl';

import { apiClient, ApiError } from './apiClient';

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

const BASE_PATH = 'pickeats';

export const pickeat = {
  post: async (roomId: string, name: string): Promise<string> => {
    const url = roomId
      ? joinAsPath('rooms', roomId, BASE_PATH)
      : joinAsPath(BASE_PATH);
    const response = await apiClient.post<PickeatResponse>(url, {
      name,
    });
    if (response) return response.code;
    return '';
  },
  postWish: async (wishlistId: number, pickeatCode: string) => {
    const getUrl = joinAsPath(BASE_PATH, pickeatCode, 'restaurants', 'wish');
    await apiClient.post<PickeatResponse>(getUrl, {
      wishListId: wishlistId,
    });
  },
  postLocation: async (data: CreatePickeatFormData, pickeatCode: string) => {
    const coords = await getLatLngByAddress(data.address);
    if (!coords) throw new Error('INVALID_ADDRESS');
    const url = joinAsPath(BASE_PATH, pickeatCode, 'restaurants', 'location');
    await apiClient.post(url, {
      x: coords.x,
      y: coords.y,
      radius: data.radius,
    });
  },
  get: async (pickeatId: string) => {
    const url = joinAsPath(BASE_PATH, pickeatId);
    const response = await apiClient.get<PickeatResponse>(url);
    if (response) return await convertResponseToPickeatDetail(response);
    throw new Error('픽잇 정보가 존재하지 않습니다.');
  },
  postJoin: async (data: JoinPickeatFormData): Promise<string> => {
    const response = await apiClient.post<{ token: string }>(
      `participants`,
      data
    );
    return response?.token || '';
  },
  getParticipantsCount: async (
    pickeatCode: string
  ): Promise<ParticipantsResponse | null> => {
    const url = joinAsPath(BASE_PATH, pickeatCode, 'participants', 'state');
    const data = await apiClient.get<ParticipantsResponse>(url);

    return data ?? null;
  },
  getParticipating: async (): Promise<ParticipatingResponse | null> => {
    const url = joinAsPath(BASE_PATH, 'participating');
    try {
      const response = await apiClient.get<ParticipatingResponse>(url);
      if (response) return convertResponseToParticipating(response);
      return null;
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        return null;
      }
      throw e;
    }
  },
  getResult: async (pickeatCode: string): Promise<PickeatResult | null> => {
    const url = joinAsPath(BASE_PATH, pickeatCode, 'result');
    const response = await apiClient.get<PickeatResultResponse>(url);
    if (response) return convertResponseToResult(response);
    return null;
  },
  getPickeatState: async (
    pickeatCode: string
  ): Promise<PickeatStateResponse | null> => {
    const url = joinAsPath(BASE_PATH, pickeatCode, 'state');
    const response = await apiClient.get<PickeatStateResponse>(url);
    if (response) return response;
    return null;
  },
  postResult: async (pickeatCode: string): Promise<PickeatResult | null> => {
    const url = joinAsPath(BASE_PATH, pickeatCode, 'result');
    const response = await apiClient.post<PickeatResultResponse>(url);
    if (response) return convertResponseToResult(response);
    return null;
  },
  patchDeactive: async (pickeatCode: string) => {
    const url = joinAsPath(BASE_PATH, pickeatCode, 'deactive');
    await apiClient.patch(url);
    return null;
  },
};
