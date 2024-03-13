/* eslint-disable no-undef */

import { PubSub } from '@google-cloud/pubsub';
import { auth, firestore, messaging, storage } from 'firebase-admin';
import { App, initializeApp } from 'firebase-admin/app';

import { Environment } from '../../utility';

class Firebase {
  static app: App;

  pubsub = new PubSub();

  constructor() {
    if (!Firebase.app && Environment.isTestEnv) {
      Firebase.app = initializeApp({
        projectId: Environment.firebaseProjectId,
      });

      return;
    }

    if (!Firebase.app) {
      Firebase.app = initializeApp();
    }
  }

  get firestore() {
    return firestore();
  }

  get auth() {
    return auth();
  }

  get storage() {
    return storage();
  }

  get messaging() {
    return messaging();
  }
}

export const FirebaseService = new Firebase();
