/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

interface NestServerInterface {
  apiInstance: any;
  module: any;
  functionName: string;
}

export const logError = (err) => {
  // eslint-disable-next-line no-undef
  console.error('Nest broken', err);
};

export const createNestServer = async (params: NestServerInterface) => {
  const env = process.env;

  if (env.NODE_ENV === 'test') {
    return;
  }

  if (env.FUNCTION_TARGET !== params.functionName) {
    return;
  }

  const expressAdapter = new ExpressAdapter(params.apiInstance);
  const app = await NestFactory.create(params.module, expressAdapter);

  app.enableCors({
    origin: env.FBASE_CORS_WHITE_LIST,
  });

  return app.init().catch(logError);
};
