import { User } from '@apis/users';

import styled from '@emotion/styled';

type Props = {
  memberList: User[];
  onClick: (value: User) => void;
};

function MemberList({ memberList, onClick }: Props) {
  return (
    <>
      {memberList.length > 0 ? (
        memberList.map(member => (
          <S.List key={member.id} onClick={() => onClick(member)}>
            {member.nickname}
          </S.List>
        ))
      ) : (
        <div>존재하는 닉네임이 없습니다.</div>
      )}
    </>
  );
}

export default MemberList;

const S = {
  List: styled.li`
    padding: ${({ theme }) => theme.PADDING.p4};

    &:hover {
      background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    }
  `,
};
