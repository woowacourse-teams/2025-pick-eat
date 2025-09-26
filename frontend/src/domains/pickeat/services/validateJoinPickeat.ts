import { PickeatType } from '@apis/pickeat';

import { validate } from '@utils/validate';

type ValidateType = {
  nickname: string | undefined;
  pickeatDetail: PickeatType | undefined;
};

const ERROR_MESSAGE = {
  NICKNAME: '닉네임을 입력해 주세요.',
  DETAIL: '픽잇 정보가 존재하지 않습니다.',
};

export const validateJoinPickeat = ({
  nickname,
  pickeatDetail,
}: ValidateType) => {
  if (validate.isEmpty(nickname)) throw new Error(ERROR_MESSAGE.NICKNAME);
  if (validate.isEmpty(pickeatDetail)) throw new Error(ERROR_MESSAGE.DETAIL);
};
