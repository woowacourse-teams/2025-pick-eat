import Button from '@components/actions/Button';

import { ApiError } from '@apis/apiClient';

import styled from '@emotion/styled';
import React from 'react';

import { getErrorMessageByCode } from '../../shared/utils/errorMapper';

type Props = { children: React.ReactNode; onReset?: () => void };
type State = { hasError: boolean; error: ApiError | null };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: ApiError) {
    return { hasError: true, error };
  }

  reset = () => {
    // 1) ErrorBoundary 상태 초기화
    this.setState({ hasError: false, error: null });
    console.log('error', this.state.error?.status, this.state.error?.body);
    // 2) React Query에도 reset 신호 전달
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const { code, message } = getErrorMessageByCode(this.state.error);
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
  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  SubTitle: styled.h2`
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  Description: styled.p``,
};
