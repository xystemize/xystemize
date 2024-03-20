import { registerDecorator, ValidationOptions } from 'class-validator';

import { ErrorString } from '../string';

export function OptionalMaxLength(
  property: number,
  validationOptions: ValidationOptions = { message: ErrorString.CharsTooLong.value }
) {
  // eslint-disable-next-line
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'optionalMaxLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value?: string) {
          if (!value) {
            return true;
          }

          return typeof value === 'string' && String(value || '').length <= property;
        },
      },
    });
  };
}
