import ChoosePickeatType from '@domains/pickeat/components/ChoosePickeatType';
import PublicWishlist from '@domains/wishlist/components/PublicWishlist';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
const Main = () => {
  return (
    <S.Container>
      <S.Section>
        <S.Title>
          <S.PrimaryPoint>픽잇 추천</S.PrimaryPoint>에서&nbsp;
          <S.PrimaryPoint>Pick!</S.PrimaryPoint>
        </S.Title>

        <PublicWishlist />
      </S.Section>

      <S.Section>
        <S.Title>
          <S.SecondaryPoint>맞춤 설정</S.SecondaryPoint>으로&nbsp;
          <S.SecondaryPoint>Pick!</S.SecondaryPoint>
        </S.Title>

        <ChoosePickeatType />
      </S.Section>
    </S.Container>
  );
};
export default Main;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level12};

    padding: ${({ theme }) => theme.PADDING.p10}
      ${({ theme }) => theme.PADDING.p10} 0;

    ${({ theme }) =>
      setMobileStyle(css`
        padding: ${theme.PADDING.p10} ${theme.PADDING.p5} 0;
      `)}
  `,

  Section: styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  Title: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,

  PrimaryPoint: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  SecondaryPoint: styled.span`
    color: ${({ theme }) => theme.PALETTE.secondary[60]};
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,
};
