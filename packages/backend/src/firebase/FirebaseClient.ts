/* eslint-disable no-undef */
import { FirebaseApp, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export class FirebaseClient {
  static instance = new FirebaseClient();
  static app: FirebaseApp;
  static emulatorInitialized = false;

  constructor() {
    const options = JSON.parse(process.env.FBASE_CLIENT_CREDENTIAL ?? '{}');
    FirebaseClient.app = initializeApp(options);
  }

  get auth() {
    const auth = getAuth(FirebaseClient.app);

    if (process.env.NODE_ENV === 'test' && !FirebaseClient.emulatorInitialized) {
      connectAuthEmulator(auth, process.env.FIREBASE_AUTH_EMULATOR_URL ?? '');
      FirebaseClient.emulatorInitialized = true;
    }

    return auth;
  }

  get firestore() {
    return getFirestore(FirebaseClient.app);
  }
}
