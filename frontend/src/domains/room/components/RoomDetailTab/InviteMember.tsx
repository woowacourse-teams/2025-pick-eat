import SearchBar from '@components/actions/SearchBar/SearchBar';

import { useFindMember } from '@domains/room/hooks/useFindMember';

import { User } from '@apis/users';

import styled from '@emotion/styled';

import MemberList from './MemberList';
import SelectedMemberList from './SelectedMemberList';

type Props = {
  selectedMemberList: User[];
  onAddMember: (value: User) => void;
  onDeleteMember: (id: number) => void;
};

function InviteMember({
  selectedMemberList,
  onAddMember,
  onDeleteMember,
}: Props) {
  const { nickname, handleInputChange, memberList, handleMemberClick } =
    useFindMember();

  return (
    <S.Container>
      <SearchBar
        label="멤버 초대"
        placeholder="아이디를 입력해 주세요."
        value={nickname}
        onChange={e => handleInputChange(e.target.value)}
      >
        {memberList && (
          <MemberList
            memberList={memberList}
            onClick={value => handleMemberClick(() => onAddMember(value))}
          />
        )}
      </SearchBar>
      <SelectedMemberList
        memberList={selectedMemberList}
        onDelete={onDeleteMember}
      />
    </S.Container>
  );
}

export default InviteMember;

const S = {
  Container: styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
};
