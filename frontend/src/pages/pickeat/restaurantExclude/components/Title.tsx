import Cross from '@components/assets/icons/Cross';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

function Title() {
  return (
    <S.Container>
      <S.TitleBox>
        <S.Title>식당 제외하기</S.Title>
        <S.Imoji src="/images/dislikeImoji.png" alt="emoji" />
      </S.TitleBox>
      <S.Description>
        <S.Line>
          <S.WriteText>안 땡기는 식당</S.WriteText>
          <S.TitleText>을</S.TitleText>
        </S.Line>
        <S.Line>
          <S.IconWrapper>
            <Cross color="white" size="sm" strokeWidth={4} />
          </S.IconWrapper>
          <S.TitleText>버튼을 눌러 제외해 주세요</S.TitleText>
        </S.Line>
      </S.Description>
    </S.Container>
  );
}

export default Title;

const S = {
  Container: styled.div`
    padding: ${({ theme }) => theme.PADDING.px6};
  `,
  TitleBox: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.display.medium};
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    ${setMobileStyle(css`
      font-size: 36px;
    `)}
  `,
  Imoji: styled.img`
    width: 48px;
  `,
  Description: styled.div`
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.GAP.level4};
    ${setMobileStyle(css`
      flex-direction: column;
      gap: 4px;
    `)}
  `,
  Line: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  WriteText: styled.p`
    height: 36px;
    color: ${({ theme }) => theme.PALETTE.primary[95]};
    font: ${({ theme }) => theme.FONTS.heading.small_style};
    border-bottom: 2px solid ${({ theme }) => theme.PALETTE.gray[50]};
    padding: 0px ${({ theme }) => theme.PADDING.px3};
  `,
  TitleText: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  IconWrapper: styled.div`
    width: 24px;
    height: 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p2};

    background-color: ${({ theme }) => theme.PALETTE.primary[60]};

    border-radius: 1000px;
  `,
};
