import Button from '@components/actions/Button';

import styled from '@emotion/styled';

const MatchResult = () => {
  const MOCK_DATA = {
    id: 1,
    name: '스시준',
    category: '일식',
    distance: 30,
    roadAddressName: '대충 도로명 주소',
    likeCount: 3,
    x: 127.234124,
    y: 25.3294871,
  };

  return (
    <S.Container>
      <S.Result>
        <S.TitleContainer>
          <S.Title>결과</S.Title>
        </S.TitleContainer>
        <S.Restaurant>
          <S.Name>{MOCK_DATA.name}</S.Name>
        </S.Restaurant>

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 72px);
  `,

  Result: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 50%;
    height: 500px;
    background-color: ${({ theme }) => theme.PALLETE.gray[5]};
  `,

  ButtonContainer: styled.div`
    width: 200px;
  `,

  TitleContainer: styled.div``,

  Title: styled.p`
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,

  Restaurant: styled.div``,

  Name: styled.p`
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
};
