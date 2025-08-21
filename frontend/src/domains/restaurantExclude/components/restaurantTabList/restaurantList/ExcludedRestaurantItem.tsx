import Badge from '@components/labels/Badge';


import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';

type Props = Pick<Restaurant,
 'name' | 'tags' | 'distance'
>;

function ExcludedRestaurantItem({ name, tags, distance }: Props) {

  return (
    <S.Container>
      <S.CardContainer>
        <S.CardContent>
          <S.TitleWrapper>
            <S.TagBox>
              {(tags ?? []).map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </S.TagBox>
            <S.RestaurantName>{name}</S.RestaurantName>
          </S.TitleWrapper>
          <S.DetailBox>
            <S.DetailText>식당까지 {distance}m</S.DetailText>
            <S.LinkButton>
              메뉴 보러가기
            </S.LinkButton>
          </S.DetailBox>
        </S.CardContent>
        <S.Overlay>
        <S.OverlayText>누군가에 의해 제외된 식당입니다</S.OverlayText>
        </S.Overlay>
      </S.CardContainer>
    </S.Container>
  );
}

export default ExcludedRestaurantItem;

const S = {
  Container: styled.div`
    width: 312px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    position: relative;

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};

    cursor: not-allowed;
    transform: scale(0.95);
  `,
  CardContainer: styled.div`
    width: 100%;
    height: 120px;
    overflow: hidden;
    position: relative;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 10px;
  `,
  CardContent: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    padding: ${({ theme }) => theme.PADDING.p5};

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    filter: blur(1px) brightness(0.88);
    opacity: 0.6;
    
  `,
  Overlay: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: ${({ theme }) => theme.Z_INDEX.dropdown};

    background: #2a2f3d8f;

    animation: fadeIn 0.25s;
    inset: 0;
    pointer-events: none;
  `,
  OverlayText: styled.span`
    padding: ${({ theme }) => theme.PADDING.py3} +
      ${({ theme }) => theme.PADDING.px6};

    color: ${({ theme }) => theme.PALETTE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.small_bold};
    border-radius: 8px;
  `,
  TitleWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level1};
  `,
  TagBox: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  RestaurantName: styled.a`
    max-width: 180px;
    overflow: hidden;

    padding-left: ${({ theme }) => theme.PADDING.px2};

    color: #1e293b;
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
  `,
};
