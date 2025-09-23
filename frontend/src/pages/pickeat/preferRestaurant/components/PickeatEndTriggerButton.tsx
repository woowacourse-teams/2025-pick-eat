import PickeatEndButton from '@domains/matchResult/components/PickeatEndButton';
import PickeatVoteCompleteButton from '@domains/matchResult/components/PickeatVoteCompleteButton';

import styled from '@emotion/styled';
import { useState } from 'react';

function PickeatEndTriggerButton() {
  // 초기 상태 처음에 조회하고 넣어주기

  const [voted, setVoted] = useState(false);
  return (
    <S.Container>
      {voted ? (
        <PickeatEndButton />
      ) : (
        <PickeatVoteCompleteButton onClick={() => setVoted(true)} />
      )}
    </S.Container>
  );
}

export default PickeatEndTriggerButton;

const S = {
  Container: styled.div`
    width: 120px;
  `,
};
