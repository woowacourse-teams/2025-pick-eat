import Cross from '@components/assets/icons/Cross';

import styled from '@emotion/styled';

function TitleArea() {
  return (
    <S.Container>
      <S.Title>
        <S.TitleText>
          <S.TitlePointText>안 땡기는 식당</S.TitlePointText>을
          <S.Imoji src="/images/dislikeImoji.png" alt="싫어요 이모지" />
        </S.TitleText>
        <S.IconTextBox>
          <S.IconContainer>
            <S.IconWrapper>
              <Cross color="white" size="sm" strokeWidth={4} />
            </S.IconWrapper>
          </S.IconContainer>
          <S.TitleText>
            <S.TitlePointText>버튼</S.TitlePointText>을{' '}
            <S.TitlePointText>눌러 제외</S.TitlePointText>해주세요
          </S.TitleText>
        </S.IconTextBox>
      </S.Title>
    </S.Container>
  );
}

export default TitleArea;

const S = {
  Container: styled.div`
    padding: ${({ theme }) => theme.PADDING.p7};
    padding-left: ${({ theme }) => theme.PADDING.px6};
  `,
  Imoji: styled.img`
    width: 48px;
    height: 48px;
  `,
  Title: styled.h1`
    display: flex;
    flex-direction: column;

    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
  TitleText: styled.span`
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.PALETTE.gray[30]};

    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
  TitlePointText: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
  IconTextBox: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  DeleteButton: styled.div`
    width: 20px;
    height: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
  IconContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  `,
  IconWrapper: styled.div`
    width: 24px;
    height: 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2px;

    background-color: ${({ theme }) => theme.PALETTE.primary[50]};

    border-radius: 1000px;
  `,
};
