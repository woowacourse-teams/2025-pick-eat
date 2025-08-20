import WishlistForm from '@domains/wishlist/components/WishlistForm';

import LoadingSpinner from '@components/assets/LoadingSpinner';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import { wishlist } from '@apis/wishlist';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ErrorBoundary } from '@sentry/react';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

export type Wishlist = {
  id: string;
  name: string;
  isPublic: boolean;
};

function ChooseWishlist() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';
  return (
    <S.Container>
      <S.Wrapper>
        <S.TitleArea>
          <S.TitleText>
            <S.PointText>위시리스트🍰</S.PointText>를
            <br />
            <S.PointText>선택</S.PointText>해 주세요!
          </S.TitleText>
        </S.TitleArea>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <WishlistForm
              wishlistGroupPromise={wishlist.getWishGroup(roomId)}
            />
          </Suspense>
        </ErrorBoundary>
      </S.Wrapper>
    </S.Container>
  );
}

export default ChooseWishlist;

const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - ${HEADER_HEIGHT});
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Wrapper: styled.div`
    width: 70%;
    height: 650px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};

    padding: ${({ theme }) => theme.PADDING.p11};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};

    ${setMobileStyle(css`
      width: 80%;

      padding: 0;
      box-shadow: none;
    `)}
  `,

  TitleArea: styled.div``,

  TitleText: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,

  PointText: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
};
