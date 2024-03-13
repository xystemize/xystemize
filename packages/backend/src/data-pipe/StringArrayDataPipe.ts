/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isArray, map, trim } from 'lodash';

@Injectable()
export class RequiredStringArrayDataPipe implements PipeTransform {
  transform(values: any) {
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
  transform(values: any) {
    if (values === undefined || values === null || values === '') {
      return null;
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
