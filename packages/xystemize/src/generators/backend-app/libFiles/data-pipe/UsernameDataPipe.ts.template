// import { ValidationRule } from '@docuslice/app-constant';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { matches } from 'class-validator';
import { trim } from 'lodash';

import { ValidationRule } from '<%= orgName %>/app-core';

@Injectable()
export class RequiredUsernameDataPipe implements PipeTransform {
  transform(value: string) {
    value = String(trim(value)).toLowerCase();

    if (value.length < ValidationRule.UsernameMinLength) {
      throw new BadRequestException();
    }

    if (value.length > ValidationRule.UsernameMaxLength) {
      throw new BadRequestException();
    }

    if (!matches(value, ValidationRule.UsernameCharsRegex)) {
      throw new BadRequestException();
    }

    return value;
  }
}

@Injectable()
export class OptionalUsernameDataPipe implements PipeTransform {
  transform(value: string) {
    value = String(trim(value)).toLowerCase();

    if (value.length === 0) {
      return value;
    }

    if (value.length < ValidationRule.UsernameMinLength) {
      throw new BadRequestException();
    }

    if (value.length > ValidationRule.UsernameMaxLength) {
      throw new BadRequestException();
    }

    if (!matches(value, ValidationRule.UsernameCharsRegex)) {
      throw new BadRequestException();
    }

    return value;
  }
}
