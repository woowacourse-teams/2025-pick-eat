import LikeButton from '@components/actions/LikeButton/LikeButton';
import Chip from '@components/labels/Chip';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';

type Props = {
  restaurant: Restaurant;
  liked: boolean;
  onLike: (id: number) => void;
  onUnlike: (id: number) => void;
};
function RestaurantItem({ restaurant, liked, onLike, onUnlike }: Props) {
  const {
    id,
    name,
    tags,
    likeCount,
    category,
    pictureUrls,
    distance,
    placeUrl,
  } = restaurant;

  const menuUrl = `${placeUrl}#menuInfo`;
  return (
    <S.Container>
      <S.Image
        src={pictureUrls[0] || './images/restaurant.png'}
        onError={e => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = './images/restaurant.png';
        }}
      />

      <S.Content>
        <S.TitleWrapper>
          <S.TagBox>
            {tags.length === 0 && <Chip>{category}</Chip>}
            {tags.map(tag => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </S.TagBox>
          <S.RestaurantName>{name}</S.RestaurantName>
        </S.TitleWrapper>

        <S.DetailBox>
          {distance && <S.DetailText>식당까지 {distance}m</S.DetailText>}
          {placeUrl && (
            <S.LinkButton
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              메뉴 보러가기
            </S.LinkButton>
          )}
        </S.DetailBox>
      </S.Content>
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

export default RestaurantItem;

const S = {
  Container: styled.div`
    width: 360px;

    height: 120px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
    overflow: hidden;
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
  `,

  Image: styled.img`
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    object-fit: cover;
  `,
  Content: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,

  TitleWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level1};
  `,
  TagBox: styled.div`
    height: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level2};
    overflow: hidden;
  `,
  RestaurantName: styled.a`
    max-width: 180px;
    overflow: hidden;

    padding-left: ${({ theme }) => theme.PADDING.px2};

    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  DetailBox: styled.div`
    display: flex;
    flex-direction: column;

    padding-left: ${({ theme }) => theme.PADDING.px2};
  `,
  DetailText: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
  LinkButton: styled.a`
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};

    &:hover {
      color: ${({ theme }) => theme.PALETTE.gray[70]};
      text-decoration: underline;
    }
  `,
};
