export const generateRandomNumber = (
  maxValue: number,
  digitCount: number
): string => {
  return Math.floor(Math.random() * maxValue)
    .toString()
    .padStart(digitCount, '0');
};
