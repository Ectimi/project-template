import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { EQuestionType } from '../question/types';

export default function IsOptionsRequired(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isOptionsRequired',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const type = args.object['type'];
          const options = args.object['options'];
          if (
            type === EQuestionType.choice ||
            type === EQuestionType.multipleChoice
          ) {
            return (
              Array.isArray(options) &&
              options.length > 0 &&
              !options.some(
                (item) => item === null || item === undefined || item === '',
              )
            );
          }
          return true;
        },
        defaultMessage(args?: ValidationArguments) {
          return 'options is required for type "0" | "1",and it must be a not empty array';
        },
      },
    });
  };
}
