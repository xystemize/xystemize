import { isObject } from 'lodash';

export const OptionalObjectTransformer = ({ value }: { value: unknown }) => {
  if (!value) {
    return null;
  }

  if (!isObject(value)) {
    return null;
  }

  return value;
};
