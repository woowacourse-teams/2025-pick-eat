export const ACCESS_TOKEN_STORAGE_NAME = 'accessToken';

export const accessToken = {
  get: () => localStorage.getItem(ACCESS_TOKEN_STORAGE_NAME),
  save: (token: string) =>
    localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, token),
  remove: () => localStorage.removeItem(ACCESS_TOKEN_STORAGE_NAME),
};
