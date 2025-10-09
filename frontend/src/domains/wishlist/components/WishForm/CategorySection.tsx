import Chip from '@components/labels/Chip';

import { FOOD_CATEGORIES, FoodCategory } from '@constants/foodCategory';

import styled from '@emotion/styled';
import { useState } from 'react';

type Props = {
  value: FoodCategory;
  onFormChange: (value: string) => void;
};

function CategorySection({ value, onFormChange }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>(value);

  const clickChip = (category: FoodCategory) => {
    setSelectedCategory(category);
    onFormChange(category);
  };

  return (
    <S.Container>
      {FOOD_CATEGORIES.map(category => (
        <S.ChipButton
          key={category}
          onClick={() => clickChip(category)}
          type="button"
        >
          <Chip color={selectedCategory === category ? 'primary' : 'white'}>
            {category}
          </Chip>
        </S.ChipButton>
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
  ChipButton: styled.button`
    padding: 0;
    border: none;

    background: none;
  `,
};
