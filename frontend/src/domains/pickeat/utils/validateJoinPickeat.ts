import { PickeatDetailType } from '@apis/pickeat';

type ValidateType = {
  nickName: string | undefined;
  pickeatDetail: PickeatDetailType | undefined;
};

const validateNickName = (nickName: string | undefined) => {
  if (!nickName) throw new Error('닉네임을 입력해주세요.');
};

const validatePickeatDetail = (
  pickeatDetail: PickeatDetailType | undefined
) => {
  if (!pickeatDetail) throw new Error('방 정보가 존재하지 않습니다.');
};

export const validateJoinPickeat = ({
  nickName,
  pickeatDetail,
}: ValidateType) => {
  validateNickName(nickName);
  validatePickeatDetail(pickeatDetail);
};
