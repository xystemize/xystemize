/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Controller, Get, Module, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';

import { OptionalStringArrayDataPipe, RequiredStringArrayDataPipe } from './StringArrayDataPipe';

const accounts = 'accounts';
const baseUrl = (process.env.FBASE_API_BASE_URL ?? '') + '/' + accounts;

@Controller(accounts)
class AccountsController {
  @Get('requiredstringarray')
  async getRequiredStringArray(
    @Query(Name.value, RequiredStringArrayDataPipe)
    value: any
  ) {
    return { value };
  }

  @Get('optionalstringarray')
  async getOptionalStringArray(
    @Query(Name.value, OptionalStringArrayDataPipe)
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
  async getRequiredStringArray(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'requiredstringarray',
      params: params,
    });
  }

  async getOptionalStringArray(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'optionalstringarray',
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

  test('RequiredStringArrayDataPipe', async () => {
    let res = await api.getRequiredStringArray({ value: '' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: undefined });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: null });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: NaN });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: true });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: 0 });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: { value: '' } });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: [] });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: [null] });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: [undefined] });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: [''] });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredStringArray({ value: [0, 1] });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toStrictEqual(['0', '1']);

    res = await api.getRequiredStringArray({ value: [0, 1, 'value'] });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toStrictEqual(['0', '1', 'value']);
  });

  test('OptionalStringArrayDataPipe', async () => {
    let res = await api.getOptionalStringArray({ value: undefined });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalStringArray({ value: null });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalStringArray({ value: '' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalStringArray({ value: [] });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalStringArray({ value: NaN });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalStringArray({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalStringArray({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalStringArray({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalStringArray({ value: true });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalStringArray({ value: 0 });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalStringArray({ value: { value: '' } });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalStringArray({ value: [0, 1] });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toStrictEqual(['0', '1']);

    res = await api.getOptionalStringArray({ value: [0, 1, 'value'] });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toStrictEqual(['0', '1', 'value']);
  });
});
