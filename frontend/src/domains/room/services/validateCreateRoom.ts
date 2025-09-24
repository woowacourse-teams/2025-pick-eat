import { validate } from '@utils/validate';

const ERROR_MESSAGE = {
  NAME: '방 이름을 입력해 주세요.',
};

export const validateCreateRoom = (roomName: string | undefined) => {
  if (validate.isEmpty(roomName)) throw new Error(ERROR_MESSAGE.NAME);
};
