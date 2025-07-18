import { useState } from 'react';
import styled from '@emotion/styled';
import Trash from '@components/assets/icons/Trash';

type RestaurantCategory =
  | 'korean'
  | 'chinese'
  | 'japanese'
  | 'western'
  | '기타';

type Props = {
  name: string;
  description: string;
  category: RestaurantCategory;
  link: string;
  walkInfo?: number;
};

function RestaurantItem({
  name,
  description,
  category,
  link,
  walkInfo,
}: Props) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(!isPressed);
  };

  return (
    <S.Container>
      <S.CardContainer isPressed={isPressed} onClick={handleClick}>
        <S.RestaurantName>{name}</S.RestaurantName>
        <S.CategoryImage
          src="/images/category/japanese.png"
          alt="Restaurant"
          width={100}
        />
        {walkInfo && (
          <S.InfoRow>
            <span>도보 {walkInfo}분</span>
          </S.InfoRow>
        )}
        <S.InfoRow>
          <span>위치 정보</span>
        </S.InfoRow>
        <S.LinkButton
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
        >
          상세 정보 보기
        </S.LinkButton>
      </S.CardContainer>
      <S.DeleteIcon isPressed={isPressed}>
        <Trash size="lg" style={{ opacity: 0.7 }} />
        소거되었습니다.
      </S.DeleteIcon>
    </S.Container>
  );
}

export default RestaurantItem;

const S = {
  Container: styled.div`
    width: fit-content;
    height: fit-content;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  CardContainer: styled.div<{ isPressed: boolean }>`
    width: 320px;
    height: 180px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    ${({ isPressed }) =>
      isPressed
        ? `
      transform: scale(0.95);
      filter: blur(2px);
      opacity: 0.6;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-color: #cbd5e1;
    `
        : `
      transform: scale(1);
      filter: blur(0);
      opacity: 1;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        border-color: #cbd5e1;
      }
    `}
  `,
  CategoryImage: styled.img`
    /* width: 24px; */
    height: auto;
    border-radius: 12px;
    margin-bottom: 12px;
  `,
  RestaurantName: styled.h2`
    color: #1e293b;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
    line-height: 1.3;
  `,
  CategoryBadge: styled.span<{ category: RestaurantCategory }>`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 12px;
    background: ${({ category }) => {
      const colors: Record<RestaurantCategory, string> = {
        korean: '#fef3c7',
        chinese: '#fecaca',
        japanese: '#fed7d7',
        western: '#e0e7ff',
        기타: '#f3f4f6',
      };
      return colors[category] || colors.기타;
    }};
    color: ${({ category }) => {
      const colors: Record<RestaurantCategory, string> = {
        korean: '#92400e',
        chinese: '#dc2626',
        japanese: '#b91c1c',
        western: '#3730a3',
        기타: '#374151',
      };
      return colors[category] || colors.기타;
    }};
  `,
  InfoRow: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    color: #64748b;
    font-size: 14px;
  `,
  LinkButton: styled.a`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #3b82f6;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    margin-top: 8px;
    &:hover {
      color: #2563eb;
      text-decoration: underline;
    }
  `,
  DeleteIcon: styled.div<{ isPressed: boolean }>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ isPressed }) => (isPressed ? 1 : 0)};
    transition: opacity 0.3s ease;
    z-index: 10;
    pointer-events: none;
  `,
};
