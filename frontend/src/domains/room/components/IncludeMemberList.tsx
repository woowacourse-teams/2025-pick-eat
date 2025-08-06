import Button from '@components/actions/Button';
import People from '@components/assets/icons/People';

import { User } from '@apis/users';

import styled from '@emotion/styled';
import { use } from 'react';

function IncludeMemberList({ members }: { members: Promise<User[]> }) {
  const memberList = use(members);
  return (
    <S.Container>
      <S.TitleArea>
        <S.Description>
          <People size="sm" />
          멤버({memberList.length})
        </S.Description>
        {/* TODO: 수이가 만든 모달창으로 초대 모달 띄우기, 아이콘 추가 */}
        <Button text="초대" size="sm" color="secondary" />
      </S.TitleArea>
      <S.List>
        {memberList.map(member => (
          <S.Member key={member.id}>{member.nickname}</S.Member>
        ))}
      </S.List>
    </S.Container>
  );
}
export default IncludeMemberList;

const S = {
  Container: styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,

  TitleArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Description: styled.span`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    font: ${({ theme }) => theme.FONTS.heading.small};
  `,

  List: styled.ul``,

  Member: styled.li`
    padding: ${({ theme }) => theme.PADDING.p3};
  `,
};
