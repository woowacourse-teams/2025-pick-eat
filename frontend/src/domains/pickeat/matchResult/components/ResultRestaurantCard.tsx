import Button from '@components/actions/Button';
import Share from '@components/assets/icons/Share';
import Chip from '@components/labels/Chip';

import { Restaurant } from '@apis/restaurant';

import { copyLink } from '@utils/copyLink';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

type Props = {
  restaurantData: Pick<
    Restaurant,
    'name' | 'pictureUrls' | 'placeUrl' | 'tags'
  >;
};

function ResultRestaurantCard({ restaurantData }: Props) {
  const { name, pictureUrls, placeUrl, tags } = restaurantData;
  return (
    <S.Container>
      <S.ImageBox>
        <S.Image
          src={pictureUrls[0] || './images/restaurant.png'}
          alt={name}
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = './images/restaurant.png';
          }}
        />
      </S.ImageBox>
      <S.BottomWrapper>
        <S.TitleBox>
          {tags.length > 0 && (
            <Chip key={tags[0]} variant="outlined" size="sm">
              {tags[0]}
            </Chip>
          )}
          <S.Name>{name}</S.Name>
        </S.TitleBox>
        <S.ButtonBox>
          <S.DetailBox>
            {placeUrl && (
              <Button
                color="primary"
                text="식당 상세 정보"
                onClick={() =>
                  placeUrl &&
                  window.open(placeUrl, '_blank', 'noopener,noreferrer')
                }
              />
            )}
          </S.DetailBox>
          <S.ShareBox onClick={() => copyLink(window.location.href)}>
            <Share color={THEME.PALETTE.gray[70]} size="sm" />
          </S.ShareBox>
        </S.ButtonBox>
      </S.BottomWrapper>
    </S.Container>
  );
}

export default ResultRestaurantCard;

const S = {
  Container: styled.div`
    width: 270px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
    overflow: hidden;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
  `,

  BottomWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: 0 ${({ theme }) => theme.PADDING.p5}
      ${({ theme }) => theme.PADDING.p8};
  `,
  TitleBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  ButtonBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  DetailBox: styled.div`
    width: 120px;
  `,
  ShareBox: styled.button`
    width: 30px;
    height: 30px;
  `,
  Name: styled.p`
    overflow: hidden;

    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.heading.medium};

    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  ImageBox: styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  `,
  Image: styled.img`
    width: 100%;
  `,
};
