import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isNumber } from 'class-validator';

@Injectable()
export class NumberWithDefaultDataPipe implements PipeTransform {
  transform(value: unknown) {
    value = Number(value);

    if (!isNumber(value)) {
      return 0;
    }

    return value;
  }
}

@Injectable()
export class OptionalNumberDataPipe implements PipeTransform {
  transform(value: unknown) {
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

@Injectable()
export class RequiredNumberDataPipe implements PipeTransform {
  transform(value: unknown) {
    if (value === null || value === undefined || value === '') {
      throw new BadRequestException();
    }

    value = Number(value);

    if (!isNumber(value)) {
      throw new BadRequestException();
    }

    return value;
  }
}
