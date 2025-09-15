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
      <S.InputArea>
        <S.Label>카테고리 *</S.Label>
        <CategorySection
          onFormChange={value => onFormChange('category', value)}
        />

        <Input
          label="식당 이름 *"
          name="name"
          value={formData.name}
          onChange={e => onFormChange('name', e.target.value)}
        />
        <Input
          label="주소 *"
          name="roadAddressName"
          value={formData.roadAddressName}
          onChange={e => onFormChange('roadAddressName', e.target.value)}
        />
        <Input
          label="링크 *"
          name="placeUrl"
          value={formData.placeUrl}
          onChange={e => onFormChange('placeUrl', e.target.value)}
        />
        <S.Label htmlFor="thumbnail">찜 썸네일</S.Label>
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          name="thumbnail"
          onChange={e => {
            if (e.target.files?.[0])
              onFormChange('thumbnail', e.target.files[0]);
          }}
        />
        <TagSection
          tags={formData.tags}
          onFormChange={value => onFormChange('tags', value)}
        />
      </S.InputArea>
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
  InputArea: styled.div`
    height: 340px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    overflow-y: scroll;
  `,

  Label: styled.label`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
