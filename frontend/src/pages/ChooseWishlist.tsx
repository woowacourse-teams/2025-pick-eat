import Input from '@components/actions/Input';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import WishlistGroup from '@domains/wishlist/WishlistGroup';

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
  // pickeatId: string;
  isPublic: boolean;
};

function ChooseWishlist() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') ?? '';

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

        <Input name="pickeatName" label="픽잇 이름" placeholder="레전드 점심" />

        <ErrorBoundary>
          <Suspense fallback={<div>로딩 중</div>}>
            <WishlistGroup
              wishlistGroupPromise={
                roomId ? wishlist.getRoom(roomId) : wishlist.getPublic()
              }
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

  Wrapper: styled.form`
    width: 70%;
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
