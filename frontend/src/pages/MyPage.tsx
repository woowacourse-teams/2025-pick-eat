import Profile from '@domains/account/components/Profile';

import { HEADER_HEIGHT } from '@components/layouts/Header';

import styled from '@emotion/styled';

function MyPage() {
  return (
    <S.Container>
      <Profile />
    </S.Container>
  );
}

export default MyPage;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
  `,
};
