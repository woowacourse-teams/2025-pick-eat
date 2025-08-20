import LikeButton from '@components/actions/LikeButton/LikeButton';
import Badge from '@components/labels/Badge';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';

type Props = {
  restaurant: Restaurant;
  liked: boolean;
  onLike: (id: number) => void;
  onUnlike: (id: number) => void;
};

function PreferRestaurantItem({ restaurant, liked, onLike, onUnlike }: Props) {
  const {
    id,
    name,
    tags,
    likeCount,
    category,
    type,
    pictureUrls,
    distance,
    placeUrl,
  } = restaurant;

  return (
    <S.Container liked={liked}>
      {type === 'WISH' && (
        <S.Image
          src={pictureUrls[0] || './images/restaurant.png'}
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = './images/restaurant.png';
          }}
        />
      )}
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
        {type === 'LOCATION' && (
          <>
            <S.Distance>식당까지 {distance}m</S.Distance>
            <S.LinkButton
              href={placeUrl || ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              식당 상세 정보 보기
            </S.LinkButton>
          </>
        )}
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
    gap: ${({ theme }) => theme.GAP.level4};

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

  Image: styled.img`
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    object-fit: cover;
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

  //TODO:+버튼 누르면 태그 다 보이게? 상의해봐야 할 듯
  TagBox: styled.div`
    height: 26px;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level2};
    overflow: hidden;
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
