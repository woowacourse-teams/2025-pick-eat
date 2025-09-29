import ChoosePickeatType from '@domains/pickeat/components/ChoosePickeatType';
import PublicWishlist from '@domains/wishlist/components/PublicWishlist';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Main = () => {
  return (
    <S.Container>
      <S.Section>
        <S.PaddingBox>
          <S.PointText>
            <S.PrimaryPointText>픽잇 추천</S.PrimaryPointText>에서&nbsp;
            <S.PrimaryPointText>
              Pick!
              <br />
            </S.PrimaryPointText>
          </S.PointText>

          <S.Description>
            원하는 맛집 리스트를 클릭해서 빠르게 시작해 보세요.
          </S.Description>
        </S.PaddingBox>
        <PublicWishlist />
      </S.Section>
      <S.Section>
        <S.PaddingBox
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <S.TitleWrapper>
            <S.PointText>
              <S.PrimaryPointText>맞춤 설정</S.PrimaryPointText>으로&nbsp;
              <S.PrimaryPointText>Pick!</S.PrimaryPointText>
            </S.PointText>
            <S.Description>
              주변 식당이나, 원하는 식당 중에서 투표를 시작해보세요.
            </S.Description>
          </S.TitleWrapper>

          <ChoosePickeatType />
        </S.PaddingBox>
      </S.Section>
    </S.Container>
  );
};
export default Main;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level10};

    margin: 0;
    ${({ theme }) =>
      setMobileStyle(css`
        margin: ${theme.PADDING.p6} 0;
      `)};
  `,
  PaddingBox: styled.div`
    padding: ${({ theme }) => theme.PADDING.p8}
      ${({ theme }) => theme.PADDING.p8} 0;

    ${({ theme }) =>
      setMobileStyle(css`
        padding: ${theme.PADDING.p5} ${theme.PADDING.p5} 0;
      `)};
  `,
  TitleWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Section: styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  PointText: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,

  Description: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,

  PrimaryPointText: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,
};
