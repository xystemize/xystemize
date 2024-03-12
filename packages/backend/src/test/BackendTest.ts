/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredential } from '@firebase/auth';
import { DynamicModule, ForwardReference, INestApplication, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FirebaseNetworkClient } from '@xystemize/app-core';
import Supertest from 'supertest';

export class BackendTest {
  api: Supertest.SuperTest<Supertest.Test> = Supertest({});
  userCredential?: UserCredential | null;
  app?: INestApplication;

  async getAuthorization(): Promise<string> {
    const token = await this.userCredential?.user.getIdToken();
    return `Bearer ${token}`;
  }

  initialize = async (module: Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference) => {
    const moduleRef = await Test.createTestingModule({
      imports: [module],
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app = await this.app.init();
    this.api = Supertest(this.app.getHttpServer());

    FirebaseNetworkClient.instance.supertestApi = this.api;

    return this.app;
  };
}
