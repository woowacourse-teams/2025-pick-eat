import Card from '@domains/wishlist/components/Card';

import Carousel from '@components/Carousel';
import Footer from '@components/layouts/Footer';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { pickeatQuery } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

type Content = {
  id: number;
  name: string;
  imageUrl: string;
  errorMessage?: string;
  isTemplate: boolean;
  onClick: () => void;
};

function Main() {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? 0;

  const postPickeatMutation = pickeatQuery.usePostPickeat();
  const postTemplateMutation = pickeatQuery.usePostTemplate();

  const handleTemplateCardClick = (roomId: number, templateId: number) => {
    postPickeatMutation.mutate(
      { roomId, name: makePickeatName() },
      {
        onSuccess: code => {
          postTemplateMutation.mutate({ pickeatCode: code, templateId });
          navigate(generateRouterPath.pickeatDetail(code));
        },
        onError: () => {
          showToast({
            mode: 'ERROR',
            message: '투표 생성을 실패했습니다. 다시 시도해 주세요.',
          });
        },
      }
    );
  };

  const handleLocationCardClick = () => {
    navigate(generateRouterPath.pickeatWithLocation(roomId));
  };

  const CONTENT: Content[] = [
    {
      id: 1,
      name: '잠실역',
      imageUrl: '/images/carousel/subway_thumbnail.png',
      isTemplate: true,
      onClick: () => handleTemplateCardClick(roomId, 1),
    },
    {
      id: 2,
      name: '선릉역',
      imageUrl: '/images/carousel/subway_thumbnail.png',
      isTemplate: true,
      onClick: () => handleTemplateCardClick(roomId, 2),
    },
    {
      id: 3,
      name: '내 위치에서',
      imageUrl: '/images/carousel/map_thumbnail.png',
      isTemplate: false,
      onClick: () => handleLocationCardClick(),
    },
  ];

  const getCardContent = CONTENT.map(item => (
    <Card
      key={item.id}
      itemId={item.id}
      isWish={item.isTemplate}
      title={item.name}
      imageUrl={item.imageUrl}
      onClick={item.onClick}
      size="lg"
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
        <Carousel contentArr={getCardContent} />
      </S.BottomWrapper>
      <Footer />
    </S.Container>
  );
}

export default Main;

const floatUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }`;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;

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

    animation: ${floatUpDown} 1.5s ease-in-out infinite;
    transform: rotate(10deg);
  `,
  BibimImage: styled.img`
    position: absolute;
    top: 0;
    right: -30px;

    animation: ${floatUpDown} 2.5s ease-in-out infinite;
    transform: rotate(20deg);
  `,
  RamenImage: styled.img`
    position: absolute;
    bottom: 80px;
    left: -25px;

    animation: ${floatUpDown} 3.5s ease-in-out infinite;
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
