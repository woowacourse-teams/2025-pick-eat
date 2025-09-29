import { Room } from '@apis/room';

import styled from '@emotion/styled';
import { use } from 'react';

type Props = {
  roomData: Promise<Room | null>;
};

function RoomDetailName({ roomData }: Props) {
  const roomInfo = use(roomData);
  const name = roomInfo?.name ?? '방 이름 없음';
  return <S.Title>{name}</S.Title>;
}

export default RoomDetailName;

const S = {
  Title: styled.h2`
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
};
