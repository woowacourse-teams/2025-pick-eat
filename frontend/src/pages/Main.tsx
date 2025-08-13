import PublicWishlist from '@domains/wishlist/components/PublicWishlist';

import Button from '@components/actions/Button';
import Location from '@components/assets/icons/Location';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { wishlist } from '@apis/wishlist';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Suspense } from 'react';

const Main = () => {
  return (
    <S.Container>
      <S.Section>
        <S.Title>
          <S.PrimaryPoint>픽잇 추천</S.PrimaryPoint>에서{' '}
          <S.PrimaryPoint>Pick!</S.PrimaryPoint>
        </S.Title>

        <ErrorBoundary>
          <Suspense fallback={<div>로딩 중..</div>}>
            <PublicWishlist wishlistPromise={wishlist.get('')} />
          </Suspense>
        </ErrorBoundary>
      </S.Section>

      <S.Section>
        <S.Title>
          <S.SecondaryPoint>맞춤 설정</S.SecondaryPoint>으로{' '}
          <S.SecondaryPoint>Pick!</S.SecondaryPoint>
        </S.Title>

        <S.ButtonWrapper>
          <Button text="위시리스트 선택" leftIcon="🤍" />
          <Button
            text="위치/반경 선택"
            color="secondary"
            leftIcon={<Location size="sm" color="black" />}
          />
        </S.ButtonWrapper>
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

  ButtonWrapper: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};

    ${setMobileStyle(css`
      flex-direction: column;
    `)}
  `,
};
