import styled from '@emotion/styled';
import { ReactNode } from 'react';

type Props = {
  percentage: number;
  icon?: ReactNode;
};

function ProgressBar({ percentage, icon }: Props) {
  const safePercentage = Math.min(100, Math.max(0, percentage));

  return (
    <S.Track>
      <S.Progress percentage={safePercentage} />
      <S.IconWrapper percentage={safePercentage}>{icon}</S.IconWrapper>
    </S.Track>
  );
}

export default ProgressBar;

const S = {
  Track: styled.div`
    width: 100%;
    height: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    background-color: ${({ theme }) => theme.PALETTE.gray[20]};
  `,
  Progress: styled.div<{ percentage: number }>`
    width: ${({ percentage }) => `${percentage}`}%;
    height: 6px;
    position: absolute;

    background-color: ${({ theme }) => theme.PALETTE.primary[60]};
    border-radius: ${({ theme }) => theme.RADIUS.medium2};
    transition: width 0.5s ease;
  `,
  IconWrapper: styled.div<{ percentage: number }>`
    width: ${({ percentage }) => `${percentage}`}%;
    display: flex;
    justify-content: flex-end;
    z-index: ${({ theme }) => theme.Z_INDEX.fixed};

    font: ${({ theme }) => theme.FONTS.heading.large};
    transition: width 0.5s ease;
  `,
};
