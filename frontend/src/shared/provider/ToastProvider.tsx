import { HEADER_HEIGHT } from '@components/layouts/Header';
import Toast, { DEFAULT_TIME } from '@components/toast/Toast';

import { generateRandomNumber } from '@utils/generateRandomNumber';

import styled from '@emotion/styled';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

type ToastType = {
  mode: 'ERROR' | 'SUCCESS' | 'WARN';
  message: string;
};
type ToastStateType = {
  id: `${string}-${string}`;
  timeSet: number;
} & ToastType;

type ContextType = (toast: ToastType, timeSet?: number) => void;

const ToastContext = createContext<ContextType | undefined>(undefined);

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastStateType[]>([]);

  const showToast = useCallback(
    (toast: ToastType, timeSet: number = DEFAULT_TIME) => {
      const id: `${string}-${string}` = `${generateRandomNumber(10000, 4)}-${generateRandomNumber(10000, 4)}`;

      setToasts(prev => [{ ...toast, id: id, timeSet: timeSet }, ...prev]);
    },
    []
  );

  const removeToast = (toastId: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== toastId));
  };

  return (
    <ToastContext.Provider value={showToast}>
      {toasts.length > 0 && (
        <S.Container>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              mode={toast.mode}
              onRemove={() => removeToast(toast.id)}
              timeSet={toast.timeSet}
            />
          ))}
        </S.Container>
      )}
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

export const useShowToast = () => {
  const showToast = useContext(ToastContext);

  if (!showToast) {
    throw new Error('컨텍스트는 Provider 내부에서만 사용할 수 있습니다.');
  }

  return showToast;
};

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 768px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
    position: fixed;
    z-index: ${({ theme }) => theme.Z_INDEX.toast};

    padding: ${({ theme }) => theme.PADDING.p4};

    transform: translateY(calc(${HEADER_HEIGHT} + 5px));
  `,
};
