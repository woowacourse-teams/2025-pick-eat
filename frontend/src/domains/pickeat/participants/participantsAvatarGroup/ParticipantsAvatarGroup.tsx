import Arrow from '@components/assets/icons/Arrow';

import { useParticipants } from '@domains/pickeat/provider/ParticipantsProvider';

import { useBoolean } from '@hooks/useBoolean';
import { useOutsideClickAndEscape } from '@hooks/useOutsideClickAndEscape';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { useRef } from 'react';

import ParticipantAvatar from './ParticipantAvatar';
import ParticipantInfoTooltip from './ParticipantInfoTooltip';

const MAX_RENDER_COUNT = 8;

function ParticipantsAvatarGroup() {
  const [opened, , closeTooltip, toggleTooltip] = useBoolean(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { participantsState } = useParticipants();

  useOutsideClickAndEscape({
    onClose: closeTooltip,
    shouldIgnoreClick: target => tooltipRef.current?.contains(target) ?? false,
  });

  const handleTooltipToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTooltip();
  };

  return (
    <S.Container>
      <S.Wrapper onClick={handleTooltipToggle} opened={opened}>
        {participantsState.participants
          .slice(0, MAX_RENDER_COUNT)
          .sort((a, b) => {
            if (a.isCompleted === b.isCompleted) return 0;
            return a.isCompleted ? 1 : -1;
          })
          .map((p, i) => (
            <S.AvatarWrapper key={p.id} index={i}>
              <ParticipantAvatar participant={p} />
            </S.AvatarWrapper>
          ))}
        <Arrow size="xs" direction="down" color={THEME.PALETTE.gray[30]} />
      </S.Wrapper>
      {opened && (
        <S.TooltipWrapper>
          <ParticipantInfoTooltip
            ref={tooltipRef}
            participantsData={participantsState}
          />
        </S.TooltipWrapper>
      )}
    </S.Container>
  );
}

export default ParticipantsAvatarGroup;

const OVERLAP_OFFSET = 8;

const S = {
  Container: styled.div`
    position: relative;
  `,
  Wrapper: styled.div<{ opened?: boolean }>`
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
    z-index: ${({ index }) => 100 - index};

    margin-left: ${({ index }) => (index === 0 ? 0 : `-${OVERLAP_OFFSET}px`)};
  `,
  TooltipWrapper: styled.div`
    position: absolute;
    top: 44px;
    right: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.dropdown};

    padding: 8px 12px;

    background-color: ${({ theme }) => theme.PALETTE.gray[80]};

    color: ${({ theme }) => theme.PALETTE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.small};
    white-space: nowrap;
    border-radius: ${({ theme }) => theme.RADIUS.small};
    user-select: none;
  `,
};
