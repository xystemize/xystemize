/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Controller, Get, Module, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';

import { OptionalDateStringDataPipe, RequiredDateStringDataPipe } from './DateStringDataPipe';

const accounts = 'accounts';
const baseUrl = (process.env.FBASE_API_BASE_URL ?? '') + '/' + accounts;

@Controller(accounts)
class AccountsController {
  @Get('requireddatestring')
  async getRequiredDateString(
    @Query(Name.value, RequiredDateStringDataPipe)
    value: any
  ) {
    return { value };
  }

  @Get('optionaldatestring')
  async getOptionalDateString(
    @Query(Name.value, OptionalDateStringDataPipe)
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
  async getRequiredDateString(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'requireddatestring',
      params: params,
    });
  }

  async getOptionalDateString(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'optionaldatestring',
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
    let res = await api.getRequiredDateString({ value: '' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredDateString({ value: undefined });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredDateString({ value: null });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredDateString({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredDateString({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredDateString({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredDateString({ value: '2024-01-01' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('2024-01-01');

    res = await api.getRequiredDateString({ value: '2024-03-13T08:14:01.043Z' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('2024-03-13T08:14:01.043Z');
  });

  test('OptionalDateStringDataPipe', async () => {
    let res = await api.getOptionalDateString({ value: '' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalDateString({ value: undefined });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalDateString({ value: null });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalDateString({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalDateString({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalDateString({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalDateString({ value: '2024-01-01' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('2024-01-01');

    res = await api.getOptionalDateString({ value: '2024-03-13T08:14:01.043Z' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('2024-03-13T08:14:01.043Z');
  });
});
