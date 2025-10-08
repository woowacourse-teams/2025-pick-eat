import styled from '@emotion/styled';

type Props = {
  total: number;
  current: number;
};

function ProgressBar({ total, current }: Props) {
  const progress =
    total > 0 && current > 0 && current <= total ? current / total : 0;

  return <S.Track progress={progress} />;
}

export default ProgressBar;

const S = {
  Track: styled.div<{ progress: number }>`
    width: 100%;
    height: 2px;

    background: linear-gradient(to right, #ffda1e 0%, #ffda1e 100%);
    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    background-size: ${({ progress }) => progress * 100}% 100%;

    background-repeat: no-repeat;

    transition: background-size 0.5s ease;
  `,
};
