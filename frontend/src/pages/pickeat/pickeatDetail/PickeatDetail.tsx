import PickeatInfo from '@domains/pickeat/components/PickeatInfo';

import VisuallyHiddenWithFocus from '@components/accessibility/VisuallyHiddenWithFocus';
import ErrorBoundaryWithSuspense from '@components/errors/ErrorBoundaryWithSuspense';

import styled from '@emotion/styled';

function PickeatDetail() {
  return (
    <S.Container>
      <VisuallyHiddenWithFocus>입장 페이지 입니다.</VisuallyHiddenWithFocus>
      <ErrorBoundaryWithSuspense>
        <PickeatInfo />
      </ErrorBoundaryWithSuspense>
    </S.Container>
  );
}
export default PickeatDetail;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: ${({ theme }) => theme.LAYOUT.headerHeight};
  `,
};
