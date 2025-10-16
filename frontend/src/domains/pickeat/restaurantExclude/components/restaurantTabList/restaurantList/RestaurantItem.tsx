import Cross from '@components/assets/icons/Cross';
import Revert from '@components/assets/icons/Revert';
import RestaurantCard from '@components/RestaurantCard';

import { useRestaurantExcludeContext } from '@domains/pickeat/restaurantExclude/context/RestaurantExcludeProvider';

import { Restaurant } from '@apis/restaurant';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

type Props = {
  restaurantData: Pick<
    Restaurant,
    | 'id'
    | 'name'
    | 'tags'
    | 'placeUrl'
    | 'distance'
    | 'category'
    | 'pictureUrls'
    | 'roadAddressName'
  >;
};

function RestaurantItem({ restaurantData }: Props) {
  const { selectedRestaurantIds, handleRestaurantToggle } =
    useRestaurantExcludeContext();

  const excluded = selectedRestaurantIds.includes(restaurantData.id);

  return (
    <S.Container excluded={excluded}>
      <S.DeleteButton
        aria-label={`소거: ${restaurantData.name}`}
        type="button"
        onClick={() => handleRestaurantToggle(restaurantData.id)}
        excluded={excluded}
      >
        <S.IconWrapper excluded={excluded}>
          {excluded ? (
            <Revert color={THEME.PALETTE.gray[0]} size="sm" />
          ) : (
            <Cross color={THEME.PALETTE.gray[0]} size="sm" strokeWidth={4} />
          )}
        </S.IconWrapper>
      </S.DeleteButton>
      <S.CardContainer>
        <RestaurantCard restaurantData={restaurantData} />
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
    width: 100%;
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
    position: relative;
  `,

  Image: styled.img`
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    object-fit: cover;
  `,
  Overlay: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    background: #2a2f3d8f;

    animation: fadeIn 0.25s;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
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
  IconWrapper: styled.div<{ excluded: boolean }>`
    width: 28px;
    height: 28px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 6px;

    border-radius: ${({ theme }) => theme.RADIUS.half};

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
      background-color: ${theme.PALETTE.red[40]};
      color: ${theme.PALETTE.gray[0]};
      &:hover {
        background-color: ${theme.PALETTE.red[50]};
      }
    `}
  `,
};
