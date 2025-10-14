import { pickeat } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router';

import { validatePickeatForms } from '../services/validatePickeatForms';

type CreatePickeatParams = {
  formData: FormData;
  radiusValue: string | undefined;
  closeOverlay: (cb: () => void) => void;
};

export const useCreateLocationPickeat = () => {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const createPickeat = async ({
    formData,
    radiusValue,
    closeOverlay,
  }: CreatePickeatParams) => {
    const data = Object.fromEntries(formData.entries());

    try {
      validatePickeatForms.location({
        name: data.pickeatName as string,
        address: data.address as string,
        radius: radiusValue,
      });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return;
    }

    try {
      const code = await pickeat.post(roomId, data.pickeatName as string);

      await pickeat.postLocation(
        {
          address: data.address as string,
          radius: parseInt(radiusValue as string),
        },
        code
      );

      closeOverlay(() => navigate(generateRouterPath.pickeatDetail(code)));

      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(() =>
          e.message === 'INVALID_ADDRESS'
            ? '잘못된 위치입니다.'
            : '픽잇 생성에 실패했습니다.'
        );
      }
    }
  };

  return { createPickeat, error };
};
