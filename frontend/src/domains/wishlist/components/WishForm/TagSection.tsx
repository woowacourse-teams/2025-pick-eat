import Input from '@components/actions/Input';
import Badge from '@components/labels/Badge';

import styled from '@emotion/styled';
import { useState } from 'react';

type Props = {
  tags: string[];
  onFormChange: (value: string[]) => void;
};

function TagSection({ tags, onFormChange }: Props) {
  const [tag, setTag] = useState<string>();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tag && tag.trim() !== '') {
      e.preventDefault();
      if (!tags?.includes(tag.trim())) {
        onFormChange([...(tags ?? []), tag.trim()]);
      }
      setTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onFormChange(tags?.filter(t => t !== tagToRemove) ?? []);
  };
  return (
    <S.TagWrapper>
      <Input
        label="태그"
        placeholder="태그 입력 후 엔터"
        value={tag}
        onChange={e => setTag(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {tags && (
        <S.TagList>
          {tags.map(tag => (
            <Badge key={tag} color="primary">
              <span>{tag}</span>
              <S.RemoveBtn type="button" onClick={() => removeTag(tag)}>
                ×
              </S.RemoveBtn>
            </Badge>
          ))}
        </S.TagList>
      )}
    </S.TagWrapper>
  );
}

export default TagSection;

const S = {
  TagWrapper: styled.div`
    height: 120px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  TagList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  RemoveBtn: styled.button`
    background: none;
    border: none;
    margin-left: 6px;
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    cursor: pointer;
    font-size: 14px;
  `,
};
