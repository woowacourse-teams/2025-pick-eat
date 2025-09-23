import Badge from '@components/labels/Badge';

import { FOOD_CATEGORIES, FoodCategory } from 'shared/constants/foodCategory';

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
      {FOOD_CATEGORIES.map(category => (
        <S.BadgeButton
          key={category}
          onClick={() => clickBadge(category)}
          type="button"
        >
          <Badge color={selectedCategory === category ? 'primary' : 'gray'}>
            {category}
          </Badge>
        </S.BadgeButton>
      ))}
    </S.Container>
  );
}

export default CategorySection;

const S = {
  Container: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  BadgeButton: styled.button`
    padding: 0;
    border: none;

    background: none;
  `,
};
