import Chip from '@components/labels/Chip';

import { User } from '@apis/users';

import styled from '@emotion/styled';

type Props = {
  memberList: User[];
  onDelete: (id: number) => void;
};

function SelectedMemberList({ memberList, onDelete }: Props) {
  return (
    <S.MemberContainer>
      {memberList.length > 0 ? (
        memberList.map(member => (
          <Chip
            key={member.id}
            removeButton
            onRemove={() => onDelete(member.id)}
          >
            {member.nickname}
          </Chip>
        ))
      ) : (
        <S.EmptyDescription>멤버를 초대해 보세요!</S.EmptyDescription>
      )}
    </S.MemberContainer>
  );
}

export default SelectedMemberList;

const S = {
  MemberContainer: styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level4} ${({ theme }) => theme.GAP.level3};
  `,
  EmptyDescription: styled.span`
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    text-align: center;
  `,
};
