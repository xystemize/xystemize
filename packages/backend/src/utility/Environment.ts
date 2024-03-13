/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { EnvironmentType, Name } from '@xystemize/app-core';
import * as env from 'env-var';

export class Env {
  constructor() {
    if (this.isTestEnv) {
      require('dotenv-flow').config({ silent: true });
      return;
    }

    require('dotenv').config();
  }

  get nodeEnv() {
    return env.get(Name.NODE_ENV).asString();
  }

  get isTestEnv(): boolean {
    return this.nodeEnv === EnvironmentType.Test;
  }

  get firebaseProjectId(): string {
    return env.get(Name.FBASE_PROJECT_ID).asString() || '';
  }

  get firebaseApiBaseUrl(): string {
    return env.get(Name.FBASE_API_BASE_URL).asString() || '';
  }

  get firebaseFunctionTarget(): string {
    return env.get(Name.FUNCTION_TARGET).asString() || env.get(Name.K_SERVICE).asString() || '';
  }

  get firebaseCORSWhiteList(): string[] {
    return env.get(Name.FBASE_CORS_WHITE_LIST).asJsonArray() || [];
  }

  get firebaseAuthEmulatorUrl(): string {
    return env.get(Name.FIREBASE_AUTH_EMULATOR_URL).asString() || '';
  }

  get firebaseClientCredential() {
    return (env.get(Name.FBASE_CLIENT_CREDENTIAL).asJsonObject() || {}) as {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId: string;
    };
  }
}

export const Environment = new Env();
