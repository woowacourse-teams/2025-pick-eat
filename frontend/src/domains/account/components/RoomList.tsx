import Button from '@components/actions/Button';
import Enter from '@components/assets/icons/Enter';
import People from '@components/assets/icons/People';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

const MOCK_ROOM_LIST = [
  { roomName: 'General Chat', memberCount: 12 },
  { roomName: 'Project Alpha', memberCount: 8 },
  { roomName: 'Random', memberCount: 5 },
  { roomName: 'Design Team', memberCount: 7 },
  { roomName: 'Developers', memberCount: 10 },
  { roomName: 'Developers', memberCount: 10 },
  { roomName: 'Developers', memberCount: 10 },
];

function RoomList() {
  return (
    <S.Container>
      <S.Description>참여 중인 방</S.Description>
      <S.ListWrapper>
        {MOCK_ROOM_LIST.length > 0 ? (
          MOCK_ROOM_LIST.map(room => (
            <S.List key={room.roomName}>
              <S.RoomInfo>
                <S.Name>{room.roomName}</S.Name>
                <S.MemberCount>
                  <People size="xs" color={THEME.PALETTE.gray[60]} />
                  {room.memberCount}명
                </S.MemberCount>
              </S.RoomInfo>

              <Button
                text="입장"
                size="sm"
                leftIcon={<Enter size="xs" color="white" />}
              />
            </S.List>
          ))
        ) : (
          <S.EmptyDescription>현재 참여 중인 방이 없습니다.</S.EmptyDescription>
        )}
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
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    overflow: scroll;

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
    scrollbar-width: none;
  `,

  List: styled.li`
    display: flex;
    justify-content: space-between;

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,

  EmptyDescription: styled.span`
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    text-align: center;
  `,

  RoomInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};
  `,

  Name: styled.span``,

  MemberCount: styled.span`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
