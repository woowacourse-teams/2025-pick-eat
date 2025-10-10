import Input from '@components/actions/Input/Input';
import Chip from '@components/labels/Chip';

import { useShowToast } from '@provider/ToastProvider';

import styled from '@emotion/styled';
import { useState } from 'react';

type Props = {
  tags: string[];
  onFormChange: (value: string[]) => void;
};

function TagSection({ tags, onFormChange }: Props) {
  const [tag, setTag] = useState<string>();
  const [isComposing, setIsComposing] = useState(false);
  const showToast = useShowToast();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      const trimmedTag = tag?.trim();
      if (!trimmedTag) return;
      e.preventDefault();
      if (!tags?.includes(trimmedTag)) {
        onFormChange([...(tags ?? []), trimmedTag]);
      } else {
        showToast({ mode: 'WARN', message: '다른 태그를 입력해 주세요.' });
      }
      setTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onFormChange(tags.filter(t => t !== tagToRemove) ?? []);
  };
  return (
    <S.TagWrapper>
      <Input
        label="태그"
        placeholder="태그 입력 후 엔터"
        value={tag}
        onChange={e => setTag(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />

      <S.TagList>
        {tags &&
          tags.map(tag => (
            <Chip key={tag} color="primary">
              <span>{tag}</span>
              <S.RemoveBtn
                type="button"
                aria-label={`${tag} 태그 삭제`}
                onClick={() => removeTag(tag)}
              >
                ×
              </S.RemoveBtn>
            </Chip>
          ))}
      </S.TagList>
    </S.TagWrapper>
  );
}

export default TagSection;

const S = {
  TagWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  TagList: styled.div`
    min-height: 26px;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  RemoveBtn: styled.button`
    margin-left: 6px;
    border: none;

    background: none;

    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font-size: 14px;
  `,
};
