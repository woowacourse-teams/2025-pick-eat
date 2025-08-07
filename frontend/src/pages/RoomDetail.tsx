import IncludeMemberList from '@domains/room/components/IncludeMemberList';

import Button from '@components/actions/Button';
import Location from '@components/assets/icons/Location';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { room } from '@apis/room';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

function RoomDetail() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getRoomName = async () => {
      const response = await room.get(roomId);
      if (response) setRoomName(response?.name);
    };
    getRoomName();
  }, []);
  return (
    <S.Container>
      <S.Name>{roomName}</S.Name>
      <S.SelectWrapper>
        <Button
          text="위시로 픽잇!"
          leftIcon="🤍"
          onClick={() => navigate(generateRouterPath.pickeatWithWish(roomId))}
        />
        <Button
          text="위치로 픽잇!"
          leftIcon={<Location size="sm" color="white" />}
          onClick={() =>
            navigate(generateRouterPath.pickeatWithLocation(roomId))
          }
        />
      </S.SelectWrapper>
      <ErrorBoundary>
        <Suspense>
          <IncludeMemberList members={room.getIncludeMembers(roomId)} />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
}

export default RoomDetail;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: 0 ${({ theme }) => theme.PADDING.p7};
  `,

  Name: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  SelectWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
