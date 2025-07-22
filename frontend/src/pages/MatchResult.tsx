import Button from '@components/actions/Button';
import Confetti from '@components/Confetti';

import useResult from '@domains/matchResult/hooks/useResult';

import styled from '@emotion/styled';

const MatchResult = () => {
  const { result } = useResult();
  return (
    <S.Container>
      <Confetti />
      <S.Result>
        <S.TitleContainer>
          <S.Title>👏 오늘의 메뉴 👏</S.Title>
        </S.TitleContainer>
        <S.Restaurant>
          <S.Name>피양콩 할마니</S.Name>
        </S.Restaurant>
        {result && (
          <S.Restaurant>
            <S.Name>{result.name}</S.Name>
          </S.Restaurant>
        )}

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
    padding:30px 0;

    background-color: ${({ theme }) => theme.PALLETE.gray[0]};

    border-radius:20px;

    box-shadow:
      0 10px 20px ${({ theme }) => theme.PALLETE.gray[20]};,
  `,

  ButtonContainer: styled.div`
    width: 80%;
  `,

  TitleContainer: styled.div``,

  Title: styled.p`
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,

  Restaurant: styled.div``,

  Name: styled.p`
    color: ${({ theme }) => theme.PALLETE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
};
