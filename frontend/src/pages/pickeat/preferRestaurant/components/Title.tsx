import styled from '@emotion/styled';

function Title() {
  return (
    <S.Title>
      가고 싶은 식당에 <br /> ❤️를 눌러 투표해 주세요.
    </S.Title>
  );
}

export default Title;

const S = {
  Title: styled.p`
    color: ${({ theme }) => theme.PALETTE.secondary[60]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
};
