import ChooseRoomWishlist from '@domains/room/components/ChooseRoomWishlist';

import Button from '@components/actions/Button';
import Location from '@components/assets/icons/Location';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { useAuth } from '@domains/login/context/AuthProvider';

import { rooms } from '@apis/rooms';

import { ROUTE_PATH } from '@routes/routePath';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ErrorBoundary } from '@sentry/react';
import { Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router';

function ChoosePickeatType() {
  const { opened, mounted, handleCloseModal, handleOpenModal } = useModal();
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const roomsData = useMemo(() => rooms.get(), []);

  const handleWishlistButtonClick = () => {
    if (!loggedIn) {
      alert('로그인 후 이용해 주세요!');
      navigate(ROUTE_PATH.LOGIN);
      return;
    }

    handleOpenModal();
  };

  return (
    <>
      <S.ButtonWrapper>
        <Button
          text="근처에서 픽잇 시작"
          color="gray"
          leftIcon={<Location size="sm" color="black" />}
          onClick={() => navigate(ROUTE_PATH.PICKEAT_WITH_LOCATION)}
        />
        <Button
          text="찜 목록 선택"
          color="gray"
          leftIcon="❤️"
          onClick={handleWishlistButtonClick}
        />
      </S.ButtonWrapper>

      <Modal
        opened={opened}
        mounted={mounted}
        onClose={handleCloseModal}
        onUnmount={handleCloseModal}
      >
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ChooseRoomWishlist roomsData={roomsData} />
          </Suspense>
        </ErrorBoundary>
      </Modal>
    </>
  );
}

export default ChoosePickeatType;

const S = {
  ButtonWrapper: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};

    ${setMobileStyle(css`
      flex-direction: column;
    `)}
  `,
};
