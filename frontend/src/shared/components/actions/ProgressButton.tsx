import styled from '@emotion/styled';
import { ComponentProps } from 'react';

type Props = {
  text: string;
  total: number;
  current: number;
} & ComponentProps<'button'>;

function ProgressButton({ text, total, current, ...props }: Props) {
  const percentage =
    total > 0 && current > 0 && current <= total ? (current / total) * 100 : 0;

  return (
    <S.Container percentage={percentage} {...props}>
      {text}
    </S.Container>
  );
}

const S = {
  //TODO: 색, 폰트 theme에서 뽑아쓰기
  Container: styled.button<{ percentage: number }>`
    width: 90%;
    height: 52px;

    position: fixed;
    bottom: calc(
      env(safe-area-inset-bottom) + ${({ theme }) => theme.PADDING.p6}
    );
    left: 50%;
    z-index: ${({ theme }) => theme.Z_INDEX.fixed};

    background: linear-gradient(to right, #ffda1e 0%, #ffda1e 100%);
    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    background-size: ${({ percentage }) => percentage}% 100%;
    background-repeat: no-repeat;

    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font:
      600 17px/150% Pretendard,
      sans-serif;

    transition: background-size 0.3s ease;
    border-radius: 12px;
    transform: translateX(-50%);
  `,
};

export default ProgressButton;
