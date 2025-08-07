import LikeButton from '@components/actions/LikeButton/LikeButton';
import Badge from '@components/labels/Badge';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';

type Props = {
  restaurant: Restaurant;
  liked: boolean;
  onLike: (id: string) => void;
  onUnlike: (id: string) => void;
};

function PreferRestaurantItem({ restaurant, liked, onLike, onUnlike }: Props) {
  const { id, name, tags, likeCount, category } = restaurant;

  return (
    <S.Container liked={liked}>
      <S.CardContent>
        <S.TagBox>
          {tags.length === 0 && <Badge>{category}</Badge>}
          {tags.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </S.TagBox>

        <S.TitleWrapper>
          <S.RestaurantName>{name}</S.RestaurantName>
        </S.TitleWrapper>
      </S.CardContent>

      <LikeButton
        id={id}
        count={likeCount}
        onLike={() => onLike(id)}
        onUnlike={() => onUnlike(id)}
        liked={liked}
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

    padding: ${({ theme }) => theme.PADDING.p6};

    background-color: ${({ theme, liked }) =>
      liked ? theme.PALETTE.secondary[5] : theme.PALETTE.secondary[0]};

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: ${({ theme }) => theme.RADIUS.medium3};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};
    transform: scale(1);
  `,

  CardContent: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    filter: none;
    opacity: 1;
  `,

  TagBox: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level2};
  `,

  TitleWrapper: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Distance: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  RestaurantName: styled.a`
    max-width: 180px;
    overflow: hidden;

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    white-space: nowrap;
    text-overflow: ellipsis;
  `,

  LinkButton: styled.a`
    width: fit-content;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.PALETTE.gray[70]};
      text-decoration: underline;
    }
  `,
};
