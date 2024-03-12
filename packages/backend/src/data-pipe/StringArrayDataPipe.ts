import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isArray, isString, map, trim } from 'lodash';

@Injectable()
export class RequiredStringArrayDataPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(values: any) {
    if (isString(values) && !!values) {
      return [trim(values)];
    }

    if (!isArray(values)) {
      throw new BadRequestException();
    }

    if (!values?.length) {
      throw new BadRequestException();
    }

    values = map(values, (value) => {
      value = String(trim(value));

      if (value.length === 0) {
        throw new BadRequestException();
      }

      return value;
    });

    return values;
  }
}

@Injectable()
export class OptionalStringArrayDataPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(values: any) {
    if (values === undefined || values === null) {
      return null;
    }

    if (isString(values) && !!values) {
      return [trim(values)];
    }

    if (!isArray(values)) {
      throw new BadRequestException();
    }

    if (!values?.length) {
      throw new BadRequestException();
    }

    values = map(values, (value) => {
      value = String(trim(value));

      if (value.length === 0) {
        throw new BadRequestException();
      }

      return value;
    });

    return values;
  }
}
