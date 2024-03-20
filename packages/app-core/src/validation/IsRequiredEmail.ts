import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsRequiredEmail(
  property?: string,
  validationOptions: ValidationOptions = {
    message: 'Invalid email',
  }
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isRequiredEmail',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string | undefined | null) {
          const newValue = String(value).trim();

          if (newValue.length === 0) {
            return false;
          }

          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(newValue);
        },
      },
    });
  };
}
