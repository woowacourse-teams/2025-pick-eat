import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import ErrorMessage from '@components/errors/ErrorMessage';

import styled from '@emotion/styled';
import { FormEvent } from 'react';

import { WishFormDataWithImage } from '../../hooks/useCreateWish';

import CategorySection from './CategorySection';
import TagSection from './TagSection';

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
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <S.Form onSubmit={submitForm}>
      <S.Label>카테고리</S.Label>
      <CategorySection
        onFormChange={value => onFormChange('category', value)}
      />
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
      <TagSection
        tags={formData.tags}
        onFormChange={value => onFormChange('tags', value)}
      />

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

  Label: styled.label`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
