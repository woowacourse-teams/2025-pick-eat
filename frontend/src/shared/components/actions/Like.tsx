import { usePreferRestaurantContext } from '@domains/preferRestaurant/context/PreferRestaurantProvider';

import { useExplosion } from '@hooks/useExplosion';

import styled from '@emotion/styled';

type Prop = {
  id: number;
  count: number;
};

function Like({ id, count }: Prop) {
  const { handleLike, handleUnlike, liked } = usePreferRestaurantContext();

  const { explosionRef, trigger } = useExplosion();

  const handleClick = () => {
    if (liked(id)) {
      handleUnlike(id);
    } else {
      trigger();
      handleLike(id);
    }
  };

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

export default Like;

const S = {
  Container: styled.div`
    display: flex;
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
