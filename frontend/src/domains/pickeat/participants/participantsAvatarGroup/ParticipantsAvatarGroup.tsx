import Arrow from '@components/assets/icons/Arrow';
import Tooltip from '@components/tooltip/Tooltip';

import { useParticipants } from '@domains/pickeat/provider/ParticipantsProvider';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { useState } from 'react';

import ParticipantAvatar from './ParticipantAvatar';
import ParticipantInfoTooltip from './ParticipantInfoTooltip';

function ParticipantsAvatarGroup() {
  const { participantsState } = useParticipants();

  const [opened, setOpened] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const onClickContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    setOpened(o => !o);
  };

  return (
    <>
      <S.Container
        onClick={onClickContainer}
        opened={opened}
        data-tooltip="메인 메뉴"
        data-tooltip-offset-x="60"
        data-tooltip-show-right="false"
        data-tooltip-type="lookup"
      >
        {participantsState.participants.map((p, i) => (
          <S.AvatarWrapper key={p.id} index={i}>
            <ParticipantAvatar participant={p} />
          </S.AvatarWrapper>
        ))}
        <Arrow size="xs" direction="down" color={THEME.PALETTE.gray[30]} />
      </S.Container>
      <Tooltip opened={opened} coords={coords} offsetX={60} showRight={false}>
        <ParticipantInfoTooltip participantsData={participantsState} />
      </Tooltip>
    </>
  );
}

export default ParticipantsAvatarGroup;

const OVERLAP_OFFSET = 8;

const S = {
  Container: styled.div<{ opened?: boolean }>`
    display: flex;
    align-items: center;

    padding: 0 ${({ theme }) => theme.PADDING.p2};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};

    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    }
  `,
  AvatarWrapper: styled.div<{ index: number }>`
    margin-left: ${({ index }) => (index === 0 ? 0 : `-${OVERLAP_OFFSET}px`)};
    z-index: ${({ index }) => 100 - index};
  `,
};
