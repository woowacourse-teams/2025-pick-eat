import Enter from '@components/assets/icons/Enter';
import People from '@components/assets/icons/People';

import { roomsQuery } from '@apis/rooms';

import { generateRouterPath } from '@routes/routePath';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

function RoomList() {
  const { data } = roomsQuery.useGet();

  const navigate = useNavigate();
  return (
    <S.ListWrapper>
      {data?.length > 0 ? (
        data.map(room => (
          <S.List
            key={room.id}
            onClick={() =>
              navigate(generateRouterPath.roomDetail(room.id, room.wishlistId))
            }
          >
            <S.RoomInfo>
              <S.Name>{room.name}</S.Name>
              <S.MemberCount>
                <People size="xs" color={THEME.PALETTE.gray[60]} />
                {room.memberCount}명
              </S.MemberCount>
            </S.RoomInfo>
            <button>
              <Enter size="sm" color="black" />
            </button>
          </S.List>
        ))
      ) : (
        <S.EmptyDescription>현재 참여 중인 방이 없습니다.</S.EmptyDescription>
      )}
    </S.ListWrapper>
  );
}

export default RoomList;

const S = {
  ListWrapper: styled.ul`
    min-height: 400px;
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
