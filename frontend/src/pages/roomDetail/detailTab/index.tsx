import ContentTitle from '@domains/room/components/RoomDetailTab/components/ContentTitle';
import IncludeMemberList from '@domains/room/components/RoomDetailTab/IncludeMemberList';
import ProgressPickeat from '@domains/room/components/RoomDetailTab/ProgressPickeat';
import Card from '@domains/wishlist/components/Card';

import LoadingSpinner from '@components/assets/LoadingSpinner';
import Carousel from '@components/Carousel';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { pickeatQuery } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

type Content = {
  id: number;
  name: string;
  imageUrl: string;
  errorMessage?: string;
  isTemplate: boolean;
  onClick: () => void;
};

function DetailTab() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? 0;
  const navigate = useNavigate();
  const showToast = useShowToast();

  const postPickeatMutation = pickeatQuery.usePostPickeat();
  const postWishMutation = pickeatQuery.usePostWish();
  const postTemplateMutation = pickeatQuery.usePostTemplate();

  const handleWishCardClick = (id: number) => {
    postPickeatMutation.mutate(
      { roomId, name: makePickeatName() },
      {
        onSuccess: code => {
          postWishMutation.mutate({ roomId: id, pickeatCode: code });
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
      id: 4,
      name: '즐겨찾기에서',
      imageUrl: '/images/carousel/room_favorite_thumbnail.png',
      isTemplate: false,
      onClick: () => handleWishCardClick(roomId),
    },
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
      size="sm"
    />
  ));

  return (
    <S.Container>
      <Suspense fallback={<LoadingSpinner />}>
        <S.ContentSection>
          <ContentTitle
            title="투표 시작하기"
            description="방 멤버와 함께 투표를 시작해보세요!"
          />
          <Carousel contentArr={getCardContent} />
        </S.ContentSection>
        <S.ContentSection>
          <ErrorBoundary>
            <IncludeMemberList />
          </ErrorBoundary>
        </S.ContentSection>
        <S.ContentSection>
          <ErrorBoundary>
            <ProgressPickeat />
          </ErrorBoundary>
        </S.ContentSection>
      </Suspense>
    </S.Container>
  );
}

export default DetailTab;

const S = {
  Container: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level8};

    margin-top: ${({ theme }) => theme.PADDING.p8};
  `,
  ContentSection: styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  ButtonWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
