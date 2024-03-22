import { AuthProviderId, generateUuid } from '@xystemize/app-core';

import { Environment } from '../utility/Environment';

import {
  AccountTypeId,
  EntityTypeId,
  MediaDataModel,
  MediaTypeId,
  TestAccountInterface,
} from '<%= orgName %>/app-core';

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
    accountTypeId: AccountTypeId.User,
    createdTimestamp: Date.now(),
    updatedTimestamp: Date.now(),
    userCredential: null,
    media: new MediaDataModel({
      entityId: '',
      entityTypeId: EntityTypeId.Account,
      mediaTypeId: MediaTypeId.Image,
      fileExtension: '',
      rawFileUri: '',
      bucket: Environment.firebaseStorageBucket,
    }),
    devicePlatformId: 0,
    timezone: null,
  };
};
