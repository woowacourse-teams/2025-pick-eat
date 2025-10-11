import Result from '@domains/pickeat/matchResult/components/Result';

import { HEADER_HEIGHT } from '@widgets/Header';

import RoundedButton from '@components/actions/RoundedButton';
import Confetti from '@components/Confetti';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

import Twinkles from './Twinkles';

function ResultScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  return (
    <S.Container>
      <S.ResultWrapper>
        <Confetti />
        <Result pickeatCode={pickeatCode} />
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

export default ResultScreen;

const S = {
  Container: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level8};

    padding-top: ${HEADER_HEIGHT};
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
    width: 270px;
    height: 300px;
    position: absolute;
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
