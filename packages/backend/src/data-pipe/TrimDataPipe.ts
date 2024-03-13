import { Injectable, PipeTransform } from '@nestjs/common';
import { trim } from 'lodash';

@Injectable()
export class TrimDataPipe implements PipeTransform {
  transform(value: string) {
    return trim(value);
  }
}
