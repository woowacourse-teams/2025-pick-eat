import InviteMember from '@domains/room/components/RoomDetailTab/InviteMember';

import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import ErrorMessage from '@components/errors/ErrorMessage';
import { HEADER_HEIGHT } from 'widgets/Header';

import { useCreateRoom } from '@domains/room/hooks/useCreateRoom';
import { useInviteMember } from '@domains/room/hooks/useInviteMember';

import styled from '@emotion/styled';
import { useState } from 'react';

function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const {
    selectedMemberList,
    handleAddSelectedMember,
    handleDeleteSelectedMember,
  } = useInviteMember();
  const { createRoom, error } = useCreateRoom();

  return (
    <S.Container>
      <S.TitlePointText>방 만들기</S.TitlePointText>
      <S.Description>
        함께 식사할 멤버를 초대하여 방을 만들어봐요.
      </S.Description>

      <Input
        label="방 이름"
        placeholder="레전드 방"
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
      />

      <InviteMember
        selectedMemberList={selectedMemberList}
        onAddMember={handleAddSelectedMember}
        onDeleteMember={handleDeleteSelectedMember}
      />

      <ErrorMessage message={error} />
      <Button
        text="방 만들기"
        onClick={() => createRoom(roomName, selectedMemberList)}
      />
    </S.Container>
  );
}

export default CreateRoom;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level7};

    padding: 0 ${({ theme }) => theme.PADDING.p7};
  `,

  TitlePointText: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  Description: styled.div`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
  `,
};
