import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useExplosion } from './hooks/useExplosion';

type Prop = {
  id: number;
  count: number;
  onLike: (id: number) => void;
  onUnlike: (id: number) => void;
  liked: (id: number) => boolean;
};

function LikeButton({ id, count, onLike, onUnlike, liked }: Prop) {
  const { explosionRef, trigger, removeAnimation } = useExplosion();

  const handleClick = () => {
    if (liked(id)) {
      onUnlike(id);
    } else {
      trigger();
      onLike(id);
    }
  };

  useEffect(() => {
    removeAnimation();
  }, []);

  return (
    <S.Container>
      <S.HeartWrapper>
        <S.Heart onClick={handleClick}>{liked(id) ? '❤️' : '♡'}</S.Heart>
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
    justify-content: space-between;
    align-items: center;

    gap: 4px;
  `,

  HeartWrapper: styled.div`
    position: relative;
  `,

  Heart: styled.p`
    font: ${({ theme }) => theme.FONTS.body.large};
    cursor: pointer;
    user-select: none;
  `,

  Count: styled.p`
    font: ${({ theme }) => theme.FONTS.body.large};
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

    background: red;

    animation: none;
    border-radius: 50% 50% 0 0;
    opacity: 0;
    transform: rotate(45deg);

    &::before,
    &::after {
      width: 8px;
      height: 8px;
      position: absolute;

      background: red;
      border-radius: 50%;
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
