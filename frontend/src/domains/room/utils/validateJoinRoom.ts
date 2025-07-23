import { RoomDetailType } from '@apis/room';

type ValidateType = {
  nickName: string | undefined;
  roomDetail: RoomDetailType | undefined;
};

const validateNickName = (nickName: string | undefined) => {
  if (!nickName) throw new Error('닉네임을 입력해주세요.');
};

const validateRoomDetail = (roomDetail: RoomDetailType | undefined) => {
  if (!roomDetail) throw new Error('방 정보가 존재하지 않습니다.');
};

export const validateJoinRoom = ({ nickName, roomDetail }: ValidateType) => {
  validateNickName(nickName);
  validateRoomDetail(roomDetail);
};
