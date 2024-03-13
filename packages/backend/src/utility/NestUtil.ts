/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { Environment } from './Environment';

interface NestServerInterface {
  apiInstance: any;
  module: any;
  functionName: string;
}

export const logError = (err: any) => {
  // eslint-disable-next-line no-undef
  console.error('Nest broken', err);
};

export const createNestServer = async (params: NestServerInterface) => {
  if (Environment.isTestEnv) {
    return;
  }

  if (Environment.firebaseFunctionTarget !== params.functionName) {
    return;
  }

  const expressAdapter = new ExpressAdapter(params.apiInstance);
  const app = await NestFactory.create(params.module, expressAdapter);

  app.enableCors({
    origin: Environment.firebaseCORSWhiteList,
  });

  return app.init().catch(logError);
};
