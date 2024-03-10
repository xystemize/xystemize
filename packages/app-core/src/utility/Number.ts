export const convertToZeroIfNegative = (num: number) => {
  if (num >= 0) {
    return num;
  }

  return 0;
};

export const addZeroPrefix = ({ value, maxLength = 2 }: { value: number; maxLength: number }): string => {
  const numberString = value.toString();
  const paddingLength = Math.max(maxLength - numberString.length, 0);
  return '0'.repeat(paddingLength) + numberString;
};
