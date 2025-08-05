import Profile from '@domains/account/components/Profile';
import RoomList from '@domains/account/components/RoomList';

import Button from '@components/actions/Button';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import styled from '@emotion/styled';

function MyPage() {
  return (
    <S.Container>
      <Profile />
      <RoomList />
      <Button text="방생성" />
    </S.Container>
  );
}

export default MyPage;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    padding: 0 ${({ theme }) => theme.PADDING.p7};

    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
};
