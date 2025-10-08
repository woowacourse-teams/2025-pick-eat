import Cross from '@components/assets/icons/Cross';
import Badge from '@components/labels/Badge';

import { Wishes } from '@apis/wishlist';

import styled from '@emotion/styled';

type Props = {
  restaurantData: Wishes;
  onDelete: () => void;
};

function RestaurantCard({ restaurantData, onDelete }: Props) {
  const { tags, name, placeUrl, roadAddressName, pictures } = restaurantData;
  return (
    <S.Container>
      <S.Image
        src={pictures[0]?.imageDownloadUrl || '/images/restaurant.png'}
        alt={name}
      />

      <S.Info>
        <S.Top>
          {tags?.length > 0 && (
            <S.TagBox>
              {tags.map((tag: string) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </S.TagBox>
          )}

          <S.Name>{name}</S.Name>
        </S.Top>
        <S.Address>{roadAddressName}</S.Address>
        {placeUrl && (
          <S.Link href={placeUrl} target="_blank" rel="noopener noreferrer">
            메뉴 보러가기
          </S.Link>
        )}
      </S.Info>

      <S.Xicon onClick={onDelete}>
        <Cross size="xs" color="white" strokeWidth={4} />
      </S.Xicon>
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
    width: 100%;
    max-width: 312px;
    height: 122px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 20px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level2};
  `,
  Image: styled.img`
    width: 90px;
    height: 90px;
    border-radius: 20px;
    object-fit: cover;
  `,
  Info: styled.div`
    width: 170px;
    display: flex;
    flex-direction: column;
  `,
  Top: styled.div`
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

    font:
      600 16px/120% Pretendard,
      sans-serif;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  Address: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
  Link: styled.a`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font:
      400 14px/28px Pretendard,
      sans-serif;
  `,
  Xicon: styled.button`
    width: 28px;
    height: 28px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -10px;
    right: -10px;

    background-color: #f95f5f;
    border-radius: ${({ theme }) => theme.RADIUS.half};
  `,
};
