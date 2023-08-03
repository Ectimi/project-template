import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export default function IsEmailCaptchaRequired(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCaptchaRequired',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const type = args.object['type'];
          const captcha = args.object['captcha'];
          const email = args.object['email'];
          if (type === 'password' || type === undefined) {
            return true;
          } else if (type === 'code') {
            return (
              captcha !== undefined &&
              captcha.length === 6 &&
              email !== undefined
            );
          }
          return false;
        },
        defaultMessage(args?: ValidationArguments) {
          const captcha = args.object['captcha'];
          const email = args.object['email'];
          return email === undefined
            ? 'email is required for type "code"'
            : 'captcha is required for type "code" and must be 6 characters long.';
        },
      },
    });
  };
}
