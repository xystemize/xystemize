import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { trim } from 'lodash';

@Injectable()
export class RequiredEmailDataPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: string) {
    value = String(trim(value)).toLowerCase();

    if (!isEmail(value)) {
      throw new BadRequestException();
    }

    return value;
  }
}

@Injectable()
export class OptionalEmailDataPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: string) {
    value = String(trim(value)).toLowerCase();

    if (value.length === 0) {
      return value;
    }

    if (!isEmail(value)) {
      throw new BadRequestException();
    }

    return value;
  }
}
