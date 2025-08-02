import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import SearchBar from '@components/actions/SearchBar';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import styled from '@emotion/styled';

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

function CreateRoom() {
  return (
    <S.Container>
      <S.Title>방 만들기</S.Title>
      <S.Description>
        함께 식사할 멤버를 초대하여 방을 만들어봐요.
      </S.Description>

      <Input label="방 이름" placeholder="레전드 방" />
      <SearchBar label="멤버 초대" placeholder="아이디를 입력해주세요." />

      <S.MemberContainer>
        {MOCK_DATA.map(member => (
          <S.Member key={member.id}>
            <S.Nickname>{member.nickname}</S.Nickname>
            <S.DeleteIcon>X</S.DeleteIcon>
          </S.Member>
        ))}
      </S.MemberContainer>
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
    padding: 0 ${({ theme }) => theme.PADDING.p7};
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  MemberContainer: styled.ul`
    min-height: 30%;
    width: 100%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    border-radius: ${({ theme }) => theme.RADIUS.large};
    padding: ${({ theme }) => theme.PADDING.p5};
    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  Member: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Nickname: styled.span``,

  DeleteIcon: styled.div``,
};
