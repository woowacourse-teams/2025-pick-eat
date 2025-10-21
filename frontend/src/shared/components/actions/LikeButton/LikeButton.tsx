import { restaurantQuery } from '@apis/restaurant';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

import { useExplosion } from './hooks/useExplosion';

type Props = {
  id: number;
  count: number;
  liked: boolean;
};

function LikeButton({ id, count, liked }: Props) {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const { mutate: mutateLike } = restaurantQuery.usePatchLike(pickeatCode);
  const { mutate: mutateUnlike } = restaurantQuery.usePatchUnlike(pickeatCode);

  const { explosionRef, trigger, removeAnimation } = useExplosion();

  const handleClick = () => {
    removeAnimation();
    if (liked) {
      mutateUnlike(id);
    } else {
      trigger();
      mutateLike(id);
    }
  };

  return (
    <S.Container>
      <S.HeartWrapper>
        <S.Heart onClick={handleClick}>{liked ? '❤️' : '♡'}</S.Heart>
        <S.Explosion ref={explosionRef}>
          {Array.from({ length: 5 }).map((_, i) => (
            <S.SmallHeart key={i} />
          ))}
        </S.Explosion>
      </S.HeartWrapper>
      <S.Count>{count}</S.Count>
    </S.Container>
  );
}

export default LikeButton;

const S = {
  Container: styled.div`
    width: 36px;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;

    gap: ${({ theme }) => theme.GAP.level2};
  `,

  HeartWrapper: styled.div`
    position: relative;
    cursor: pointer;
  `,

  Heart: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.xlarge};
    cursor: pointer;
    user-select: none;
  `,

  Count: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  Explosion: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  `,

  SmallHeart: styled.span`
    width: 8px;
    height: 8px;
    position: absolute;

    background: ${({ theme }) => theme.PALETTE.red[40]};

    animation: none;
    border-radius: ${({ theme }) => theme.RADIUS.half}
      ${({ theme }) => theme.RADIUS.half} 0 0;
    opacity: 0;
    transform: rotate(45deg);

    &::before,
    &::after {
      width: 8px;
      height: 8px;
      position: absolute;

      background: ${({ theme }) => theme.PALETTE.red[40]};
      border-radius: ${({ theme }) => theme.RADIUS.half};
      content: '';
    }

    &::before {
      top: -4px;
      left: 0;
    }

    &::after {
      top: 0;
      left: -4px;
    }

    @keyframes explode {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1) rotate(45deg);
      }

      100% {
        opacity: 0;
        transform: translate(var(--x), var(--y)) scale(0.5) rotate(45deg);
      }
    }
  `,
};
