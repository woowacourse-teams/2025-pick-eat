export const sliceInputByMaxLength = (input: string, maxLength: number) => {
  if (input.length > maxLength) {
    return input.slice(0, maxLength);
  }
  return input;
};
