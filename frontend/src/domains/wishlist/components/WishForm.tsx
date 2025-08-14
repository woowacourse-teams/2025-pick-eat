import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import ErrorMessage from '@components/errors/ErrorMessage';
import Badge from '@components/labels/Badge';

import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';

import { WishFormDataWithImage } from '../hooks/useCreateWish';

const CATEGORY_OPTIONS = ['한식', '중식', '일식', '양식', '기타'] as const;
type Category = '한식' | '중식' | '일식' | '양식' | '기타';

type Props = {
  formData: WishFormDataWithImage;
  onFormChange: <K extends keyof WishFormDataWithImage>(
    key: K,
    value: WishFormDataWithImage[K]
  ) => void;
  onSubmit: () => void;
  errorMessage: string;
};

function WishForm({ formData, onFormChange, onSubmit, errorMessage }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [tag, setTag] = useState<string>();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tag && tag.trim() !== '') {
      e.preventDefault();
      if (!formData.tags?.includes(tag.trim())) {
        onFormChange('tags', [...(formData.tags ?? []), tag.trim()]);
      }
      setTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onFormChange('tags', formData.tags?.filter(t => t !== tagToRemove) ?? []);
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <S.Form onSubmit={submitForm}>
      <S.Label>카테고리</S.Label>
      <S.CategoryWrapper>
        {CATEGORY_OPTIONS.map(category => (
          <S.BadgeButton
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              onFormChange('category', category);
            }}
            type="button"
          >
            <Badge color={selectedCategory === category ? 'primary' : 'gray'}>
              {category}
            </Badge>
          </S.BadgeButton>
        ))}
      </S.CategoryWrapper>
      <Input
        label="식당 이름"
        name="name"
        value={formData.name}
        onChange={e => onFormChange('name', e.target.value)}
      />
      <Input
        label="주소"
        name="roadAddressName"
        value={formData.roadAddressName}
        onChange={e => onFormChange('roadAddressName', e.target.value)}
      />
      <S.Label>이미지</S.Label>
      <input
        type="file"
        accept="image/*"
        name="image"
        onChange={e => {
          if (e.target.files?.[0]) onFormChange('image', e.target.files[0]);
        }}
      />

      <S.TagWrapper>
        <Input
          label="태그"
          placeholder="태그 입력 후 엔터"
          value={tag}
          onChange={e => setTag(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {formData.tags && (
          <S.TagList>
            {formData.tags.map(tag => (
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
      <ErrorMessage message={errorMessage} />

      <Button text="등록" />
    </S.Form>
  );
}
export default WishForm;

const S = {
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  CategoryWrapper: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Label: styled.label`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,

  BadgeButton: styled.button`
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
  `,

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
