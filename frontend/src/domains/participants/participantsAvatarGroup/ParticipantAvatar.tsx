import { ParticipantState } from '@apis/pickeat';

import { random } from '@utils/random';

import styled from '@emotion/styled';
import React from 'react';

type Props = {
  participant: ParticipantState;
};

const ParticipantAvatar: React.FC<Props> = ({ participant }) => (
  <S.Container backgroundColor={random.getPastelColor()}>
    <S.Initial>
      {participant.nickname.length > 2
        ? participant.nickname.slice(0, 2)
        : participant.nickname}
    </S.Initial>
  </S.Container>
);

export default ParticipantAvatar;

const S = {
  Container: styled.div<{ backgroundColor: string }>`
    width: 32px;
    height: 32px;
    border: 2px solid white;
    border-radius: 50%;
    background: ${({ backgroundColor }) => backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  `,
  Initial: styled.span`
    color: #fff;
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
