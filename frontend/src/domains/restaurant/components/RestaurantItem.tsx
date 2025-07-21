import CrossSvg from '@components/assets/icons/CrossSvg';
import RevertSvg from '@components/assets/icons/RevertSvg';
import Badge from '@components/labels/Badge';

import styled from '@emotion/styled';
import { useRestaurantExcludeContext } from '@pages/restaurantExclude/RestaurantExcludeProvider';
import { memo } from 'react';

type Props = {
  id: string;
  name: string;
  category: string;
  link: string;
  distance: number;
};

function RestaurantItem({ id, name, category, link, distance }: Props) {
  const { selectedRestaurantIds, handleRestaurantToggle } =
    useRestaurantExcludeContext();

  const pressed = selectedRestaurantIds.includes(id);

  return (
    <S.Container pressed={pressed}>
      <S.DeleteButton
        type="button"
        onClick={() => handleRestaurantToggle(id)}
        pressed={pressed}
      >
        <S.IconContainer>
          <S.IconWrapper pressed={pressed}>
            {pressed ? (
              <RevertSvg color="white" size="sm" />
            ) : (
              <CrossSvg color="white" size="sm" strokeWidth={4} />
            )}
          </S.IconWrapper>
        </S.IconContainer>
      </S.DeleteButton>
      <S.CardContainer>
        <S.CardContent pressed={pressed}>
          <S.TitleWrapper>
            <S.RestaurantName>{name}</S.RestaurantName>
            <Badge>{category}</Badge>
          </S.TitleWrapper>
          <span>식당까지 {distance}m</span>
          <S.LinkButton
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            식당 상세 정보 보기
          </S.LinkButton>
        </S.CardContent>
        {pressed && (
          <S.Overlay>
            <S.OverlayText>제외되었습니다</S.OverlayText>
          </S.Overlay>
        )}
      </S.CardContainer>
    </S.Container>
  );
}

export default memo(RestaurantItem);

const S = {
  Container: styled.div<{ pressed: boolean }>`
    width: 312px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    position: relative;
    ${({ pressed }) =>
      pressed
        ? `
      box-shadow: 0 2px 8px #0000001A;
      transform: scale(0.95);
    `
        : `
      box-shadow: 0 4px 20px #00000014;
      transform: scale(1);

    `}

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `,
  CardContainer: styled.div`
    width: 100%;
    height: 120px;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.PALLETE.gray[0]};
  `,
  CardContent: styled.div<{ pressed: boolean }>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    padding: 20px;

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    ${({ pressed }) =>
      pressed
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
    z-index: 1;

    background: #2a2f3d8f;

    animation: fadeIn 0.25s;
    inset: 0;
    pointer-events: none;
  `,
  OverlayText: styled.span`
    padding: 8px 20px;

    color: ${({ theme }) => theme.PALLETE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.small_bold};
    border-radius: 8px;
  `,
  DeleteButton: styled.button<{ pressed: boolean }>`
    width: 40px;
    height: 40px;

    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -16px;
    right: -16px;
    padding: 0 16px;

    color: ${({ theme }) => theme.PALLETE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};

    ${({ pressed, theme }) =>
      pressed
        ? `
      color: ${theme.PALLETE.gray[0]};
    `
        : `
      color: ${theme.PALLETE.gray[0]};
    `}

    z-index: 2;
  `,
  IconContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  `,
  IconWrapper: styled.div<{ pressed: boolean }>`
    width: 28px;
    height: 28px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 6px;

    border-radius: 1000px;

    ${({ pressed, theme }) =>
      pressed
        ? `
      background-color: ${theme.PALLETE.gray[50]};
      color: ${theme.PALLETE.gray[0]};
      &:hover {
        background-color: ${theme.PALLETE.gray[60]};
      }
    `
        : `
      background-color: ${theme.PALLETE.primary[60]};
      color: ${theme.PALLETE.gray[0]};
      &:hover {
        background-color: ${theme.PALLETE.primary[70]};
      }
    `}
  `,
  TitleWrapper: styled.div`
    display: flex;
    gap: 8px;
  `,
  RestaurantName: styled.a`
    max-width: 180px;
    overflow: hidden;

    margin: 0 0 8px;

    color: #1e293b;
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  LinkButton: styled.a`
    align-items: center;
    gap: 4px;

    margin-top: 8px;

    color: ${({ theme }) => theme.PALLETE.gray[50]};

    &:hover {
      color: ${({ theme }) => theme.PALLETE.gray[70]};
      text-decoration: underline;
    }
  `,
};
