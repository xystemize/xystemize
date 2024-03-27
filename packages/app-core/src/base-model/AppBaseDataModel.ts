import { instanceToPlain } from 'class-transformer';

import { DataTransactionType } from '../constant';

import { AppBaseModel } from './AppBaseModel';

export class AppBaseDataModel extends AppBaseModel {
  constructor() {
    super();
  }

  toJson(): string {
    return JSON.stringify(this);
  }

  toObject<Type>(): Type {
    return JSON.parse(this.toJson());
  }

  toCreateObject() {
    return instanceToPlain(this, { excludeExtraneousValues: true, groups: [DataTransactionType.Create] });
  }

  toUpdateObject() {
    return instanceToPlain(this, { excludeExtraneousValues: true, groups: [DataTransactionType.Update] });
  }
}
