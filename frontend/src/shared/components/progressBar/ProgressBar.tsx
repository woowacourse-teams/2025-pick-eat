import styled from '@emotion/styled';

type Props = {
  total: number;
  current: number;
};

function ProgressBar({ total, current }: Props) {
  const percentage =
    total > 0 && current > 0 && current <= total ? (current / total) * 100 : 0;

  return <S.Track percentage={percentage} />;
}

export default ProgressBar;

const S = {
  Track: styled.div<{ percentage: number }>`
    width: 100%;
    height: 2px;

    background: linear-gradient(to right, #ffda1e 0%, #ffda1e 100%);
    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    background-size: ${({ percentage }) => percentage}% 100%;

    background-repeat: no-repeat;

    transition: background-size 0.5s ease;
  `,
};
