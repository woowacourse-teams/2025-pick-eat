import LineInput from '@components/actions/Input/LineInput';
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
            <Chip
              key={tag}
              variant="outlined"
              removeButton
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Chip>
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
    border: 2px solid ${({ theme }) => theme.PALETTE.gray[5]};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};

    &:focus-within {
      border: 2px solid ${({ theme }) => theme.PALETTE.primary[50]};

      background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    }
  `,

  TagList: styled.div`
    min-height: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
};
