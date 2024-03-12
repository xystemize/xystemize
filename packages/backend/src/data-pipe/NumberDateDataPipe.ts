import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isNumber } from 'class-validator';

@Injectable()
export class OptionalNumberDateDataPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any) {
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
