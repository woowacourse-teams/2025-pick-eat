import Button from '@components/actions/Button';

import { useShowToast } from '@provider/ToastProvider';

import * as Sentry from '@sentry/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const MESSAGE =
  '요청이 너무 많습니다. 몇 분 후에 다시 시도해 주세요.';

type Props = {
  error?: Error;
  onRefresh?: () => void;
};

function TooManyRequestErrorPage({ error, onRefresh }: Props) {
  const showToast = useShowToast();

  useEffect(() => {
    showToast({ mode: 'ERROR', message: MESSAGE });
  }, [showToast]);

  useEffect(() => {
    if (error) {
      Sentry.captureException(error);
    }
  }, [error]);

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>요청이 너무 잦습니다</S.Title>
        <S.Description>{MESSAGE}</S.Description>
        <Button text="새로고침" onClick={handleRefresh} />
        <S.SupportText>문제 지속 시 지원팀 문의</S.SupportText>
      </S.Wrapper>
    </S.Container>
  );
}

export default TooManyRequestErrorPage;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Wrapper: styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  Title: styled.p`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Description: styled.p`
    text-align: center;
  `,
  SupportText: styled.p`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.PALETTE.gray[40]};
  `,
};
