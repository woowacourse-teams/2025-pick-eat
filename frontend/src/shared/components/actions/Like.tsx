import styled from '@emotion/styled';
import { useRef } from 'react';

type Prop = {
  id: number;
  liked: boolean;
  count: number;
  onLike: (id: number) => void;
  onUnlike: (id: number) => void;
};

function Like({ id, liked, count, onLike, onUnlike }: Prop) {
  const explosionRef = useRef<HTMLDivElement>(null);

  const triggerExplosion = () => {
    const explosion = explosionRef.current;
    if (!explosion) return;

    const hearts = explosion.querySelectorAll('span');
    hearts.forEach((heart, i) => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 20 + Math.random() * 20;
      const x = Math.cos(angle) * distance + 'px';
      const y = Math.sin(angle) * distance + 'px';

      heart.style.setProperty('--x', x);
      heart.style.setProperty('--y', y);

      heart.style.animation = 'none';
      void heart.offsetWidth;
      heart.style.animation = `explode 1500ms ease-out ${i * 50}ms`;
    });
  };

  const handleClick = () => {
    if (liked) {
      onUnlike(id);
    } else {
      onLike(id);
      triggerExplosion();
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

export default Like;

const S = {
  Container: styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
  `,

  HeartWrapper: styled.div`
    position: relative;
  `,

  Heart: styled.p`
    cursor: pointer;
    font: ${({ theme }) => theme.FONTS.body.large};
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
    position: absolute;
    width: 8px;
    height: 8px;
    background: red;
    transform: rotate(45deg);
    opacity: 0;
    border-radius: 50% 50% 0 0;
    animation: none;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: red;
      border-radius: 50%;
    }

    &::before {
      top: -4px;
      left: 0;
    }

    &::after {
      left: -4px;
      top: 0;
    }

    @keyframes explode {
      0% {
        transform: translate(0, 0) scale(1) rotate(45deg);
        opacity: 1;
      }
      100% {
        transform: translate(var(--x), var(--y)) scale(0.5) rotate(45deg);
        opacity: 0;
      }
    }
  `,
};
