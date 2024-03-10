/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Imported from https://stackoverflow.com/a/26215431/12799103
// Tried using camelcase-keys (https://www.npmjs.com/package/camelcase-keys) but was having errors
import { camelCase } from 'lodash';

export const camelizeKeys = <T extends object>(obj: T) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    );
  }
  return obj;
};
