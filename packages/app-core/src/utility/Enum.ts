export const enumToValues = <T>(value: T, filter: () => boolean) => {
  return Object.values(value as unknown as object).filter(filter);
};
