// import { SignUpDataModel } from '@docuslice/app-data';
import { Injectable, PipeTransform } from '@nestjs/common';

import { transformData } from './@DataTransformer';

import { SignUpDataModel } from '<%= orgName %>/app-core';

@Injectable()
export class SignUpDataPipe implements PipeTransform {
  transform = transformData({ classModel: SignUpDataModel });
}
