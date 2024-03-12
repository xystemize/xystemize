import { Module } from '@nestjs/common';

import { FirebaseAuthService } from '../Auth/FirebaseAuthService';
import { FirestoreService } from '../Firestore/FirestoreService';
import { PubSubService } from '../PubSub/PubSubService';
import { StorageService } from '../Storage/StorageService';

@Module({
  providers: [FirebaseAuthService, FirestoreService, PubSubService, StorageService],
  exports: [FirebaseAuthService, FirestoreService, PubSubService, StorageService],
})
export class AppBackendModule {}
