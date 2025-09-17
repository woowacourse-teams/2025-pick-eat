import { ParticipantsState } from '@apis/pickeat';

import styled from '@emotion/styled';
import { use } from 'react';

import ParticipantAvatar from './ParticipantAvatar';

type Props = {
  participantsState: Promise<ParticipantsState>;
};

function ParticipantsAvatarGroup({ participantsState }: Props) {
  const participantsData = use(participantsState);
  return (
    <S.Container>
      {participantsData?.participants.map((p, i) => (
        <S.AvatarWrapper key={p.id} index={i}>
          <ParticipantAvatar participant={p} />
        </S.AvatarWrapper>
      ))}
    </S.Container>
  );
}

export default ParticipantsAvatarGroup;

const OVERLAP_OFFSET = 8;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  AvatarWrapper: styled.div<{ index: number }>`
    margin-left: ${({ index }) => (index === 0 ? 0 : `-${OVERLAP_OFFSET}px`)};
    z-index: ${({ index }) => 100 - index};
  `,
};
