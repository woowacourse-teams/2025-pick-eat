import ResultRestaurantCard from '@domains/pickeat/matchResult/components/ResultRestaurantCard';

import RoundedButton from '@components/actions/RoundedButton';
import Confetti from '@components/Confetti';

import { ApiError } from '@apis/apiClient';
import { pickeat } from '@apis/pickeat';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Suspense, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import PendingResultScreen from './components/PendingResultScreen';
import Twinkles from './components/Twinkles';

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

function MatchResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const showToast = useShowToast();

  const fetchResult = useCallback(async () => {
    try {
      const actualResultPromise = pickeat.getResult(pickeatCode);
      const delayPromise = new Promise(resolve => setTimeout(resolve, 2500));
      const [result] = await Promise.all([actualResultPromise, delayPromise]);

      if (!result) throw new Error('투표 결과가 없습니다.');

      return result;
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        showToast({
          mode: 'ERROR',
          message: '해당 픽잇에 접근할 수 없습니다.',
        });
        navigate(ROUTE_PATH.MAIN);
      } else {
        showToast({
          mode: 'ERROR',
          message: '투표 결과를 불러오지 못했습니다!',
        });
      }
      throw e;
    }
  }, []);

  const restaurantData = useMemo(() => fetchResult(), []);

  return (
    <S.Container>
      <Suspense fallback={<PendingResultScreen />}>
        <S.ResultScreenWrapper>
          <S.ResultWrapper>
            <Confetti />
            <ResultRestaurantCard restaurantData={restaurantData} />
            <S.TwinkleBox>
              <Twinkles />
            </S.TwinkleBox>
          </S.ResultWrapper>
          <RoundedButton onClick={() => navigate(ROUTE_PATH.MAIN)}>
            메인으로 돌아가기
          </RoundedButton>
        </S.ResultScreenWrapper>
      </Suspense>
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

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
  ResultScreenWrapper: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level8};

    padding-top: ${({ theme }) => theme.LAYOUT.headerHeight};

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
