import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { ComponentProps } from 'react';

type Props = {
  width?: string;
  height?: string;
  borderRadius?: string;
} & ComponentProps<'img'>;

function SkeletonImage({
  width = '100%',
  height = '100%',
  borderRadius = THEME.RADIUS.medium,

  ...props
}: Props) {
  return (
    <S.Skeleton
      width={width}
      height={height}
      borderRadius={borderRadius}
      onError={e => {
        e.currentTarget.outerHTML = `
      <div style="width:${width};height:${height};border-radius:${borderRadius};background:#f0f0f0;display:flex;align-items:center;justify-content:center;color:#ccc;font-size:12px">
        No Image
      </div>`;
      }}
      {...props}
    >
      <S.Image {...props} />
    </S.Skeleton>
  );
}

export default SkeletonImage;

const S = {
  Skeleton: styled.div<{
    width: string;
    height: string;
    borderRadius: string;
  }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    border-radius: ${({ borderRadius }) => borderRadius};
    overflow: hidden;
    position: relative;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.PALETTE.gray[10]} 25%,
      ${({ theme }) => theme.PALETTE.gray[5]} 50%,
      ${({ theme }) => theme.PALETTE.gray[10]} 75%
    );
    background-size: 200% 100%;
    animation: loading 1.5s ease-in-out infinite;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `,
  Image: styled.img``,
};
