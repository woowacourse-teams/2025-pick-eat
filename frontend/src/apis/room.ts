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

export const postRoom = async (data: CreateRoomFormData): Promise<string> => {
  const response = await apiClient.post<RoomResponse>(`rooms`, data);
  if (response) return response.code;
  return '';
};
