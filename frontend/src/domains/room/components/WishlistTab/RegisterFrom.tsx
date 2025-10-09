import CategorySection from '@domains/wishlist/components/WishForm/CategorySection';
import TagSection from '@domains/wishlist/components/WishForm/TagSection';

import FillInput from '@components/actions/Input/FillInput';
import NewButton from '@components/actions/NewButton';
import Thumbnail from '@components/assets/icons/Thumbnail';
import ErrorMessage from '@components/errors/ErrorMessage';

import { WishFormDataWithImage } from '@domains/wishlist/hooks/useCreateWish';

import styled from '@emotion/styled';
import { FormEvent } from 'react';

type Props = {
  formData: WishFormDataWithImage;
  onFormChange: <K extends keyof WishFormDataWithImage>(
    key: K,
    value: WishFormDataWithImage[K]
  ) => void;
  onSubmit: () => void;
  errorMessage: string;
};

function RegisterForm({
  formData,
  onFormChange,
  onSubmit,
  errorMessage,
}: Props) {
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <S.Form onSubmit={submitForm}>
      <S.ImageArea htmlFor="thumbnail">
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          name="thumbnail"
          onChange={e => {
            if (e.target.files?.[0])
              onFormChange('thumbnail', e.target.files[0]);
          }}
          style={{ display: 'none' }}
        />
        <Thumbnail />
        <S.Description>이 곳을 눌러 썸네일 등록</S.Description>
      </S.ImageArea>

      <S.InputArea>
        <CategorySection
          value={formData.category}
          onFormChange={value => onFormChange('category', value)}
        />
        <FillInput
          label="식당 이름"
          name="name"
          value={formData.name}
          onChange={e => onFormChange('name', e.target.value)}
          required
          xIcon
          onClear={() => onFormChange('name', '')}
        />
        <FillInput
          label="주소"
          name="roadAddressName"
          value={formData.roadAddressName}
          onChange={e => onFormChange('roadAddressName', e.target.value)}
          required
          xIcon
          onClear={() => onFormChange('roadAddressName', '')}
        />
        <FillInput
          label="링크"
          name="placeUrl"
          value={formData.placeUrl}
          onChange={e => onFormChange('placeUrl', e.target.value)}
          xIcon
          onClear={() => onFormChange('placeUrl', '')}
        />
        <TagSection
          tags={formData.tags}
          onFormChange={value => onFormChange('tags', value)}
        />
      </S.InputArea>

      <ErrorMessage message={errorMessage} />
      <NewButton>식당 등록하기</NewButton>
    </S.Form>
  );
}
export default RegisterForm;

const S = {
  Form: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
  ImageArea: styled.label`
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: 20px;
    cursor: pointer;
  `,
  Description: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
