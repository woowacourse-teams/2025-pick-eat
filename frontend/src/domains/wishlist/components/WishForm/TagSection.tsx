import LineInput from '@components/actions/Input/LineInput';
import Badge from '@components/labels/Badge';

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
    <S.Container>
      <LineInput
        label="식당 태그"
        placeholder="태그 입력 후 엔터"
        value={tag}
        onChange={e => setTag(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        xIcon
        onClear={() => setTag('')}
      />

      <S.TagList>
        {tags &&
          tags.map(tag => (
            <Badge key={tag} color="primary">
              <span>{tag}</span>
              <S.RemoveBtn
                type="button"
                aria-label={`${tag} 태그 삭제`}
                onClick={() => removeTag(tag)}
              >
                ×
              </S.RemoveBtn>
            </Badge>
          ))}
      </S.TagList>
    </S.Container>
  );
}

export default TagSection;

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
