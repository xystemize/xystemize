import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { trim } from 'lodash';

@Injectable()
export class RequiredStringDataPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: string) {
    value = String(trim(value));

    if (value.length === 0) {
      throw new BadRequestException();
    }

    return value;
  }
}

@Injectable()
export class OptionalStringDataPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: string) {
    value = String(trim(value));

    if (value.length === 0) {
      return value;
    }

    return value;
  }
}
