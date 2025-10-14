import ResultRestaurantCard from '@domains/pickeat/matchResult/components/ResultRestaurantCard';

import { HEADER_HEIGHT } from '@widgets/Header';

import RoundedButton from '@components/actions/RoundedButton';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import Confetti from '@components/Confetti';

import { ApiError } from '@apis/apiClient';
import { pickeat } from '@apis/pickeat';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import styled from '@emotion/styled';
import { Suspense, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import Twinkles from './Twinkles';

function ResultScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const showToast = useShowToast();

  const fetchResult = useCallback(async () => {
    try {
      const result = await pickeat.getResult(pickeatCode);
      if (!result) throw new Error('No result found');
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
          message: '픽잇 결과를 불러오지 못했습니다!',
        });
      }
      throw e;
    }
  }, []);

  const restaurantData = useMemo(() => fetchResult(), []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <S.Container>
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
      </S.Container>
    </Suspense>
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
