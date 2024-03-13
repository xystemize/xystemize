/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Controller, Get, Module, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';

import { OptionalStringDataPipe, RequiredStringDataPipe } from './StringDataPipe';

const accounts = 'accounts';
const baseUrl = (process.env.FBASE_API_BASE_URL ?? '') + '/' + accounts;

@Controller(accounts)
class AccountsController {
  @Get('requiredstring')
  async getRequiredString(
    @Query(Name.value, RequiredStringDataPipe)
    value: any
  ) {
    return { value };
  }

  @Get('optionalstring')
  async getOptionalString(
    @Query(Name.value, OptionalStringDataPipe)
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
  async getRequiredString(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'requiredstring',
      params: params,
    });
  }

  async getOptionalString(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'optionalstring',
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

  test('RequiredStringDataPipe', async () => {
    let res = await api.getRequiredString({ value: '' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredString({ value: undefined });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredString({ value: null });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredString({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('ABCDE12345!##$5q');

    res = await api.getRequiredString({ value: '你好' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('你好');

    res = await api.getRequiredString({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('🎉🎉🎉');

    res = await api.getRequiredString({ value: '0' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('0');

    res = await api.getRequiredString({ value: '1' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('1');
  });

  test('OptionalStringDataPipe', async () => {
    let res = await api.getOptionalString({ value: '' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalString({ value: undefined });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalString({ value: null });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalString({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('ABCDE12345!##$5q');

    res = await api.getOptionalString({ value: '你好' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('你好');

    res = await api.getOptionalString({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('🎉🎉🎉');

    res = await api.getOptionalString({ value: '0' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('0');

    res = await api.getOptionalString({ value: '1' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('1');
  });
});
