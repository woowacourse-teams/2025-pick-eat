export const joinAsPath = (...paths: string[]): string => {
  const joined = paths.join('/');
  return joined;
};

export const createQueryString = (params: Record<string, string>): string => {
  if (!params || Object.keys(params).length === 0) return '';
  const search = new URLSearchParams(params).toString();
  return search ? `?${search}` : '';
};

export const createQueryStrings = (
  ...queries: Record<string, string>[]
): string => {
  if (!queries || queries.length === 0) return '';

  const mergedParams = queries.reduce(
    (acc, query) => ({ ...acc, ...query }),
    {}
  );

  return createQueryString(mergedParams);
};
