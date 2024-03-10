import { ErrorString } from '@docuslice/app-string';
import { registerDecorator, ValidationOptions } from 'class-validator';

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: string | undefined | null) {
          return String(value || '').trim().length >= 1;
        },
      },
    });
  };
}
