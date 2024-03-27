import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

import { DataTransactionType } from '../constant';
import { NumberDateWithDefaultTransformer, StringWithTrimTransformer } from '../data-transformer';
import { IsNotBlank } from '../validation/IsNotBlank';

import { AppBaseDataModel } from './AppBaseDataModel';

class DataModel extends AppBaseDataModel {
  @IsNotBlank()
  @Transform(StringWithTrimTransformer)
  @Expose({ groups: [DataTransactionType.Create] })
  id: string;

  name = 'Firstname Lastname';

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

describe('DataModel', () => {
  test('Data assignment & Groupings', () => {
    const now = Date.now();
    const data = new DataModel({ id: 'id1', createdTimestamp: now, updatedTimestamp: now });
    expect(data.id).toBe('id1');
    expect(data.createdTimestamp).toBe(now);
    expect(data.updatedTimestamp).toBe(now);

    expect(Object.keys(data.toObject())).toStrictEqual(['name', 'id', 'createdTimestamp', 'updatedTimestamp']);
    expect(Object.keys(data.toCreateObject())).toStrictEqual(['id', 'createdTimestamp', 'updatedTimestamp']);
    expect(Object.keys(data.toUpdateObject())).toStrictEqual(['updatedTimestamp']);
  });

  test('update()', () => {
    const now = Date.now();
    const now2 = now + 1;
    const data = new DataModel({ id: 'id1', createdTimestamp: now, updatedTimestamp: now });
    const data2 = new DataModel({ id: 'id2', createdTimestamp: now2, updatedTimestamp: now2 });

    data.update(data2);

    expect(data.id).toBe('id1');
    expect(data.createdTimestamp).toBe(now);
    expect(data.updatedTimestamp).toBe(now2);
  });
});
