import { isArray } from 'class-validator';
import { chunk, first, uniq, without } from 'lodash';

import { StringTransformer, StringWithTrimTransformer } from '.';

export const ArrayTransformer = ({ value }: { value: unknown }) => {
  if (isArray(value)) {
    return without(value, null, undefined, '');
  }

  // If value is not recognized return default empty array
  return [];
};

export const ArrayNumberTransformer = ({ value }: { value: unknown }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numberArr: any[] = ArrayTransformer({ value });
  return numberArr.map((value) => Number(value));
};

export const ArrayStringTransformer = ({ value }: { value: unknown }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stringArr: any[] = ArrayTransformer({ value });
  return stringArr.map((value) => StringTransformer({ value }));
};

export const ArrayStringWithTrimTransformer = ({ value }: { value: unknown }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stringArr: any[] = ArrayTransformer({ value });
  return stringArr.map((value) => StringWithTrimTransformer({ value }));
};

export const UniqueArrayStringWithTrimTransformer = ({ value }: { value: unknown }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stringArr: any[] = uniq(ArrayTransformer({ value }));
  return stringArr.map((value) => StringWithTrimTransformer({ value }));
};

export const ArrayStringWithTrimAndLimitTransformer = (params: { limit: number }) => {
  return ({ value }: { value: unknown }): string[] => {
    const newValues = ArrayStringWithTrimTransformer({ value });
    return first(chunk(newValues, params.limit)) || [];
  };
};
