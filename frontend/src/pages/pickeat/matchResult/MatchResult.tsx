import Result from '@domains/pickeat/matchResult/components/Result';

import RoundedButton from '@components/actions/RoundedButton';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import Confetti from '@components/Confetti';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

import Twinkles from './components/Twinkles';

function MatchResult() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.ResultWrapper>
        <Confetti />
        {pickeatCode ? (
          <Result pickeatCode={pickeatCode} />
        ) : (
          <LoadingSpinner />
        )}
        <S.TwinkleBox>
          <Twinkles />
        </S.TwinkleBox>
      </S.ResultWrapper>
      <RoundedButton onClick={() => navigate(ROUTE_PATH.MAIN)}>
        메인으로 돌아가기
      </RoundedButton>
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
    gap: ${({ theme }) => theme.GAP.level8};

    padding: ${({ theme }) => theme.PADDING.p10};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  ResultWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};
    position: relative;

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
    box-shadow: none;
  `,

  TwinkleBox: styled.div`
    width: 100%;
    height: 300px;
    position: absolute;
    top: -10px;
    right: -10px;
    pointer-events: none;
  `,

  Title: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,

  ToMainButton: styled.div`
    width: 260px;
  `,
};
