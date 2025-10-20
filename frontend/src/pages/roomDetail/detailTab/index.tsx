import IncludeMemberList from '@domains/room/components/RoomDetailTab/IncludeMemberList';
import PickeatCarousel from '@domains/room/components/RoomDetailTab/PickeatCarousel';
import ProgressPickeat from '@domains/room/components/RoomDetailTab/ProgressPickeat';

import LoadingSpinner from '@components/assets/LoadingSpinner';

import styled from '@emotion/styled';
import { ErrorBoundary } from '@sentry/react';
import { Suspense } from 'react';

function DetailTab() {
  return (
    <S.Container>
      <Suspense fallback={<LoadingSpinner />}>
        <S.ContentSection>
          <PickeatCarousel />
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
