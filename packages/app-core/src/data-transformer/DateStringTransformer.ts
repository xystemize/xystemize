import { isDateString } from 'class-validator';

export const DateStringWithDefaultTransformer = ({ value }: { value: unknown }) => {
  const newValue = String(value).trim();

  if (isDateString(newValue)) {
    return new Date(newValue).toISOString();
  }

  return new Date().toISOString();
};
