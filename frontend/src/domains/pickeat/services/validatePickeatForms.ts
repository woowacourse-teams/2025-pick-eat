import { validate } from '@utils/validate';

type LocationValidateType = {
  name: string | undefined;
  address: string | undefined;
  radius: string | undefined;
};

type WishValidateType = {
  name: string;
  wishlistId: number;
};

const ERROR_MESSAGE = {
  NAME: '픽잇 이름을 입력해 주세요.',
  ADDRESS: '위치를 입력해 주세요.',
  RADIUS: '반경을 선택해 주세요.',
  WISHLIST: '위시리스트를 선택해 주세요.',
};

export const validatePickeatForms = {
  location: ({ name, address, radius }: LocationValidateType) => {
    if (validate.isEmpty(name)) throw new Error(ERROR_MESSAGE.NAME);
    if (validate.isEmpty(address)) throw new Error(ERROR_MESSAGE.ADDRESS);
    if (validate.isEmpty(radius)) throw new Error(ERROR_MESSAGE.RADIUS);
  },

  wish: ({ name, wishlistId }: WishValidateType) => {
    if (validate.isEmpty(name)) throw new Error(ERROR_MESSAGE.NAME);
    if (validate.isUnvalidId(wishlistId))
      throw new Error(ERROR_MESSAGE.WISHLIST);
  },
};
