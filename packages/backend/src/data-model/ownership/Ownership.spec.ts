import { v4 as uuidv4 } from 'uuid';

import { DecodedIdToken } from '../../interface/DecodedIdTokenInterface';

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
