import PickeatEndButton from '@domains/pickeat/matchResult/components/PickeatEndButton';
import PickeatVoteCompleteButton from '@domains/pickeat/matchResult/components/PickeatVoteCompleteButton';

import styled from '@emotion/styled';
import { useState } from 'react';

function PickeatEndTriggerButton() {
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
    width: 200px;
  `,
};
