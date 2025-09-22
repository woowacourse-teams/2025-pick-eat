import Cross from '@components/assets/icons/Cross';
import Revert from '@components/assets/icons/Revert';
import Badge from '@components/labels/Badge';

import { useRestaurantExcludeContext } from '@domains/restaurantExclude/context/RestaurantExcludeProvider';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';

type Props = Pick<
  Restaurant,
  'id' | 'name' | 'tags' | 'placeUrl' | 'distance' | 'category' | 'pictureUrls'
>;

function RestaurantItem({
  id,
  name,
  tags,
  placeUrl,
  distance,
  category,
  pictureUrls,
}: Props) {
  const { selectedRestaurantIds, handleRestaurantToggle } =
    useRestaurantExcludeContext();

  const excluded = selectedRestaurantIds.includes(id);
  const menuUrl = `${placeUrl}#menuInfo`;

  return (
    <S.Container excluded={excluded}>
      <S.DeleteButton
        aria-label={`소거: ${name}`}
        type="button"
        onClick={() => handleRestaurantToggle(id)}
        excluded={excluded}
      >
        <S.IconContainer>
          <S.IconWrapper excluded={excluded}>
            {excluded ? (
              <Revert color="white" size="sm" />
            ) : (
              <Cross color="white" size="sm" strokeWidth={4} />
            )}
          </S.IconWrapper>
        </S.IconContainer>
      </S.DeleteButton>
      <S.CardContainer>
        <S.Image
          src={pictureUrls[0] || './images/restaurant.png'}
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = './images/restaurant.png';
          }}
        />

        <S.CardContent excluded={excluded}>
          <S.TitleWrapper>
            <S.TagBox>
              {tags.map(tag => (
                <Badge key={tag}>{tag}</Badge>
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
        </S.CardContent>

        {excluded && (
          <S.Overlay>
            <S.OverlayText>제외되었습니다</S.OverlayText>
          </S.Overlay>
        )}
      </S.CardContainer>
    </S.Container>
  );
}

export default RestaurantItem;

const S = {
  Container: styled.div<{ excluded: boolean }>`
    width: 312px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    position: relative;
    ${({ excluded, theme }) =>
      excluded
        ? `
      box-shadow: ${theme.BOX_SHADOW.level1};
      transform: scale(0.95);
    `
        : `
      box-shadow: ${theme.BOX_SHADOW.level2};
      transform: scale(1);

    `}

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `,
  CardContainer: styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
    overflow: hidden;
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 10px;
  `,

  Image: styled.img`
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    object-fit: cover;
  `,
  CardContent: styled.div<{ excluded: boolean }>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    ${({ excluded }) =>
      excluded
        ? `
      filter: blur(1px) brightness(0.88);
      opacity: 0.6;
    `
        : `
      filter: none;
      opacity: 1;
    `}
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
  DeleteButton: styled.button<{ excluded: boolean }>`
    width: 40px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -16px;
    right: -16px;

    z-index: ${({ theme }) => theme.Z_INDEX.sticky};

    padding: ${({ theme }) => theme.PADDING.px5};

    color: ${({ theme }) => theme.PALETTE.gray[0]};

    font: ${({ theme }) => theme.FONTS.body.xsmall};

    ${({ excluded, theme }) =>
      excluded
        ? `
      color: ${theme.PALETTE.gray[0]};
    `
        : `
      color: ${theme.PALETTE.gray[0]};
    `}
  `,
  IconContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  `,
  IconWrapper: styled.div<{ excluded: boolean }>`
    width: 28px;
    height: 28px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 6px;

    border-radius: 1000px;

    ${({ excluded, theme }) =>
      excluded
        ? `
      background-color: ${theme.PALETTE.gray[50]};
      color: ${theme.PALETTE.gray[0]};
      &:hover {
        background-color: ${theme.PALETTE.gray[60]};
      }
    `
        : `
      background-color: ${theme.PALETTE.primary[60]};
      color: ${theme.PALETTE.gray[0]};
      &:hover {
        background-color: ${theme.PALETTE.primary[70]};
      }
    `}
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
