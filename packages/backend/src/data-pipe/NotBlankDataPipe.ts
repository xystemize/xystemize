import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { trim } from 'lodash';

@Injectable()
export class NotBlankDataPipe implements PipeTransform {
  transform(value: string) {
    value = trim(value);

    if (String(value).length === 0) {
      throw new BadRequestException();
    }

    return value;
  }
}
