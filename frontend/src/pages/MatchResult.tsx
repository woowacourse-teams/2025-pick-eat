import Button from '@components/actions/Button';
import Confetti from '@components/Confetti';

import useResult from '@domains/matchResult/hooks/useResult';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const MatchResult = () => {
  const { getResult } = useResult();
  const result = getResult();

  return (
    <S.Container>
      <Confetti />
      <S.Result>
        <S.Title>👏 오늘의 Pick! 👏</S.Title>

        {result && <S.Name>{result.name}</S.Name>}

        <S.ButtonContainer>
          <Button color="primary" text="길 찾기" />
        </S.ButtonContainer>
      </S.Result>
    </S.Container>
  );
};

export default MatchResult;

const S = {
  Container: styled.div`
    height: calc(100vh - 72px);
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
    gap: 20px;

    padding: 40px 0;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    border-radius: 20px;

    box-shadow: 0 10px 20px ${({ theme }) => theme.PALETTE.gray[20]};

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
    padding: 16px;

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
};
