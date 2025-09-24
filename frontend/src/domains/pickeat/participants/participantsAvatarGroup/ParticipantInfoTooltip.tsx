import { ParticipantsState, ParticipantState } from '@apis/pickeat';

import styled from '@emotion/styled';

import ParticipantAvatar from './ParticipantAvatar';

type Props = {
  participantsData: ParticipantsState;
};

function Participant({ participant }: { participant: ParticipantState }) {
  return (
    <S.ParticipantWrapper>
      <ParticipantAvatar participant={participant} />
      <S.ParticipantInfoBox>
        <S.Name>{participant.nickname}</S.Name>
        <S.Description>
          투표 {participant.isCompleted ? '완료' : '미완료'}
        </S.Description>
      </S.ParticipantInfoBox>
    </S.ParticipantWrapper>
  );
}

function ParticipantInfoTooltip({ participantsData }: Props) {
  return (
    <S.Container>
      총 참여자 {participantsData.totalParticipants}명
      {participantsData.participants.map(p => (
        <Participant key={p.id} participant={p} />
      ))}
    </S.Container>
  );
}

export default ParticipantInfoTooltip;

const S = {
  Container: styled.div`
    max-height: 600px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.RADIUS.small};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level2};
    overflow-y: scroll;
  `,
  ParticipantWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  ParticipantInfoBox: styled.div`
    width: 100%;
  `,
  Name: styled.p`
    font: ${({ theme }) => theme.FONTS.body.small_bold};
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[20]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
};
