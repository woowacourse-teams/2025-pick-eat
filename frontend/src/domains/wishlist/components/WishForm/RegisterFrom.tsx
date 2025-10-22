import CategorySection from '@domains/wishlist/components/WishForm/CategorySection';
import TagSection from '@domains/wishlist/components/WishForm/TagSection';

import FillInput from '@components/actions/Input/FillInput';
import NewButton from '@components/actions/NewButton';
import Thumbnail from '@components/assets/icons/Thumbnail';

import { WishFormDataWithImage } from '@apis/wish';

import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

type Props = {
  formData: WishFormDataWithImage;
  isLoading: boolean;
  onFormChange: <K extends keyof WishFormDataWithImage>(
    key: K,
    value: WishFormDataWithImage[K]
  ) => void;
  onSubmit: () => void;
};

function RegisterForm({ formData, isLoading, onFormChange, onSubmit }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFormChange('thumbnail', file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    if (formData.thumbnail instanceof File) {
      setPreviewUrl(URL.createObjectURL(formData.thumbnail));
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setPreviewUrl(null);
    }
  }, [formData.thumbnail]);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <S.Form onSubmit={submitForm}>
      <S.ImageArea htmlFor="thumbnail" previewUrl={previewUrl}>
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          name="thumbnail"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        {previewUrl ? null : (
          <>
            <Thumbnail />
            <S.Description>이 곳을 눌러 썸네일 등록</S.Description>
          </>
        )}
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

      <NewButton disabled={isLoading}>
        {isLoading ? '식당 등록 중...' : '식당 등록하기'}
      </NewButton>
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
  ImageArea: styled.label<{ previewUrl: string | null }>`
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    background-image: ${({ previewUrl }) =>
      previewUrl ? `url(${previewUrl})` : ''};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    border-radius: ${({ theme }) => theme.RADIUS.medium};
    cursor: pointer;
  `,
  Description: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
