import Cross from '@components/assets/icons/Cross';

import styled from '@emotion/styled';

function TitleArea() {
  return (
    <S.Container>
      <S.Title>
        제외하고 싶은 식당은?
        <S.Imoji src='/images/dislikeImoji.png' alt='싫어요 이모지' />
      </S.Title>
      <S.Description>
        <S.DescriptionText>가고싶지 않은 식당을</S.DescriptionText>
        <S.DescriptionText>
          <S.DeleteButton>
            <S.IconContainer>
              <S.IconWrapper>
                <Cross color="white" size="sm" strokeWidth={4} />
              </S.IconWrapper>
            </S.IconContainer>
          </S.DeleteButton>
        </S.DescriptionText>
        <S.DescriptionText>버튼을 눌러 제외해주세요.</S.DescriptionText>
      </S.Description>
    </S.Container>
  );
}

export default TitleArea;

const S = {
  Container: styled.div`
    padding: ${({ theme }) => theme.PADDING.p5};
  `,
  Imoji: styled.img`
    width: 48px;
    height: 48px;
  `,
  Title: styled.h1`
    display: flex;
    gap: 8px;

    margin-top: 12px;

    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
  Description: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    margin-bottom: 16px;

    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
  DescriptionText: styled.span`
    
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
    width: 16px;
    height: 16px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2px;

    background-color: ${({ theme }) => theme.PALETTE.primary[50]};

    border-radius: 1000px;
  `,
};
