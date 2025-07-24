import { generateRouterPath } from '@routes/routePath';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { createRoomService } from '../services/createRoomService';
import { validateRoomForms } from '../utils/validateRoomForms';

export const useCreateRoom = () => {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const createRoom = async (
    formData: FormData,
    radiusValue: string | undefined
  ) => {
    const data = Object.fromEntries(formData.entries());

    try {
      validateRoomForms({
        name: data.roomName as string,
        location: data.location as string,
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
      const code = await createRoomService({
        name: data.roomName as string,
        location: data.location as string,
        radius,
      });

      navigate(generateRouterPath.roomDetail(code));
      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(() =>
          e.message === 'INVALID_LOCATION'
            ? '잘못된 위치입니다.'
            : '방 생성에 실패했습니다.'
        );
      }
    }
  };

  return { createRoom, error };
};
