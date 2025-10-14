import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';

import Chip from './labels/Chip';

type Props = {
  restaurantData: Restaurant;
};

function RestaurantCard({ restaurantData }: Props) {
  const { tags, name, placeUrl, pictureUrls } = restaurantData;
  return (
    <S.Container>
      <S.Image src={pictureUrls[0]} alt={name} />

      <S.Info>
        <S.Top>
          <S.TagBox>
            {tags.map((tag: string) => (
              <Chip key={tag} variant="outlined" size="sm">
                {tag}
              </Chip>
            ))}
          </S.TagBox>
          <S.Name>{name}</S.Name>
        </S.Top>

        {placeUrl && (
          <S.Link href={placeUrl} target="_blank" rel="noopener noreferrer">
            메뉴 보러가기
          </S.Link>
        )}
      </S.Info>
    </S.Container>
  );
}

export default RestaurantCard;

/*
  TODO
  공통
    - [] Container, Image radius theme에서 뽑아쓰기
    - [] Link, Name font theme에서 뽑아쓰기
  선호
    - [] 태그 없을 시 '카테고리' 태그 표시
    - [] like 버튼 + 투표 로직
  소거
    - [] x 버튼 + 소거 로직
  식당 등록
    - [] x 버튼 + 소거 로직
    - [] 주소 추가


  padding이 16 16 14 16이라 그냥 16으로 하고 height +2함
  Info height 85=>86으로 함

 */

const S = {
  Container: styled.div`
    width: 312px;
    height: 122px;

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 20px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};
  `,
  Image: styled.img`
    width: 90px;
    height: 90px;
    border-radius: 20px;
    object-fit: cover;
  `,
  Info: styled.div`
    width: 162px;
    height: 86px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  Link: styled.a`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font:
      400 14px/28px Pretendard,
      sans-serif;
  `,
};
