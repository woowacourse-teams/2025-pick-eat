import styled from '@emotion/styled';

function Title() {
  return (
    <S.Container>
      <S.Title>식당 투표하기</S.Title>
      <S.Description>가고 싶은 식당에 ❤️를 눌러주세요.</S.Description>
    </S.Container>
  );
}

export default Title;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};

    padding: ${({ theme }) => theme.PADDING.px6} 0;
  `,

  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Description: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
