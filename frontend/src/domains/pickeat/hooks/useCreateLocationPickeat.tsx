import { pickeatQuery } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { validatePickeatForms } from '../services/validatePickeatForms';

type CreatePickeatParams = {
  formData: FormData;
  radiusValue: string | undefined;
  closeOverlay: (cb: () => void) => void;
  onLoadingMessageChange?: (message: string) => void;
};

export const useCreateLocationPickeat = () => {
  const [error, setError] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const postPickeatMutation = pickeatQuery.usePostPickeat();
  const postLocationMutation = pickeatQuery.usePostLocation();

  const createPickeat = ({
    formData,
    radiusValue,
    closeOverlay,
    onLoadingMessageChange,
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

    setIsProcessing(true);

    postPickeatMutation.mutate(
      {
        roomId,
        name: data.pickeatName as string,
      },
      {
        onSuccess: code => {
          postLocationMutation.mutate(
            {
              address: data.address as string,
              radius: parseInt(radiusValue as string),
              pickeatCode: code,
            },
            {
              onSuccess: () => {
                onLoadingMessageChange?.('식당을 찾았어요 !');

                closeOverlay(() => {
                  navigate(generateRouterPath.pickeatDetail(code));
                  setIsProcessing(false);
                });

                setError('');
              },
              onError: error => {
                setIsProcessing(false);
                if (
                  error instanceof Error &&
                  error.message === 'INVALID_ADDRESS'
                ) {
                  setError('잘못된 위치입니다.');
                } else {
                  setError('위치 설정에 실패했습니다.');
                }
              },
            }
          );
        },
        onError: () => {
          setIsProcessing(false);
          setError('픽잇 생성에 실패했습니다.');
        },
      }
    );
  };

  return {
    createPickeat,
    error,
    isLoading: isProcessing,
  };
};
