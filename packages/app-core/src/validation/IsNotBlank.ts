import { registerDecorator, ValidationOptions } from 'class-validator';

import { ErrorString } from '../string';

export const isNotBlank = (value: unknown) => {
  return String(value || '').trim().length >= 1;
};

export function IsNotBlank(
  property?: string,
  validationOptions: ValidationOptions = {
    message: ErrorString.ShouldNotBeBlank.value,
  }
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string | undefined | null) {
          return isNotBlank(value);
        },
      },
    });
  };
}
