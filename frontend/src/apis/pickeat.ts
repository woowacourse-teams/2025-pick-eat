import {
  getAddressByLatLng,
  getLatLngByAddress,
} from '@domains/pickeat/utils/convertAddress';

import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';
import { RestaurantResponse } from './restaurant';

export type PickeatResponse = {
  id: number;
  name: string;
  isActive: boolean;
  code: string;
  x: number;
  y: number;
  radius: number;
  participantCount: number;
};

export type PickeatDetailType = {
  id: number;
  name: string;
  code: string;
  radius: number;
  location: string | null;
};

type CreatePickeatFormData = {
  name: string;
  address: string;
  radius: number;
};

type JoinPickeatFormData = {
  nickname: string;
  roomId: number;
};

type JoinPickeatResponse = {
  id: number;
  nickname: string;
  roomCode: string;
};

type ParticipantsResponse = {
  totalParticipants: number;
  eliminatedParticipants: number;
};

const convertResponseToPickeatDetail = async (
  data: PickeatResponse
): Promise<PickeatDetailType> => ({
  id: data.id,
  name: data.name,
  code: data.code,
  radius: data.radius,
  location: await getAddressByLatLng(data.x, data.y),
});

const basePath = 'rooms';

export const pickeat = {
  post: async (data: CreatePickeatFormData): Promise<string> => {
    const coords = await getLatLngByAddress(data.address);
    if (!coords) throw new Error('INVALID_ADDRESS');
    const response = await apiClient.post<PickeatResponse>(basePath, {
      name: data.name,
      x: coords.x,
      y: coords.y,
      radius: data.radius,
    });
    if (response) return response.code;
    return '';
  },

  get: async (roomId: string) => {
    const getUrl = joinAsPath(basePath, roomId);
    const response = await apiClient.get<PickeatResponse>(getUrl);
    if (response) return await convertResponseToPickeatDetail(response);
    throw new Error('방 정보가 존재하지 않습니다.');
  },

  postJoin: async (data: JoinPickeatFormData) => {
    await apiClient.post<JoinPickeatResponse>(`participants`, data);
  },

  getParticipantsCount: async (
    roomCode: string
  ): Promise<ParticipantsResponse | null> => {
    const getUrl = joinAsPath(basePath, roomCode, 'participants', 'state');
    const data = await apiClient.get<ParticipantsResponse>(getUrl);

    return data ?? null;
  },

  getResult: async (roomCode: string): Promise<RestaurantResponse[] | null> => {
    const getUrl = joinAsPath(basePath, roomCode, 'result');
    const response = await apiClient.get<RestaurantResponse[]>(`${getUrl}`);
    return response ?? null;
  },
};
