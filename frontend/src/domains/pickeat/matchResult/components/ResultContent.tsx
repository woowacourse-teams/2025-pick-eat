import ResultRestaurantCard from '@domains/pickeat/matchResult/components/ResultRestaurantCard';

import RoundedButton from '@components/actions/RoundedButton';
import Confetti from '@components/Confetti';

import { pickeatQuery } from '@apis/pickeat';

import { ROUTE_PATH } from '@routes/routePath';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Twinkles from '@pages/pickeat/matchResult/components/Twinkles';
import { useNavigate } from 'react-router';

const scaleUp = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

function ResultContent() {
  const navigate = useNavigate();

  return (
    <>
      <Confetti />
      <S.ResultScreenWrapper>
        <S.ResultWrapper>
          <ResultRestaurantCard />
          <S.TwinkleBox>
            <Twinkles />
          </S.TwinkleBox>
        </S.ResultWrapper>
        <RoundedButton onClick={() => navigate(ROUTE_PATH.MAIN)}>
          메인으로 돌아가기
        </RoundedButton>
      </S.ResultScreenWrapper>
    </>
  );
}

export default ResultContent;

const S = {
  Container: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
  ResultScreenWrapper: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level8};

    animation: ${scaleUp} 0.3s ease forwards;
  `,
  ResultWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level2};
    position: relative;

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
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
