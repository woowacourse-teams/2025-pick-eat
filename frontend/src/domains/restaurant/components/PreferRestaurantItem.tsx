import Like from '@components/actions/Like';

import styled from '@emotion/styled';

type Prop = {
  id: number;
  name: string;
  //   category: '한식' | '중식' | '일식' | '양식' | '기타';
  category: string;
  distance: number;
  likeCount: number;
  liked: boolean;
  onLike: (id: number) => void;
  onUnlike: (id: number) => void;
};

function PreferRestaurantItem({
  id,
  name,
  //   category,
  distance,
  likeCount,
  liked,
  onLike,
  onUnlike,
}: Prop) {
  return (
    <S.Container liked={liked}>
      <S.CardContent>
        <S.TitleWrapper>
          <S.RestaurantName>{name}</S.RestaurantName>
          {/* <Badge>{category}</Badge> */}
        </S.TitleWrapper>
        <span>식당까지 {distance}m</span>
        <S.LinkButton
          //   href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          식당 상세 정보 보기
        </S.LinkButton>
      </S.CardContent>
      <Like
        id={id}
        liked={liked}
        count={likeCount}
        onLike={onLike}
        onUnlike={onUnlike}
      />
    </S.Container>
  );
}

export default PreferRestaurantItem;

const S = {
  Container: styled.div<{ liked: boolean }>`
    width: 312px;
    height: fit-content;
    display: flex;

    align-items: flex-end;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 20px #00000014;
    transform: scale(1);
    padding: 20px;

    background-color: ${({ theme, liked }) =>
      liked ? theme.PALLETE.secondary[5] : theme.PALLETE.secondary[0]};

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
  `,

  CardContent: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    filter: none;
    opacity: 1;
  `,

  TitleWrapper: styled.div`
    display: flex;
    gap: 8px;
  `,

  RestaurantName: styled.a`
    max-width: 180px;
    overflow: hidden;

    color: #1e293b;
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    white-space: nowrap;
    text-overflow: ellipsis;
  `,

  LinkButton: styled.a`
    align-items: center;
    gap: 4px;
    width: fit-content;

    color: ${({ theme }) => theme.PALLETE.gray[50]};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.PALLETE.gray[70]};
      text-decoration: underline;
    }
  `,
};
