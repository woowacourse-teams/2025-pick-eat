import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

function Title() {
  return (
    <S.Container>
      <S.TitleBox>
        <S.Title>식당 투표하기</S.Title>
        <S.Imoji src="/images/likeImoji.png" alt="emoji" />
      </S.TitleBox>
      <S.Description>
        <S.Line>
          <S.WriteBox>
            <S.WriteText>가고 싶은 식당</S.WriteText>
          </S.WriteBox>
          <S.TitleText>에</S.TitleText>
        </S.Line>
        <S.Line>
          <S.TitleText>❤️ 를 눌러 투표해 주세요</S.TitleText>
        </S.Line>
      </S.Description>
    </S.Container>
  );
}

export default Title;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.PADDING.px6};
  `,
  TitleBox: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.display.medium};
    color: ${({ theme }) => theme.PALETTE.secondary[60]};
    ${setMobileStyle(css`
      font-size: 36px;
    `)}
  `,
  Imoji: styled.img`
    width: 48px;
    height: 48px;
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
  WriteBox: styled.div`
    width: 160px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid ${({ theme }) => theme.PALETTE.gray[50]};
  `,
  WriteText: styled.p`
    color: ${({ theme }) => theme.PALETTE.secondary[95]};
    font: ${({ theme }) => theme.FONTS.heading.small_style};
  `,

  TitleText: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};
