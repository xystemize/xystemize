import { trim } from 'lodash';

export const StringTransformer = ({ value }: { value: unknown }) => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return String(value || '');
};

export const StringWithTrimTransformer = ({ value }: { value: unknown }) => {
  return trim(StringTransformer({ value }));
};

export const OptionalStringWithTrimTransformer = ({ value }: { value: unknown }) => {
  if (!value) {
    return null;
  }

  return trim(StringTransformer({ value }));
};

export const StringWithTrimAndLowerCaseTransformer = ({ value }: { value: unknown }) => {
  return StringWithTrimTransformer({ value }).toLowerCase();
};

export const StringWithTrimAndUpperCaseTransformer = ({ value }: { value: unknown }) => {
  return StringWithTrimTransformer({ value }).toUpperCase();
};

export const OptionalStringWithTrimAndLowerCaseTransformer = ({ value }: { value: unknown }) => {
  if (!value) {
    return null;
  }

  return StringWithTrimTransformer({ value }).toLowerCase();
};

export const StringWithDefaultTransformer = (obj: { default: string }) => {
  return ({ value }: { value: unknown }): string => {
    if (value === null || value === undefined || value === '') {
      return obj.default;
    }

    return StringTransformer({ value });
  };
};
