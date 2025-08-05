export const validate = {
  isEmpty: <T>(value: T): boolean => {
    if (value == null) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object')
      return Object.keys(value as object).length === 0;
    return false;
  },
};
