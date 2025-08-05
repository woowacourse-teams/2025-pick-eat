import { PickeatDetailType } from '@apis/pickeat';

import { validate } from '@utils/validate';

type ValidateType = {
  nickName: string | undefined;
  pickeatDetail: PickeatDetailType | undefined;
};

const ERROR_MESSAGE = {
  NICKNAME: '닉네임을 입력해주세요.',
  DETAIL: '픽잇 정보가 존재하지 않습니다.',
};

export const validateJoinPickeat = ({
  nickName,
  pickeatDetail,
}: ValidateType) => {
  if (validate.isEmpty(nickName)) throw new Error(ERROR_MESSAGE.NICKNAME);
  if (validate.isEmpty(pickeatDetail)) throw new Error(ERROR_MESSAGE.DETAIL);
};
