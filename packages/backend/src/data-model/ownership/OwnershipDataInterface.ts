import { DecodedIdToken } from 'firebase-admin/auth';

export interface OwnerDataInterface {
  id?: string;
  accountId?: string;
  decodedIdToken?: DecodedIdToken;
}
