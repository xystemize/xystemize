import { instanceToPlain } from 'class-transformer';
import { omitBy } from 'lodash';

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

  update<Type extends this>(instance: Type) {
    const updateProps = Object.keys(this.toUpdateObject());
    const sanitizedObj = omitBy(instance, (value, key) => !updateProps.includes(key) || value === undefined);

    return Object.assign(this, sanitizedObj);
  }
}
