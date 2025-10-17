import Chip from '@components/labels/Chip';

import { User } from '@apis/users';

import { THEME } from '@styles/global';

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
          <S.Member key={member.id}>
            <S.Nickname>{member.nickname}</S.Nickname>
            <S.DeleteIcon onClick={() => onDelete(member.id)}>
              <Cross color={THEME.PALETTE.gray[0]} size="sm" strokeWidth={4} />
            </S.DeleteIcon>
          </S.Member>
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

  Member: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  EmptyDescription: styled.span`
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    text-align: center;
  `,

  Nickname: styled.span``,

  DeleteIcon: styled.div`
    width: 25px;
    height: 25px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 ${({ theme }) => theme.PADDING.p2};

    background-color: ${({ theme }) => theme.PALETTE.primary[60]};

    border-radius: ${({ theme }) => theme.RADIUS.half};
  `,
};
