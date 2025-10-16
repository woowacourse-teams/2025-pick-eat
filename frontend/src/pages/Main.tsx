import { useWishCarousel } from '@widgets/wishCarousel/hooks/useWishCarousel';

import Carousel from '@components/Carousel';

import styled from '@emotion/styled';
import { useMemo } from 'react';

function Main() {
  const { getWishCardContent } = useWishCarousel();
  const wishCardContents = useMemo(() => getWishCardContent(), []);

  return (
    <S.Container>
      <S.ImageWrapper>
        <S.BibimImage
          src="/images/main/bibim.png"
          alt="비빔밥"
          width={122}
          height={122}
        />
        <S.MainCharacterImage
          src="/images/character/main_character.png"
          alt="메인캐릭터"
          width={284}
          height={284}
        />
        <S.RamenImage
          src="/images/main/ramen.png"
          alt="라멘"
          width={103}
          height={103}
        />
        <S.PizzaImage
          src="/images/main/pizza.png"
          alt="피자"
          width={142}
          height={142}
        />
      </S.ImageWrapper>
      <S.BottomWrapper>
        <S.Description>다같이 갈 식당을 정해보세요!</S.Description>
        <Carousel contentArr={wishCardContents} />
      </S.BottomWrapper>
    </S.Container>
  );
}

export default Main;

const S = {
  Container: styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    padding-top: ${({ theme }) => theme.LAYOUT.headerHeight};

    background-color: ${({ theme }) => theme.PALETTE.primary[50]};
  `,
  ImageWrapper: styled.div`
    width: 284px;
    height: 284px;
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p6} 0;
  `,
  MainCharacterImage: styled.img`
    position: absolute;
  `,
  PizzaImage: styled.img`
    position: absolute;
    right: 0;
    bottom: -20px;

    transform: rotate(10deg);
  `,
  BibimImage: styled.img`
    position: absolute;
    top: 0;
    right: -30px;
    transform: rotate(20deg);
  `,
  RamenImage: styled.img`
    position: absolute;
    bottom: 80px;
    left: -25px;
    transform: rotate(-20deg);
  `,
  BottomWrapper: styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 27px;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: 30px 30px 0 0;
  `,
  Description: styled.h1`
    padding: 36px 0 0 16px;

    font: ${({ theme }) => theme.FONTS.body.xlarge_bold};
  `,
};
