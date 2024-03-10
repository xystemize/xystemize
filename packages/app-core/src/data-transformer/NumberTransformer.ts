import { convertToZeroIfNegative } from '@docuslice/app-util';
import { isNumber } from 'class-validator';
import { isNaN, trim } from 'lodash';

export const NumberTransformer = ({ value }: { value: unknown }): number => {
  if (isNumber(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return Number(trim(value));
  }

  if (isNaN(value)) {
    return 0;
  }
  // Just return value for now if has different data type
  // In the future, we should throw error
  return Number(value);
};

export const OptionalNumberTransformer = ({ value }: { value: unknown }): number | null => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  if (isNumber(value)) {
    return value;
  }

  return NumberTransformer({ value });
};

export const NumberWithDefaultTransformer = (obj: { default: number }) => {
  return ({ value }: { value: unknown }): number => {
    if (typeof value === 'string' && !value) {
      return obj.default;
    }

    if (value === null || value === undefined) {
      return obj.default;
    }

    return NumberTransformer({ value });
  };
};

export const PositiveNumberWithDefaultTransformer = (obj: { default: number }) => {
  return ({ value }: { value: unknown }): number => {
    if (typeof value === 'string' && !value) {
      value = obj.default;
    }

    if (value === null || value === undefined) {
      value = obj.default;
    }

    value = convertToZeroIfNegative(Number(value));

    return NumberTransformer({ value });
  };
};

export const NumberDateWithDefaultTransformer = ({ value }: { value: unknown }): number => {
  if (value === '') {
    return Date.now();
  }

  const newValue = NumberTransformer({ value });
  if (isNumber(newValue)) {
    return newValue;
  }

  return Date.now();
};
