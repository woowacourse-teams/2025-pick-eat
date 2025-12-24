import { ApiError } from '@apis/apiClient';

export const ERROR_CODE: Record<
  number | string,
  { message: string; code: string }
> = {
  400: {
    message: '잘못된 요청입니다. 다시 시도해 주세요.',
    code: 'BAD_REQUEST',
  },
  401: {
    message: '인증에 실패했습니다. 다시 로그인해 주세요.',
    code: 'UNAUTHORIZED',
  },
  403: {
    message: '권한이 없습니다. 권한을 확인해 주세요.',
    code: 'FORBIDDEN',
  },
  404: {
    message: '요청하신 리소스를 찾을 수 없습니다.',
    code: 'NOT_FOUND',
  },
  500: {
    message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    code: 'SERVER_ERROR',
  },
  NETWORK_ERROR: {
    message: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.',
    code: 'NETWORK_ERROR',
  },
  UNKNOWN: {
    message: '알 수 없는 오류가 발생했습니다.',
    code: 'UNKNOWN_ERROR',
  },
} as const;

export const getErrorMessageByCode = (error: ApiError | TypeError) => {
  // 1. 네트워크 오류
  if (error instanceof TypeError) {
    return ERROR_CODE.NETWORK_ERROR;
  }

  // 2. 에러 코드에 따른 메시지 매핑
  if (error?.status && ERROR_CODE[error.status]) {
    return ERROR_CODE[error.status];
  }

  // 3. 그 외 알 수 없는 오류
  return ERROR_CODE.UNKNOWN;
};
