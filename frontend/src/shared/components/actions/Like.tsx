import styled from '@emotion/styled';

type Prop = {
  id: number;
  liked: boolean;
  count: number;
  onLike: (id: number) => void;
  onCancel: (id: number) => void;
};

function Like({ id, liked, count, onLike, onCancel }: Prop) {
  return (
    <S.Container>
      {liked ? (
        <S.Heart onClick={() => onCancel(id)}>♥</S.Heart>
      ) : (
        <S.Heart onClick={() => onLike(id)}>♡</S.Heart>
      )}
      <p>{count}</p>
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
  `,
};
