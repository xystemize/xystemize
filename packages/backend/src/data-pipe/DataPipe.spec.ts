/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Controller, Get, Module, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';

import { AlphanumericDataPipe } from './AlphanumericDataPipe';
import { OptionalDateStringDataPipe, RequiredDateStringDataPipe } from './DateStringDataPipe';

const accounts = 'accounts';
const baseUrl = (process.env.FBASE_API_BASE_URL ?? '') + '/' + accounts;

@Controller(accounts)
class AccountsController {
  @Get('alphanumeric')
  async getAlphanumeric(
    @Query(Name.value, AlphanumericDataPipe)
    value: any
  ) {
    return { value };
  }

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
  async getAlphanumeric(params?: { value?: any }) {
    return FirebaseApiClient.get({
      baseUrl: baseUrl,
      endpoint: 'alphanumeric',
      params: params,
    });
  }

  async getRequiredDateString(params?: { value?: any }) {
    return FirebaseApiClient.get({
      baseUrl: baseUrl,
      endpoint: 'requireddatestring',
      params: params,
    });
  }

  async getOptionalDateString(params?: { value?: any }) {
    return FirebaseApiClient.get({
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

  test('alphanumeric', async () => {
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

    res = await api.getAlphanumeric({ value: 'ABCDE12345' });
    expect(res.statusCode).toBe(200);
  });

  test('requireddatestring', async () => {
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

    res = await api.getRequiredDateString({ value: new Date().toISOString() });
    expect(res.statusCode).toBe(200);
  });

  test('optionaldatestring', async () => {
    let res = await api.getOptionalDateString({ value: '' });
    expect(res.statusCode).toBe(200);

    res = await api.getOptionalDateString({ value: undefined });
    expect(res.statusCode).toBe(200);

    res = await api.getOptionalDateString({ value: null });
    expect(res.statusCode).toBe(200);

    res = await api.getOptionalDateString({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalDateString({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalDateString({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalDateString({ value: '2024-01-01' });
    expect(res.statusCode).toBe(200);

    res = await api.getOptionalDateString({ value: new Date().toISOString() });
    expect(res.statusCode).toBe(200);
  });
});
