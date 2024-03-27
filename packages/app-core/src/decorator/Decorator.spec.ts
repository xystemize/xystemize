import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

import { AppBaseDataModel } from '../base-model';
import { DataTransactionType, Name } from '../constant';
import { NumberDateWithDefaultTransformer, StringWithTrimTransformer } from '../data-transformer';
import { IsNotBlank } from '../validation/IsNotBlank';

import { CollectionName } from './CollectionName';

@CollectionName('accounts')
class DataModel extends AppBaseDataModel {
  @IsNotBlank()
  @Transform(StringWithTrimTransformer)
  @Expose({ groups: [DataTransactionType.Create] })
  id: string;

  @IsNumber()
  @Transform(NumberDateWithDefaultTransformer)
  @Expose({ groups: [DataTransactionType.Create] })
  createdTimestamp: number;

  @IsNumber()
  @Transform(NumberDateWithDefaultTransformer)
  @Expose({ groups: [DataTransactionType.Create, DataTransactionType.Update] })
  updatedTimestamp?: number | null;

  constructor(obj: { id: string; createdTimestamp: number; updatedTimestamp: number }) {
    super();
    this.transformAndAssign(DataModel, obj);
  }
}

describe('Decorator', () => {
  test('CollectionName', () => {
    const now = Date.now();
    const data = new DataModel({ id: 'id1', createdTimestamp: now, updatedTimestamp: now });

    expect(data[Name.collectionName]).toBe('accounts');
  });
});
