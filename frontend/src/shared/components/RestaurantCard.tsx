import { Restaurant } from '@apis/restaurant';

import { restaurantThumbnail } from '@utils/getThumbnailByTag';

import styled from '@emotion/styled';
import React from 'react';

import Chip from './labels/Chip';
import SkeletonImage from './skeleton/SkeletonImage';

export type RestaurantCardData = Pick<
  Restaurant,
  | 'id'
  | 'name'
  | 'tags'
  | 'placeUrl'
  | 'category'
  | 'pictureUrls'
  | 'roadAddressName'
  | 'category'
>;

type Props = {
  restaurantData: RestaurantCardData;
};

function RestaurantCard({ restaurantData }: Props) {
  const { tags, name, placeUrl, pictureUrls, roadAddressName, category } =
    restaurantData;
  const menuUrl = `${placeUrl}#menuInfo`;

  const defaultImage = restaurantThumbnail(category).get(tags[0]);

  return (
    <S.Container aria-label={`${name} ${tags.join('')} 메뉴가 있습니다.`}>
      <SkeletonImage
        width="90px"
        height="90px"
        aria-hidden="true"
        src={pictureUrls[0] || defaultImage}
        alt={name}
        loading="lazy"
      />
      <S.Info aria-hidden="true">
        <S.Top>
          <S.TagBox>
            {tags.length > 0 ? (
              tags.map((tag: string) => (
                <Chip key={tag} variant="outlined" size="sm">
                  {tag}
                </Chip>
              ))
            ) : (
              <Chip variant="outlined" size="sm">
                {category}
              </Chip>
            )}
          </S.TagBox>
          <S.Name>{name}</S.Name>
        </S.Top>
        <S.Address>{roadAddressName}</S.Address>
        {placeUrl && (
          <S.Link href={menuUrl} target="_blank" rel="noopener noreferrer">
            메뉴 보러가기
          </S.Link>
        )}
      </S.Info>
    </S.Container>
  );
}

export default RestaurantCard;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 350px;
    height: 122px;

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 20px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};
  `,
  Info: styled.div`
    width: 162px;
    height: 96px;
    display: flex;
    flex-direction: column;
  `,
  Top: styled.div`
    width: 156px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level1};
  `,
  TagBox: styled.div`
    width: 100%;
    height: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level2};
    overflow: hidden;
  `,
  Name: styled.span`
    overflow: hidden;

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  Address: styled.span`
    overflow: hidden;

    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  Link: styled.a`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
    cursor: pointer;
  `,
};
