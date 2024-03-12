import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { trim } from 'lodash';

@Injectable()
export class NotBlankDataPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any) {
    value = trim(value);

    if (String(value).length === 0) {
      throw new BadRequestException();
    }

    return value;
  }
}
