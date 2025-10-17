import InviteMember from '@domains/room/components/RoomDetailTab/InviteMember';

import FixedButton from '@components/actions/FixedButton';
import LineInput from '@components/actions/Input/LineInput';

import { useCreateRoom } from '@domains/room/hooks/useCreateRoom';
import { useInviteMember } from '@domains/room/hooks/useInviteMember';

import { sliceInputByMaxLength } from '@utils/sliceInputByMaxLength';

import styled from '@emotion/styled';
import { useState, useEffect, useRef, ChangeEvent } from 'react';

const MAX_LENGTH = 12;

function CreateRoom({ opened }: { opened: boolean }) {
  const [roomName, setRoomName] = useState('');
  const {
    selectedMemberList,
    handleAddSelectedMember,
    handleDeleteSelectedMember,
  } = useInviteMember();
  const { createRoom } = useCreateRoom();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(sliceInputByMaxLength(e.target.value, MAX_LENGTH));
  };

  const handleDelete = () => {
    setRoomName('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [opened]);

  return (
    <S.Container>
      <S.Title>방 만들기</S.Title>
      <LineInput
        ref={inputRef}
        value={roomName}
        onChange={handleChange}
        placeholder="레전드 방"
        label="방 이름"
        xIcon
        onClear={handleDelete}
        feedbackMessage={
          <span>
            {roomName.length}/{MAX_LENGTH}
          </span>
        }
      />

      <InviteMember
        selectedMemberList={selectedMemberList}
        onAddMember={handleAddSelectedMember}
        onDeleteMember={handleDeleteSelectedMember}
      />
      <FixedButton
        onClick={() => createRoom(roomName, selectedMemberList)}
        disabled={roomName.length === 0}
        type="submit"
      >
        {roomName.length === 0 ? '방 이름을 입력해 주세요.' : '방 만들기'}
      </FixedButton>
    </S.Container>
  );
}

export default CreateRoom;

const S = {
  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
  `,
  Title: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
};
