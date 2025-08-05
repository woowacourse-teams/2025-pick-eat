import MemberList from '@domains/room/components/MemberList';
import SelectedMemberList from '@domains/room/components/SelectedMemberList';

import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import SearchBar from '@components/actions/SearchBar';
import ErrorMessage from '@components/errors/ErrorMessage';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import { useCreateRoom } from '@domains/room/hooks/useCreateRoom';
import { useFindMember } from '@domains/room/hooks/useFindMember';

import { User } from '@apis/users';

import styled from '@emotion/styled';
import { useState } from 'react';

function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [selectedMemberList, setSelectedMemberList] = useState<User[]>([]);

  const { createRoom, error } = useCreateRoom();

  const { nickName, handleInputChange, memberList, handleMemberClick } =
    useFindMember();

  const handleAddSelectedMember = (value: User) => {
    if (selectedMemberList.find(member => member.id === value.id)) {
      alert('이미 추가된 멤버입니다.');
      return;
    }
    setSelectedMemberList(prev => [...prev, value]);
  };

  const handleDeleteSelectedMember = (id: number) => {
    setSelectedMemberList(prev => prev.filter(member => member.id !== id));
  };

  return (
    <S.Container>
      <S.Title>방 만들기</S.Title>
      <S.Description>
        함께 식사할 멤버를 초대하여 방을 만들어봐요.
      </S.Description>

      <Input
        label="방 이름"
        placeholder="레전드 방"
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
      />

      <SearchBar
        label="멤버 초대"
        placeholder="아이디를 입력해주세요."
        value={nickName}
        onChange={e => handleInputChange(e.target.value)}
      >
        {memberList && (
          <MemberList
            memberList={memberList}
            onClick={value =>
              handleMemberClick(() => handleAddSelectedMember(value))
            }
          />
        )}
      </SearchBar>
      <SelectedMemberList
        memberList={selectedMemberList}
        onDelete={handleDeleteSelectedMember}
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
  Title: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  Description: styled.div`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
  `,

  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level7};

    padding: 0 ${({ theme }) => theme.PADDING.p7};
  `,
};
