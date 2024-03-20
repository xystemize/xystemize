import { registerDecorator, ValidationOptions } from 'class-validator';

import { ErrorString } from '../string';

// This will return valid if blan
// if not blank, it will check if valid url
export function IsTrue(
  {
    property,
    validationOptions = {
      message: ErrorString.Invalid.value,
    },
  }:
    | {
        property?: string;
        validationOptions?: ValidationOptions;
      }
    | undefined = { property: undefined, validationOptions: undefined }
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTrue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: boolean | string | undefined | null) {
          return value === true;
        },
      },
    });
  };
}
