import { DecodedIdToken } from '../../interface/DecodedIdTokenInterface';

export interface OwnerDataInterface {
  id?: string;
  accountId?: string;
  decodedIdToken?: DecodedIdToken;
}
