import { registerDecorator, ValidationOptions } from 'class-validator';

export function NumberLength(
  property: number,
  validationOptions: ValidationOptions = { message: 'Number Length Invalid' }
) {
  // eslint-disable-next-line
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'NumberLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: number) {
          return typeof value === 'number' && String(value).length === property;
        },
      },
    });
  };
}
