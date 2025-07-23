import styled from '@emotion/styled';

function TitleArea() {
  return (
    <S.Container>
      <S.Title>오늘 안 땡기는 식당은?</S.Title>
      <S.Description>
        가고싶지 않은 식당을 X 버튼을 눌러 제외해주세요.
      </S.Description>
    </S.Container>
  );
}

export default TitleArea;

const S = {
  Container: styled.div`
    padding: ${({ theme }) => theme.PADDING.p5};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
  Description: styled.p`
    margin-bottom: 16px;

    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
