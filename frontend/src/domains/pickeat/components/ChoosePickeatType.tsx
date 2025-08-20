import ChooseRoomWishlist from '@domains/room/components/ChooseRoomWishlist';

import Button from '@components/actions/Button';
import Location from '@components/assets/icons/Location';
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
  const handleWishlistButtonClick = () => {
    if (!loggedIn) {
      alert('로그인 후 이용해 주세요!');
      return;
    }

    handleOpenModal();
  };
  const { opened, mounted, handleCloseModal, handleOpenModal } = useModal();
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const roomsData = useMemo(() => rooms.get(), []);

  return (
    <>
      <S.ButtonWrapper>
        <Button
          text="위시리스트 선택"
          leftIcon="🤍"
          onClick={handleWishlistButtonClick}
        />
        <Button
          text="위치/반경 선택"
          color="secondary"
          leftIcon={<Location size="sm" color="black" />}
          onClick={() => navigate(ROUTE_PATH.PICKEAT_WITH_LOCATION)}
        />
      </S.ButtonWrapper>

      <Modal
        opened={opened}
        mounted={mounted}
        onClose={handleCloseModal}
        onUnmount={handleCloseModal}
      >
        <ErrorBoundary>
          <Suspense fallback={<div>로딩 중..</div>}>
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
