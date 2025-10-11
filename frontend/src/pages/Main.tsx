import Card from '@domains/wishlist/components/Card';

import { HEADER_HEIGHT } from '@widgets/Header';

import Carousel from '@components/Carousel';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { pickeat } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

const WISH_CONTENT = [
  {
    id: 1,
    name: '잠실역',
    imageUrl: '/images/carousel/subway_thumbnail.png',
  },
  {
    id: 2,
    name: '선릉역',
    imageUrl: '/images/carousel/subway_thumbnail.png',
  },
  {
    id: 3,
    name: '내 위치에서',
    imageUrl: '/images/carousel/map_thumbnail.png',
  },
];

function Main() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';
  const showToast = useShowToast();

  const handlePublicWishlistClick = async (id: number) => {
    try {
      const code = await pickeat.post(roomId, makePickeatName());
      await pickeat.postWish(id, code);
      if (code) navigate(generateRouterPath.pickeatDetail(code));
    } catch (e) {
      if (e instanceof Error)
        showToast({
          mode: 'ERROR',
          message: '픽잇 생성을 실패했습니다. 다시 시도해 주세요.',
        });
    }
  };

  const CARD_CONTENT = WISH_CONTENT.map(item => (
    <Card
      key={item.id}
      title={item.name}
      imageUrl={item.imageUrl}
      onClick={() => handlePublicWishlistClick(item.id)}
    />
  ));

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
          src="/images/main/mainCharacter.png"
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
        <Carousel contentArr={CARD_CONTENT} />
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

    padding-top: ${HEADER_HEIGHT};

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

    padding: 36px 0 0 16px;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: 30px 30px 0 0;
  `,
  Description: styled.h1`
    font: ${({ theme }) => theme.FONTS.body.xlarge_bold};
  `,
};
