/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { firestore } from 'firebase-admin'; // TODO: Update to v10 for optimization

import { FirebaseService } from '../firebase/FirebaseService';

@Injectable()
export class FirestoreService implements OnModuleInit {
  firestore: firestore.Firestore = FirebaseService.firestore;

  async onModuleInit() {
    this.firestore = FirebaseService.firestore;
  }
}
