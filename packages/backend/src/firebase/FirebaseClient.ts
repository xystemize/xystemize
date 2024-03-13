/* eslint-disable no-undef */
import { FirebaseApp, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { Environment } from '../utility';

class Client {
  static instance = new Client();
  static app: FirebaseApp;
  private static emulatorInitialized = false;

  constructor() {
    Client.app = initializeApp(Environment.firebaseClientCredential);
  }

  get auth() {
    const auth = getAuth(Client.app);

    if (Environment.isTestEnv && !Client.emulatorInitialized) {
      connectAuthEmulator(auth, Environment.firebaseAuthEmulatorUrl);
      Client.emulatorInitialized = true;
    }

    return auth;
  }

  get firestore() {
    return getFirestore(Client.app);
  }
}

export const FirebaseClient = new Client();
