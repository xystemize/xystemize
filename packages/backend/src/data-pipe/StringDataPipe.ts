import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { trim } from 'lodash';

@Injectable()
export class RequiredStringDataPipe implements PipeTransform {
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
  transform(value: string) {
    value = String(trim(value));

    if (value.length === 0) {
      return null;
    }

    return value;
  }
}
