import styled from '@emotion/styled';

type Prop = {
  id: number;
  liked: boolean;
  count: number;
  onLike: (id: number) => void;
  onUnlike: (id: number) => void;
};

function Like({ id, liked, count, onLike, onUnlike }: Prop) {
  return (
    <S.Container>
      {liked ? (
        <S.Heart onClick={() => onUnlike(id)}>♥</S.Heart>
      ) : (
        <S.Heart onClick={() => onLike(id)}>♡</S.Heart>
      )}
      <S.Heart>{count}</S.Heart>
    </S.Container>
  );
}

export default Like;

const S = {
  Container: styled.div`
    display: flex;
    gap: 4px;
  `,

  Heart: styled.p`
    cursor: pointer;
    font: ${({ theme }) => theme.FONTS.body.large};
  `,
};
