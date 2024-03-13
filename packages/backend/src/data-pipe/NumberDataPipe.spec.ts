/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Controller, Get, Module, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';
import { Environment } from '../utility/Environment';

import { NumberWithDefaultDataPipe, OptionalNumberDataPipe, RequiredNumberDataPipe } from './NumberDataPipe';

const accounts = 'accounts';
const baseUrl = Environment.firebaseApiBaseUrl + '/' + accounts;

@Controller(accounts)
class AccountsController {
  @Get('numberwithdefault')
  async getNumberWithDefault(
    @Query(Name.value, NumberWithDefaultDataPipe)
    value: any
  ) {
    return { value };
  }

  @Get('requirednumber')
  async getRequiredNumber(
    @Query(Name.value, RequiredNumberDataPipe)
    value: any
  ) {
    return { value };
  }

  @Get('optionalnumber')
  async getOptionalNumber(
    @Query(Name.value, OptionalNumberDataPipe)
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
  async getNumberWithDefault(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'numberwithdefault',
      params: params,
    });
  }

  async getRequiredNumber(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'requirednumber',
      params: params,
    });
  }

  async getOptionalNumber(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'optionalnumber',
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

  test('NumberWithDefaultDataPipe', async () => {
    let res = await api.getNumberWithDefault({ value: '' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getNumberWithDefault({ value: undefined });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getNumberWithDefault({ value: null });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getNumberWithDefault({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getNumberWithDefault({ value: '你好' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getNumberWithDefault({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getNumberWithDefault({ value: 0 });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getNumberWithDefault({ value: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(1);
  });

  test('RequiredNumberDataPipe', async () => {
    let res = await api.getRequiredNumber({ value: '' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredNumber({ value: undefined });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredNumber({ value: null });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredNumber({ value: NaN });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredNumber({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredNumber({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredNumber({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalNumber({ value: '0' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getOptionalNumber({ value: '1' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(1);

    res = await api.getRequiredNumber({ value: 0 });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getRequiredNumber({ value: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(1);
  });

  test('OptionalNumberDataPipe', async () => {
    let res = await api.getOptionalNumber({ value: '' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalNumber({ value: undefined });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalNumber({ value: null });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getRequiredNumber({ value: NaN });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalNumber({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalNumber({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalNumber({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalNumber({ value: '0' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getOptionalNumber({ value: '1' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(1);

    res = await api.getOptionalNumber({ value: 0 });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getOptionalNumber({ value: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(1);
  });
});
