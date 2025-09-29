export const JOIN_CODE_STORAGE_NAME = 'joinCode';

export const joinCode = {
  get: () => localStorage.getItem(JOIN_CODE_STORAGE_NAME),
  save: (code: string) => localStorage.setItem(JOIN_CODE_STORAGE_NAME, code),
  remove: () => localStorage.removeItem(JOIN_CODE_STORAGE_NAME),
};
