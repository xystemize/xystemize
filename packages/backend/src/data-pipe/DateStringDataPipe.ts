import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isDateString } from 'class-validator';
import { trim } from 'lodash';

@Injectable()
export class RequiredDateStringDataPipe implements PipeTransform {
  transform(value: string) {
    value = String(trim(value));

    if (!isDateString(value)) {
      throw new BadRequestException();
    }

    return value;
  }
}

@Injectable()
export class OptionalDateStringDataPipe implements PipeTransform {
  transform(value: string) {
    value = String(trim(value));

    if (value.length === 0) {
      return value;
    }

    if (!isDateString(value)) {
      throw new BadRequestException();
    }

    return value;
  }
}
