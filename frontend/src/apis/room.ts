import { getAddressByLatLng } from '@domains/room/utils/convertAddress';

import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

export type RoomResponse = {
  id: number;
  name: string;
  isActive: boolean;
  code: string;
  x: number;
  y: number;
  radius: number;
  participantCount: number;
};

export type RoomDetailType = {
  id: number;
  name: string;
  code: string;
  radius: number;
  location: string | null;
};

type CreateRoomFormData = {
  name: string;
  x: number;
  y: number;
  radius: number;
};

type JoinRoomFormData = {
  nickname: string;
  roomId: number;
};

type JoinRoomResponse = {
  id: number;
  nickname: string;
  roomCode: string;
};

const convertResponseToRoomDetail = async (
  data: RoomResponse
): Promise<RoomDetailType> => ({
  id: data.id,
  name: data.name,
  code: data.code,
  radius: data.radius,
  location: await getAddressByLatLng(data.x, data.y),
});

export const postRoom = async (data: CreateRoomFormData): Promise<string> => {
  const response = await apiClient.post<RoomResponse>(`rooms`, data);
  if (response) return response.code;
  return '';
};

export const getRoom = async (roomId: string) => {
  const getUrl = joinAsPath('rooms', roomId);
  const response = await apiClient.get<RoomResponse>(getUrl);
  if (response) return await convertResponseToRoomDetail(response);
  throw new Error('방 정보가 존재하지 않습니다.');
};

export const postJoinRoom = async (data: JoinRoomFormData) => {
  await apiClient.post<JoinRoomResponse>(`participants`, data);
};
