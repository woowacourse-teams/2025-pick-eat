import { validate } from '@utils/validate';

import { WishFormDataWithImage } from '../hooks/useCreateWish';

const ERROR_MESSAGE = {
  NAME: '식당 이름을 입력해 주세요.',
  CATEGORY: '카테고리를 선택해 주세요.',
  ADDRESS: '주소를 입력해 주세요.',
};

export const validateWishForm = (
  formData: WishFormDataWithImage | undefined
) => {
  if (validate.isEmpty(formData?.name)) throw new Error(ERROR_MESSAGE.NAME);
  if (validate.isEmpty(formData?.category))
    throw new Error(ERROR_MESSAGE.CATEGORY);
  if (validate.isEmpty(formData?.roadAddressName))
    throw new Error(ERROR_MESSAGE.ADDRESS);
};
