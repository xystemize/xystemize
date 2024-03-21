import { Module } from '@nestjs/common';

import { FirebaseAuthService } from '../auth/FirebaseAuthService';
import { FirestoreService } from '../firestore/FirestoreService';
import { PubSubService } from '../pubsub/PubSubService';
import { StorageService } from '../storage/StorageService';

@Module({
  providers: [FirebaseAuthService, FirestoreService, PubSubService, StorageService],
  exports: [FirebaseAuthService, FirestoreService, PubSubService, StorageService],
})
export class AppBackendModule {}
