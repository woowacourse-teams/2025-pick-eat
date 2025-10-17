import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

type Props = {
  total: number;
  current: number;
  children: ReactNode;
} & ComponentProps<'button'>;

function ProgressButton({ total, current, children, ...props }: Props) {
  const percentage =
    total > 0 && current > 0 && current <= total ? (current / total) * 100 : 0;

  return (
    <S.Container>
      <S.Button percentage={percentage} {...props}>
        {' '}
        {children}
      </S.Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 480px;
    height: 52px;
    ${({ theme }) => theme.POSITION.fixedCenter};
    bottom: calc(
      env(safe-area-inset-bottom) + ${({ theme }) => theme.PADDING.p6}
    );

    padding: 0 ${({ theme }) => theme.PADDING.p5};

    transform: translateX(-50%);
  `,

  Button: styled.button<{ percentage: number }>`
    width: 100%;
    height: 100%;

    background: linear-gradient(
      to right,
      ${({ theme }) => theme.PALETTE.primary[50]} 0%,
      ${({ theme }) => theme.PALETTE.primary[50]} 100%
    );
    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    background-size: ${({ percentage }) => percentage}% 100%;
    background-repeat: no-repeat;

    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.body.large_bold};

    transition: background-size 0.3s ease;
    border-radius: ${({ theme }) => theme.RADIUS.small};
  `,
};

export default ProgressButton;
