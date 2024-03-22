// import { AccountBackendModel } from '@docuslice/backend/app-data';
import { Injectable, PipeTransform } from '@nestjs/common';

import { transformData } from './@DataTransformer';

import { AccountDataModel } from '<%= orgName %>/app-core';

@Injectable()
export class AccountDataPipe implements PipeTransform {
  transform = transformData({ classModel: AccountDataModel });
}
