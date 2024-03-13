import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { trim } from 'lodash';

@Injectable()
export class RequiredEmailDataPipe implements PipeTransform {
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
