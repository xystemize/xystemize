import { StringWithTrimTransformer } from '@xystemize/app-core';
import { AppBaseDataModel } from '@xystemize/app-core';
import { Expose, Transform } from 'class-transformer';
import { DecodedIdToken } from 'firebase-admin/auth';

import { OwnerDataInterface } from './OwnershipDataInterface';

export class OwnershipDataModel extends AppBaseDataModel implements OwnerDataInterface {
  @Transform(StringWithTrimTransformer)
  @Expose()
  id: string;

  @Transform(StringWithTrimTransformer)
  @Expose()
  accountId: string;

  @Expose()
  decodedIdToken?: DecodedIdToken;

  @Expose()
  reqParams: { [key: string]: string };

  constructor(obj?: OwnerDataInterface) {
    super();

    this.transformAndAssign(OwnershipDataModel, obj);
  }

  get modelName(): string {
    return '';
  }

  get firestoreCollectionName() {
    return '';
  }

  get uid(): string {
    return this.decodedIdToken?.uid || this.decodedIdToken?.sub || '';
  }

  get isValid() {
    return this.id !== '' || this.accountId !== '';
  }

  get isOwnerBasedFromReqIdParam() {
    const { id } = this.reqParams || {};
    return id === this.uid;
  }

  get isDocumentOwner() {
    return this.id === this.uid || this.accountId === this.uid;
  }

  get isReqParamsValid() {
    const { id } = this.reqParams || {};

    if (!id) {
      // if blank, return valid
      return true;
    }

    const isParamIdMatchDocumentId = this.id === id;
    return isParamIdMatchDocumentId;
  }
}
