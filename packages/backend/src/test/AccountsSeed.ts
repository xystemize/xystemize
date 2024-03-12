import { AuthProviderId, generateUuid } from '@xystemize/app-core';
import { UserCredential } from 'firebase/auth';

export interface TestAccountInterface {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  authProviderId: number;
  createdTimestamp: number;
  updatedTimestamp: number;
  userCredential?: UserCredential | null;
}

export const generateUserData = (): TestAccountInterface => {
  let uniqueId = generateUuid();
  uniqueId = uniqueId.toLowerCase();

  return {
    id: '',
    email: `${uniqueId}@example.com`,
    password: 'Password1!!!',
    username: uniqueId,
    firstName: `FirstName${uniqueId}`,
    lastName: `LastName${uniqueId}`,
    authProviderId: AuthProviderId.EmailAndPassword,
    createdTimestamp: Date.now(),
    updatedTimestamp: Date.now(),
    userCredential: null,
  };
};
