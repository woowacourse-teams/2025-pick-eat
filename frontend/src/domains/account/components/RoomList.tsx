import Button from '@components/actions/Button';

import styled from '@emotion/styled';

const MOCK_ROOM_LIST = [
  { roomName: 'General Chat', memberCount: 12 },
  { roomName: 'Project Alpha', memberCount: 8 },
  { roomName: 'Random', memberCount: 5 },
  { roomName: 'Design Team', memberCount: 7 },
  { roomName: 'Developers', memberCount: 10 },
];

function RoomList() {
  return (
    <S.Container>
      <S.Description>참여 중인 방</S.Description>
      <S.ListWrapper>
        {MOCK_ROOM_LIST.map(room => (
          <S.List key={room.roomName}>
            <S.RoomInfo>
              <S.Name>{room.roomName}</S.Name>
              <S.MemberCount>{room.memberCount}명</S.MemberCount>
            </S.RoomInfo>

            <Button text="입장" size="sm" />
          </S.List>
        ))}
      </S.ListWrapper>
    </S.Container>
  );
}

export default RoomList;

const S = {
  Container: styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  Description: styled.h3`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,

  ListWrapper: styled.ul`
    height: 80%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    border-radius: ${({ theme }) => theme.RADIUS.large};
    padding: ${({ theme }) => theme.PADDING.p5};
    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  List: styled.li`
    display: flex;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.RADIUS.large};
    padding: ${({ theme }) => theme.PADDING.p5};
    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,

  RoomInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};
  `,

  Name: styled.span``,

  MemberCount: styled.span`
    font: ${({ theme }) => theme.FONTS.body.small};
    color: ${({ theme }) => theme.PALETTE.gray[60]};
  `,
};
