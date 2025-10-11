import { User } from '@apis/users';

import styled from '@emotion/styled';

import HighlightText from './HighlightText';

type Props = {
  memberList: User[];
  onClick: (value: User) => void;
  searchKeyword: string;
};

function MemberList({ memberList, onClick, searchKeyword }: Props) {
  return (
    <S.Container>
      {memberList.length > 0 ? (
        memberList.map(member => (
          <S.List key={member.id} onClick={() => onClick(member)}>
            <HighlightText
              text={member.nickname}
              searchKeyword={searchKeyword}
            />
          </S.List>
        ))
      ) : (
        <div>존재하는 닉네임이 없습니다.</div>
      )}
    </S.Container>
  );
}

export default MemberList;

const S = {
  Container: styled.ul`
    width: 100%;
    position: absolute;

    top: 100%;
    left: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.dropdown};

    margin-top: 4px;
    padding: ${({ theme }) => theme.PADDING.p3};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};
  `,

  List: styled.li`
    width: 342px;
    height: 36px;
    display: flex;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p3};

    font: ${({ theme }) => theme.FONTS.body.medium};
    border-radius: ${({ theme }) => theme.RADIUS.small};

    &:hover {
      background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    }
  `,
};
