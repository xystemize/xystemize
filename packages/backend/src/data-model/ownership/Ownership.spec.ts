import { DecodedIdToken } from 'firebase-admin/auth';
import { v4 as uuidv4 } from 'uuid';

import { OwnershipDataModel } from './OwnershipDataModel';

describe('OwnershipModel', () => {
  test('OwnershipModel validation', async () => {
    const Ownership = new OwnershipDataModel({
      id: uuidv4(),
      accountId: 'lkadlfkjaermlkjda',
      decodedIdToken: { uid: 'lkadlfkjaermlkjda' } as DecodedIdToken,
    });

    expect(Ownership.isValid).toBe(true);
  });
});
