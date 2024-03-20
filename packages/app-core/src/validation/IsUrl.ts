import { isURL, registerDecorator, ValidationOptions } from 'class-validator';

import { ErrorString } from '../string';

// This will return valid if blan
// if not blank, it will check if valid url
export function IsOptionalUrl(
  property?: string,
  validationOptions: ValidationOptions = {
    message: ErrorString.InvalidUrl.value,
  }
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOptionaUrl',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string | undefined | null) {
          const newValue = String(value).trim();

          if (newValue.length === 0) {
            return true;
          }

          return isURL(newValue);
        },
      },
    });
  };
}
