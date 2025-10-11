import LineSearchBar from '@components/actions/SearchBar/LineSearchBar';

import { useFindMember } from '@domains/room/hooks/useFindMember';

import { User } from '@apis/users';

import styled from '@emotion/styled';
import { useRef } from 'react';

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
  const {
    nickname,
    handleInputChange,
    memberList,
    handleMemberClick,
    handleCInputClear,
  } = useFindMember();
  const inviteRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <S.SearchBarWrapper>
        <LineSearchBar
          ref={inviteRef}
          label="멤버 초대"
          xIcon
          placeholder="아이디를 입력해 주세요."
          value={nickname}
          onChange={e => handleInputChange(e.target.value)}
          onClear={handleCInputClear}
        />
        {memberList && (
          <MemberList
            memberList={memberList}
            onClick={value => handleMemberClick(() => onAddMember(value))}
            searchKeyword={nickname}
          />
        )}
      </S.SearchBarWrapper>

      <SelectedMemberList
        memberList={selectedMemberList}
        onDelete={onDeleteMember}
      />
    </>
  );
}

export default InviteMember;

const S = {
  SearchBarWrapper: styled.div`
    position: relative;
  `,
};
