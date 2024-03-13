import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NotBlankDataPipe implements PipeTransform {
  transform(value: unknown) {
    if (value === null || value === undefined || String(value).trim().length === 0) {
      throw new BadRequestException();
    }

    return value;
  }
}
