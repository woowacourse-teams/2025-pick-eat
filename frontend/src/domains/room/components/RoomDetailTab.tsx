import Button from '@components/actions/Button';
import Location from '@components/assets/icons/Location';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { room, Room } from '@apis/room';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense, use } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import IncludeMemberList from './IncludeMemberList';
import ProgressPickeat from './ProgressPickeat';

function RoomDetailTab({ roomDetail }: { roomDetail: Promise<Room | null> }) {
  const name = use(roomDetail)?.name;
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  return (
    <S.Container>
      <S.Name>{name}</S.Name>
      <S.ButtonWrapper>
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
      </S.ButtonWrapper>
      <ErrorBoundary>
        <Suspense>
          <IncludeMemberList members={room.getIncludeMembers(roomId)} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense>
          <ProgressPickeat pickeats={room.getPickeats(roomId)} />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
}

export default RoomDetailTab;

const S = {
  Container: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: ${({ theme }) => theme.PADDING.p7};
  `,

  Name: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  ButtonWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
