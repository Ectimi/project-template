import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export default function ArrayNotContainWhitespace(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ArrayNotContainWhitespace',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return Array.isArray(value) && value.length > 0
            ? !value.some((item) => item.toString().trim() === '')
            : true;
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `数组 ${propertyName} 不能包含为空的项`;
        },
      },
    });
  };
}
