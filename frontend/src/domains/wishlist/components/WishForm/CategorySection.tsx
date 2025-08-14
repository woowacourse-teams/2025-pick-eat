import Badge from '@components/labels/Badge';

import styled from '@emotion/styled';
import { useState } from 'react';

type Category = '한식' | '중식' | '일식' | '양식' | '기타';
const CATEGORY_OPTIONS = ['한식', '중식', '일식', '양식', '기타'] as const;

type Props = {
  onFormChange: (value: string) => void;
};

function CategorySection({ onFormChange }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const clickBadge = (category: Category) => {
    setSelectedCategory(category);
    onFormChange(category);
  };

  return (
    <S.Container>
      {CATEGORY_OPTIONS.map(category => (
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
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
  `,
};
