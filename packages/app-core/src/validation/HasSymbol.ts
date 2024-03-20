import { matches, registerDecorator, ValidationOptions } from 'class-validator';

import { ValidationName } from '../constant';
import { ErrorString } from '../string';

export function HasSymbol(
  property?: string,
  validationOptions: ValidationOptions = {
    message: ErrorString.ShouldHaveAtLeast1Symbol.value,
  }
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: ValidationName.HasSymbol,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string | undefined | null) {
          return matches(String(value), /(?=.*\W|_)/g);
        },
      },
    });
  };
}
