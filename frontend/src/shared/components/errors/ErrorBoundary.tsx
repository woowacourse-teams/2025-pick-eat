import Button from '@components/actions/Button';

import { ApiError, ClientRateLimitError } from '@apis/apiClient';

import styled from '@emotion/styled';
import { Component, ReactNode } from 'react';

import { getErrorMessageByCode } from '../../utils/errorMapper';
import TooManyRequestErrorPage from './TooManyRequestErrorPage';

type Props = { children: ReactNode; onReset?: () => void };
type State = {
  hasError: boolean;
  error: Error | null;
  errorType?: 'clientRateLimit';
};

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    if (error instanceof ClientRateLimitError) {
      return { hasError: true, error, errorType: 'clientRateLimit' };
    }
    return { hasError: true, error };
  }

  reset = () => {
    this.setState({ hasError: false, error: null, errorType: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.state.errorType === 'clientRateLimit') {
        return (
          <TooManyRequestErrorPage
            error={this.state.error}
            onRefresh={this.reset}
          />
        );
      }
      const { code, message } = getErrorMessageByCode(
        this.state.error as ApiError
      );
      return (
        <S.Container>
          <S.Wrapper>
            <S.Title>😱오류가 발생했습니다.😵</S.Title>
            <S.SubTitle>{code}</S.SubTitle>
            <S.Description>{message}</S.Description>
            <Button text="새로고침" onClick={this.reset} />
          </S.Wrapper>
        </S.Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

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
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  Title: styled.p`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  SubTitle: styled.p`
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  Description: styled.p``,
};
