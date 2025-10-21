import { pickeatQuery } from '@apis/pickeat';

import styled from '@emotion/styled';

type Props = {
  pickeatCode: string;
};

function Participant({ pickeatCode }: Props) {
  const { data: participant } =
    pickeatQuery.useGetParticipantState(pickeatCode);

  return (
    <S.Container>
      <S.Join>참여자 총{participant?.totalParticipants}명</S.Join>
    </S.Container>
  );
}

export default Participant;

const S = {
  Container: styled.div`
    width: 100%;

    text-align: end;
  `,

  Join: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
