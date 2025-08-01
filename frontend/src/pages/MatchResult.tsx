import Button from '@components/actions/Button';
import Confetti from '@components/Confetti';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import useResult from '@domains/matchResult/hooks/useResult';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const MatchResult = () => {
  const { getResult } = useResult();
  const result = getResult();

  return (
    <S.Container>
      <S.Result>
        <Confetti />
        <S.Title>👏 오늘의 Pick! 👏</S.Title>

        {result && (
          <>
            <S.Name>{result.name}</S.Name>{' '}
            <S.ButtonContainer>
              <Button
                color="primary"
                text="식당 싱세 정보"
                onClick={() =>
                  window.open(result.placeUrl, '_blank', 'noopener,noreferrer')
                }
              />
            </S.ButtonContainer>
          </>
        )}
      </S.Result>
    </S.Container>
  );
};

export default MatchResult;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  Result: styled.div`
    width: 50%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level6};

    position: relative;

    padding: ${({ theme }) => theme.PADDING.p9} 0;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};

    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};

    ${setMobileStyle(css`
      width: 100%;
      box-shadow: none;
    `)}
  `,

  ButtonContainer: styled.div`
    width: 80%;
  `,

  Title: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,

  Name: styled.p`
    padding: ${({ theme }) => theme.PADDING.p5};

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
};
