import { matches, registerDecorator, ValidationOptions } from 'class-validator';

import { ValidationName, ValidationRule } from '../constant';
import { ErrorString } from '../string';

export function IsValidUsernameChars(
  property?: string,
  validationOptions: ValidationOptions = {
    message: ErrorString.InvalidUsername.value,
  }
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: ValidationName.IsValidUsernameChars,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string | undefined | null) {
          const isEnglishOrChineseChars = matches(String(value), ValidationRule.UsernameCharsRegex);
          return isEnglishOrChineseChars;
        },
      },
    });
  };
}
