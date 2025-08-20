import Button from '@components/actions/Button';
import Modal from '@components/modal/Modal';

import { restaurant, Restaurant } from '@apis/restaurant';

import { useFlip } from '@hooks/useFlip';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { use } from 'react';
import { useNavigate } from 'react-router';

import { useOptimisticLike } from '../hooks/useOptimisticLike';
import usePreferRestaurant from '../hooks/usePreferRestaurant';

import PreferRestaurantItem from './PreferRestaurantItem';

type Props = {
  preferRestaurantListPromise: Promise<Restaurant[]>;
};

function PreferRestaurantList({ preferRestaurantListPromise }: Props) {
  const initialData = use(preferRestaurantListPromise);
  const {
    isOptimisticLike,
    syncOptimisticLikes,
    addOptimisticLike,
    removeOptimisticLike,
  } = useOptimisticLike(initialData);
  const { restaurantList, updateLikeCount } = usePreferRestaurant(
    initialData,
    syncOptimisticLikes
  );

  const { itemRefs } = useFlip(restaurantList);
  const navigate = useNavigate();

  const handleLike = async (id: number) => {
    addOptimisticLike(id);
    updateLikeCount(id, +1);

    try {
      restaurant.patchLike(id);
    } catch (error) {
      removeOptimisticLike(id);
      updateLikeCount(id, -1);

      console.log('좋아요 실패:', error);
    }
  };

  const handleUnlike = async (id: number) => {
    removeOptimisticLike(id);
    updateLikeCount(id, -1);

    try {
      restaurant.patchUnlike(id);
    } catch (error) {
      addOptimisticLike(id);
      updateLikeCount(id, +1);
      console.error('좋아요 취소 실패:', error);
    }
  };

  return (
    <S.Container>
      {!restaurantList.length && (
        <Modal
          opened={true}
          mounted={true}
          onClose={() => {}}
          closeButton={false}
          size="sm"
        >
          <S.AlertContainer>
            <S.PointText>이런!😥</S.PointText>
            <S.Text> 모든 음식점이 소거되어 픽잇이 종료 되었습니다.</S.Text>
            <Button
              text="메인 페이지로 이동"
              color="gray"
              onClick={() => navigate(ROUTE_PATH.MAIN)}
            />
          </S.AlertContainer>
        </Modal>
      )}

      {restaurantList.map((restaurant: Restaurant) => (
        <S.ItemWrapper
          key={restaurant.id}
          ref={el => {
            if (el) itemRefs.current.set(restaurant.id, el);
          }}
        >
          <PreferRestaurantItem
            restaurant={restaurant}
            liked={isOptimisticLike(restaurant.id)}
            onLike={handleLike}
            onUnlike={handleUnlike}
          />
        </S.ItemWrapper>
      ))}
    </S.Container>
  );
}

export default PreferRestaurantList;

const S = {
  Container: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.GAP.level5};
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));

    padding: ${({ theme }) => theme.PADDING.p5};
  `,

  ItemWrapper: styled.div`
    overflow-anchor: none;
  `,

  AlertContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  PointText: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
    color: ${({ theme }) => theme.PALETTE.gray[40]};
  `,

  Text: styled.span`
    color: black;
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
