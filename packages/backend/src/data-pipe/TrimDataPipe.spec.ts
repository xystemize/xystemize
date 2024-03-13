/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Controller, Get, Module, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';
import { Environment } from '../utility/Environment';

import { TrimDataPipe } from './TrimDataPipe';

const accounts = 'accounts';
const baseUrl = Environment.firebaseApiBaseUrl + '/' + accounts;

@Controller(accounts)
class AccountsController {
  @Get('trimdata')
  async getTrimData(
    @Query(Name.value, TrimDataPipe)
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
  async getTrimData(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'trimdata',
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

  test('RequiredDateStringDataPipe', async () => {
    let res = await api.getTrimData({ value: '' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('');

    res = await api.getTrimData({ value: undefined });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('');

    res = await api.getTrimData({ value: null });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('');

    res = await api.getTrimData({ value: '  ABCDE12345!##$5q  ' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('ABCDE12345!##$5q');

    res = await api.getTrimData({ value: '   你好 ' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('你好');

    res = await api.getTrimData({ value: '🎉🎉🎉  ' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('🎉🎉🎉');

    res = await api.getTrimData({ value: '2024-01-01    ' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('2024-01-01');

    res = await api.getTrimData({ value: '2024-03-13T08:14:01.043Z  ' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('2024-03-13T08:14:01.043Z');
  });
});
