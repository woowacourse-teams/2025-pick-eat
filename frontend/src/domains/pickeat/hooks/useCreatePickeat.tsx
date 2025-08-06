import { pickeat } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router';

import { validatePickeatForms } from '../services/validatePickeatForms';

export const useCreatePickeat = () => {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') ?? '';

  const createPickeat = async (
    formData: FormData,
    radiusValue: string | undefined
  ) => {
    const data = Object.fromEntries(formData.entries());
    try {
      validatePickeatForms({
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
      const radius = parseInt(radiusValue as string);

      const code = await pickeat.postPickeat(
        roomId,
        data.pickeatName as string
      );

      await pickeat.postLocation(
        {
          name: data.name as string,
          address: data.address as string,
          radius,
        },
        code
      );

      navigate(generateRouterPath.pickeatDetail(code));
      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(() =>
          e.message === 'INVALID_ADDRESS'
            ? '잘못된 위치입니다.'
            : '방 생성에 실패했습니다.'
        );
      }
    }
  };

  return { createPickeat, error };
};
