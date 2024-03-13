import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isNumber } from 'class-validator';

@Injectable()
export class OptionalNumberDateDataPipe implements PipeTransform {
  transform(value: number | null) {
    if (!value) {
      return null;
    }

    value = Number(value);

    if (!isNumber(value)) {
      throw new BadRequestException();
    }

    return value;
  }
}
