import { ParticipantState } from '@apis/pickeat';

import { colorCreator } from '@utils/colorCreator';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import React, { useMemo } from 'react';

type Props = {
  participant: ParticipantState;
};

const ParticipantAvatar: React.FC<Props> = ({ participant }) => {
  const bgColor = useMemo(
    () => colorCreator.uniquePastel(participant.id),
    [participant.id]
  );

  return (
    <S.Container
      borderColor={
        participant.isCompleted
          ? THEME.PALETTE.green[50]
          : THEME.PALETTE.gray[20]
      }
    >
      <S.Wrapper backgroundColor={bgColor}>
        <S.Initial>
          {participant.nickname.length > 2
            ? participant.nickname.slice(0, 2)
            : participant.nickname}
        </S.Initial>
      </S.Wrapper>
    </S.Container>
  );
};

export default ParticipantAvatar;

const S = {
  Container: styled.div<{ borderColor: string }>`
    width: 36px;
    height: 36px;
    border: 2px solid white;
    border-radius: 50%;
    border-color: ${({ borderColor }) => borderColor};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  `,
  Wrapper: styled.div<{ backgroundColor: string }>`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    border-radius: 50%;
    background: ${({ backgroundColor }) => backgroundColor};
  `,
  Initial: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
