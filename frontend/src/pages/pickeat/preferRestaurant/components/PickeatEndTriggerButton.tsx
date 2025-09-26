import PickeatEndButton from '@domains/pickeat/matchResult/components/PickeatEndButton';
import PickeatVoteCompleteButton from '@domains/pickeat/matchResult/components/PickeatVoteCompleteButton';

import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

function PickeatEndTriggerButton() {
  const [voted, setVoted] = useState(false);
  const handleVoteComplete = useCallback(() => {
    setVoted(true);
  }, [setVoted]);
  return (
    <S.Container>
      {voted ? (
        <PickeatEndButton />
      ) : (
        <PickeatVoteCompleteButton onVoteComplete={handleVoteComplete} />
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
