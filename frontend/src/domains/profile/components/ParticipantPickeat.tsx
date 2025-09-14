import Enter from '@components/assets/icons/Enter';

import { ParticipatingResponse } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { use } from 'react';
import { useNavigate } from 'react-router';

type Props = {
  participatingPickeatData: Promise<ParticipatingResponse | null>;
};

function ParticipantPickeat({ participatingPickeatData }: Props) {
  const participantPickeat = use(participatingPickeatData);
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.TitleBox>
        {participantPickeat?.isActive ? '🟢' : '🔴'}
        <S.Name>{participantPickeat?.name ?? '픽잇'}</S.Name>
      </S.TitleBox>
      <button
        onClick={() =>
          navigate(
            generateRouterPath.pickeatDetail(participantPickeat?.code || '')
          )
        }
      >
        <Enter size="sm" color="black" />
      </button>
    </S.Container>
  );
}

export default ParticipantPickeat;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
    scrollbar-width: none;

    align-items: center;
    justify-content: space-between;
  `,
  Name: styled.span`
    font: ${({ theme }) => theme.FONTS.body.small};
    color: ${({ theme }) => theme.PALETTE.gray[60]};
  `,
  TitleBox: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
    align-items: center;
  `,
};
