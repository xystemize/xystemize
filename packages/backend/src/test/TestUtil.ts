/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

import { delayByMilliseconds, Name } from '@xystemize/app-core';
import { DateUnit } from '@xystemize/app-core';
import axios from 'axios';
import dayjs from 'dayjs';
import { map } from 'lodash';

import { FirestoreService } from '../module';
import { execAsync } from '../utility/CodeUtility';

const timeoutDate = dayjs().add(2, DateUnit.Minutes).valueOf();

const checkEnvironment = () => {
  const nodeEnv = process.env[Name.NODE_ENV];

  if (nodeEnv !== 'test') {
    throw new Error('Invalid Environment');
  }
};

const serviceChecker = async () => {
  if (Date.now() > timeoutDate) {
    return;
  }

  const [isFirebaseEmulatorRunning] = await Promise.all([checkIfEmulatorRunning(Name.FIREBASE_AUTH_EMULATOR_URL)]);

  if (isFirebaseEmulatorRunning) {
    return;
  }

  await delayByMilliseconds(250);
  await serviceChecker();
};

export const resetFirestore = async () => {
  checkEnvironment();

  // Reset Firestore collections
  const firestore = new FirestoreService().firestore;
  const collections = await firestore.listCollections();
  await Promise.all(
    map(collections, (collection) => {
      return firestore.recursiveDelete(collection);
    })
  );
};

export const resetAllDatabases = async () => {
  checkEnvironment();

  await Promise.all([resetFirestore()]);
};

const migrateAllDatabases = async () => {
  checkEnvironment();

  console.info('⚙️ Migrating all databases...');
  /**
   * Note: The command `npm run neo4jMigrate` uses Morpheus under the hood
   * Morpheus looks on two different paths for the configuration (1. morpheus.json, 2. .env)
   * When morpheus command is invoked programmatically like this one, it will look in the .env
   * When morpheus command is invoked through terminal by a developer/administrator, it will look in morpheus.json
   */
  // await Promise.all([execAsync('npm run prismaResetAndMigrateDevelop'), execAsync('npm run neo4jMigrate')]);
};

const checkIfEmulatorRunning = async (envKey: string) => {
  const authEmulatorUrl = process.env[envKey] || '';
  let isRunning = false;

  try {
    await axios.get(authEmulatorUrl);
    isRunning = true;
  } catch (err) {
    isRunning = false;
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return isRunning;
  }
};

const initializeFirebaseEmulators = async () => {
  checkEnvironment();

  const isEmulatorRunning = await checkIfEmulatorRunning(Name.FIREBASE_AUTH_EMULATOR_URL);

  if (isEmulatorRunning) {
    return;
  }

  console.info('⚙️ Killing Firebase ports...');
  await execAsync('npx kill-port --port 9001,9002,9003,9004,9005,9006');

  console.info('⚙️ Running emulators...');
  await execAsync(
    `npx ttab -t 'Firebase Emulators' npx firebase emulators:start --project ${process.env.FBASE_PROJECT_ID}`
  );

  // console.info('⚙️ Making sure pubsub topics are added...');
  // const pubsub = new PubSubService();
  // await pubsub.addTopics();
};

export const initializeBackendServices = async () => {
  checkEnvironment();

  await Promise.all([initializeFirebaseEmulators(), serviceChecker()]);
  await migrateAllDatabases();

  console.info('⚙️ starting tests...');
};
