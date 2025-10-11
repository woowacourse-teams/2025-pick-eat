import { HEADER_HEIGHT } from '@widgets/Header';

import styled from '@emotion/styled';

import PendingResultScreen from './components/PendingResultScreen';
import ResultScreen from './components/ResultScreen';

function MatchResult() {
  return (
    <S.Container>
      <PendingResultScreen />
      {/* <ResultScreen /> */}
    </S.Container>
  );
}

export default MatchResult;

const S = {
  Container: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: ${HEADER_HEIGHT};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
};
