/* eslint-disable no-undef */

import { PubSub } from '@google-cloud/pubsub';
import { auth, firestore, messaging, storage } from 'firebase-admin';
import { App, initializeApp } from 'firebase-admin/app';

class Firebase {
  static app: App;

  pubsub = new PubSub();

  constructor() {
    const env = process.env;

    if (!Firebase.app && env.NODE_ENV === 'test') {
      Firebase.app = initializeApp({
        projectId: env.FBASE_PROJECT_ID,
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
