import NewButton from '@components/actions/NewButton';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { monitor } from '@utils/monitor';

import styled from '@emotion/styled';
import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';


type Props = {
  error?: Error;
};

function TooManyRequestErrorPage({ error }: Props) {
  const showToast = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    showToast({ mode: 'ERROR', message: '잠시 후 다시 시도해주세요.' });
  }, [showToast]);

  useEffect(() => {
    if (error) {
      Sentry.captureException(error);
    }
  }, [error]);

  const goToMain = () => {
    navigate(ROUTE_PATH.MAIN);
  };


  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>너무 많은 요청이 왔어요!</S.Title>
        <S.Description>원활한 서비스 이용을 위해 잠시 접속을 제한하고 있어요. 잠시 후 다시 시도해 주세요.</S.Description>
        <NewButton onClick={goToMain}>메인으로 돌아가기</NewButton>
        <S.SupportButton type="button" onClick={monitor.openReportForm}>
          문제 지속 시 지원팀 문의
        </S.SupportButton>
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
  SupportButton: styled.button`
    padding: 0;
    border: none;

    background: none;

    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font-size: 0.875rem;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.PALETTE.gray[60]};
    }
  `,
};
