import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isAlphanumeric } from 'class-validator';
import { trim } from 'lodash';

export class AlphanumericDataPipe implements PipeTransform {
  transform(value: string) {
    value = String(trim(value));

    if (!isAlphanumeric(value)) {
      throw new BadRequestException();
    }

    return value;
  }
}
