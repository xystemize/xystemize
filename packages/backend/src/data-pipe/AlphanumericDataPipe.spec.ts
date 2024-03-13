/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Controller, Get, Module, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';
import { Environment } from '../utility';

import { AlphanumericDataPipe } from './AlphanumericDataPipe';

const accounts = 'accounts';
const baseUrl = Environment.firebaseApiBaseUrl + '/' + accounts;

@Controller(accounts)
class AccountsController {
  @Get('alphanumeric')
  async getAlphanumeric(
    @Query(Name.value, AlphanumericDataPipe)
    value: any
  ) {
    return { value };
  }
}

@Module({
  imports: [AppBackendModule],
  controllers: [AccountsController],
  providers: [],
  exports: [],
})
export class AccountsModule {}

@Module({
  imports: [AccountsModule],
})
export class ApiV1Module {}

class AccountsApi {
  async getAlphanumeric(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'alphanumeric',
      params: params,
    });
  }
}

describe('DataPipe', () => {
  const backendTest = new BackendTest();
  const api = new AccountsApi();

  beforeAll(async () => {
    await backendTest.initialize(ApiV1Module);
  });

  test('AlphanumericDataPipe', async () => {
    let res = await api.getAlphanumeric({ value: '' });
    expect(res.statusCode).toBe(400);

    res = await api.getAlphanumeric({ value: undefined });
    expect(res.statusCode).toBe(400);

    res = await api.getAlphanumeric({ value: null });
    expect(res.statusCode).toBe(400);

    res = await api.getAlphanumeric({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getAlphanumeric({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getAlphanumeric({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getAlphanumeric({ value: 'ABCDE' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('ABCDE');

    res = await api.getAlphanumeric({ value: 'ABCDE12345' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('ABCDE12345');
  });
});
