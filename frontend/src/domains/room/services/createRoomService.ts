import { postRoom } from '@apis/room';

import { getLatLngByAddress } from '../utils/convertAddress';

type RoomInput = {
  name: string;
  location: string;
  radius: number;
};

export const createRoomService = async ({
  name,
  location,
  radius,
}: RoomInput): Promise<string> => {
  const coords = await getLatLngByAddress(location);
  if (!coords) throw new Error('INVALID_LOCATION');

  const code = await postRoom({
    name,
    x: coords.x,
    y: coords.y,
    radius,
  });

  return code;
};
