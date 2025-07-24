export const joinAsPath = (...paths: string[]): string => {
  const joined = paths.join('/');
  return joined;
};

export function createQueryString(params: Record<string, string>): string {
  if (!params || Object.keys(params).length === 0) return '';
  const search = new URLSearchParams(params).toString();
  return search ? `?${search}` : '';
}
