import Result from '@domains/matchResult/components/Result';

import Confetti from '@components/Confetti';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { pickeat } from '@apis/pickeat';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

function MatchResult() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  return (
    <S.Container>
      <S.ResultWrapper>
        <Confetti />
        <S.Title>👏 오늘의 Pick! 👏</S.Title>

        <ErrorBoundary>
          <Suspense fallback={<div>로딩중</div>}>
            <Result resultPromise={pickeat.getResult(pickeatCode)} />
          </Suspense>
        </ErrorBoundary>
      </S.ResultWrapper>
    </S.Container>
  );
}

export default MatchResult;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ResultWrapper: styled.div`
    width: 50%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.GAP.level6};

    position: relative;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};

    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};

    ${setMobileStyle(css`
      width: 100%;
      box-shadow: none;
    `)}
  `,

  Title: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
};
