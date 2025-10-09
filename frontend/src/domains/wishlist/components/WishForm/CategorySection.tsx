import Badge from '@components/labels/Badge';

import { FOOD_CATEGORIES, FoodCategory } from '@constants/foodCategory';

import styled from '@emotion/styled';
import { useState } from 'react';

type Props = {
  value: FoodCategory;
  onFormChange: (value: string) => void;
};

function CategorySection({ value, onFormChange }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>(value);

  const clickBadge = (category: FoodCategory) => {
    setSelectedCategory(category);
    onFormChange(category);
  };

  return (
    <S.Container>
      <S.Label>식당 카테고리</S.Label>

      <S.ChipWrapper>
        {FOOD_CATEGORIES.map(category => (
          <S.Chip
            key={category}
            onClick={() => clickBadge(category)}
            type="button"
          >
            <Badge color={selectedCategory === category ? 'primary' : 'gray'}>
              {category}
            </Badge>
          </S.Chip>
        ))}
      </S.ChipWrapper>
    </S.Container>
  );
}

export default CategorySection;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: ${({ theme }) => theme.PADDING.p4};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: 20px;
  `,
  Label: styled.label`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.small};

    &::after {
      color: #f95f5f;
      font-weight: bold;
      content: '*';
    }
  `,
  ChipWrapper: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  Chip: styled.button``,
};
