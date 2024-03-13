/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Body, Controller, Get, Module, Post, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';
import { Environment } from '../utility/Environment';

import { NotBlankDataPipe } from './NotBlankDataPipe';

const accounts = 'accounts';
const baseUrl = Environment.firebaseApiBaseUrl + '/' + accounts;

@Controller(accounts)
class AccountsController {
  @Get('notblankdata')
  async getNotBlankData(
    @Query(Name.value, NotBlankDataPipe)
    value: any
  ) {
    return { value };
  }

  @Post('notblankdata')
  async postNotBlankData(
    @Body(Name.value, NotBlankDataPipe)
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
  async getNotBlankData(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'notblankdata',
      params: params,
    });
  }

  async postNotBlankData(params?: { value?: any }) {
    return FirebaseApiClient.post<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'notblankdata',
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

  test('NotBlankDataPipe', async () => {
    let res = await api.getNotBlankData({ value: '' });
    expect(res.statusCode).toBe(400);

    res = await api.getNotBlankData({ value: '      ' });
    expect(res.statusCode).toBe(400);

    res = await api.getNotBlankData({ value: undefined });
    expect(res.statusCode).toBe(400);

    res = await api.getNotBlankData({ value: null });
    expect(res.statusCode).toBe(400);

    res = await api.getNotBlankData({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('ABCDE12345!##$5q');

    res = await api.getNotBlankData({ value: '你好' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('你好');

    res = await api.getNotBlankData({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('🎉🎉🎉');

    res = await api.getNotBlankData({ value: 'user@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('user@example.com');

    res = await api.getNotBlankData({ value: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('1');

    res = await api.getNotBlankData({ value: true });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('true');

    res = await api.postNotBlankData({ value: 1 });
    expect(res.statusCode).toBe(201);
    expect(res.data?.value).toBe(1);

    res = await api.postNotBlankData({ value: true });
    expect(res.statusCode).toBe(201);
    expect(res.data?.value).toBe(true);
  });
});
