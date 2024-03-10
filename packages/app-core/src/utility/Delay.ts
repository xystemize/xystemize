export const delayByMilliseconds = (milliseconds: number): Promise<void> => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const delayBySeconds = (seconds: number): Promise<void> => {
  return delayByMilliseconds(seconds * 1000);
};
