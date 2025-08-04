import MemberList from '@domains/room/components/MemberList';

import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import SearchBar from '@components/actions/SearchBar';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import styled from '@emotion/styled';
import { useState } from 'react';

const MOCK_DATA = [
  {
    id: 1,
    nickname: '머핀',
  },
  {
    id: 2,
    nickname: '카멜',
  },
  {
    id: 3,
    nickname: '수이',
  },
];

// TODO: 추 후 API로 이동될 타입
export type Member = {
  id: number;
  nickname: string;
};

function CreateRoom() {
  const [inviteMembers, setInviteMembers] = useState<Member[]>(MOCK_DATA);

  const handleAddMember = (member: Member) => {
    setInviteMembers(prev => [...prev, member]);
  };

  const handleDeleteMember = (id: number) => {
    setInviteMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <S.Container>
      <S.Title>방 만들기</S.Title>
      <S.Description>
        함께 식사할 멤버를 초대하여 방을 만들어봐요.
      </S.Description>

      <Input label="방 이름" placeholder="레전드 방" />
      {/* TODO: 검색시 해당하는 멤버리스트 children으로 전달 예정 */}
      <SearchBar label="멤버 초대" placeholder="아이디를 입력해주세요." />

      <MemberList members={inviteMembers} onDelete={handleDeleteMember} />
      <Button text="방 만들기" />
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
