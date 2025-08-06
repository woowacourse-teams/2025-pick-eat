import { getLatLngByAddress } from '@domains/pickeat/utils/convertAddress';

import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';
import { convertResponseToRestaurant, RestaurantResponse } from './restaurant';
import { Restaurant } from './restaurant';

export type PickeatResponse = {
  id: number;
  name: string;
  code: string;
  radius: number;
  location: string | null;
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
  pickeatId: number;
};

type JoinPickeatResponse = {
  token: string;
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
  location: data.location,
});

const basePath = 'pickeats';

export const pickeat = {
  postPickeat: async (roomId: string, name: string): Promise<string> => {
    const getUrl = roomId
      ? joinAsPath('rooms', roomId, 'pickeats')
      : joinAsPath('pickeats');
    const response = await apiClient.post<PickeatResponse>(getUrl, {
      name,
    });
    if (response) return response.code;
    return '';
  },

  postWish: async (wishlistId: number, pickeatCode: string) => {
    console.log(wishlistId);
    const getUrl = joinAsPath(basePath, pickeatCode, 'restaurants', 'wish');
    await apiClient.post<PickeatResponse>(getUrl, {
      wishListId: wishlistId,
    });
  },

  postLocation: async (data: CreatePickeatFormData, pickeatCode: string) => {
    const coords = await getLatLngByAddress(data.address);
    if (!coords) throw new Error('INVALID_ADDRESS');
    const getUrl = joinAsPath(basePath, pickeatCode, 'restaurants', 'location');
    await apiClient.post<PickeatResponse>(getUrl, {
      x: coords.x,
      y: coords.y,
      radius: data.radius,
    });
  },
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

  get: async (pickeatId: string) => {
    const getUrl = joinAsPath(basePath, pickeatId);
    const response = await apiClient.get<PickeatResponse>(getUrl);
    if (response) return await convertResponseToPickeatDetail(response);
    throw new Error('방 정보가 존재하지 않습니다.');
  },

  postJoin: async (data: JoinPickeatFormData) => {
    const response = await apiClient.post<JoinPickeatResponse>(
      `participants`,
      data
    );

    return response;
  },

  getParticipantsCount: async (
    pickeatCode: string
  ): Promise<ParticipantsResponse | null> => {
    const getUrl = joinAsPath(basePath, pickeatCode, 'participants', 'state');
    const data = await apiClient.get<ParticipantsResponse>(getUrl);

    return data ?? null;
  },

  getResult: async (pickeatCode: string): Promise<Restaurant[]> => {
    const getUrl = joinAsPath(basePath, pickeatCode, 'result');
    const response = await apiClient.get<RestaurantResponse[]>(`${getUrl}`);
    const results = (response ?? []).map(restaurant =>
      convertResponseToRestaurant(restaurant)
    );
    return results;
  },
};
