import { validatePickeatForms } from '@domains/pickeat/services/validatePickeatForms';

import { pickeat } from '@apis/pickeat';

import { useState } from 'react';
import { useSearchParams } from 'react-router';

const useCreateWishPickeat = () => {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const createPickeat = async (
    pickeatName: string,
    selectedWishlistId: number
  ) => {
    try {
      validatePickeatForms.wish({
        name: pickeatName,
        wishlistId: selectedWishlistId,
      });
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
      return;
    }

    try {
      const code = await pickeat.post(roomId, pickeatName);
      await pickeat.postWish(selectedWishlistId, code);

      return code;
    } catch (e) {
      setErrorMessage('픽잇 생성에 실패했습니다.');
      console.error(e);
    }

    return;
  };

  return { createPickeat, errorMessage };
};

export default useCreateWishPickeat;
