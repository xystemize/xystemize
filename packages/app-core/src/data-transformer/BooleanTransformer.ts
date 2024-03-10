import { isBoolean } from 'class-validator';
import { trim } from 'lodash';

export const BooleanTransformer = ({ value }: { value: unknown }): boolean => {
  if (isBoolean(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return trim(value).toLowerCase() === 'true';
  }

  return value === true;
};
