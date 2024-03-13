/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Body, Controller, Get, Module, Post, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';

import { AlphanumericDataPipe } from './AlphanumericDataPipe';
import { OptionalDateStringDataPipe, RequiredDateStringDataPipe } from './DateStringDataPipe';
import { OptionalEmailDataPipe, RequiredEmailDataPipe } from './EmailDataPipe';
import { NotBlankDataPipe } from './NotBlankDataPipe';
import { NumberWithDefaultDataPipe, OptionalNumberDataPipe, RequiredNumberDataPipe } from './NumberDataPipe';
import { OptionalStringArrayDataPipe, RequiredStringArrayDataPipe } from './StringArrayDataPipe';
import { OptionalStringDataPipe, RequiredStringDataPipe } from './StringDataPipe';
import { TrimDataPipe } from './TrimDataPipe';

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

  @Get('requiredemail')
  async getRequiredEmail(
    @Query(Name.value, RequiredEmailDataPipe)
    value: any
  ) {
    return { value };
  }

  @Get('optionalemail')
  async getOptionalEmail(
    @Query(Name.value, OptionalEmailDataPipe)
    value: any
  ) {
    return { value };
  }

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
  async getAlphanumeric(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'alphanumeric',
      params: params,
    });
  }

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

  async getRequiredEmail(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'requiredemail',
      params: params,
    });
  }

  async getOptionalEmail(params?: { value?: any }) {
    return FirebaseApiClient.get<{ value: any }>({
      baseUrl: baseUrl,
      endpoint: 'optionalemail',
      params: params,
    });
  }

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

  test('RequiredEmailDataPipe', async () => {
    let res = await api.getRequiredEmail({ value: '' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredEmail({ value: undefined });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredEmail({ value: null });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredEmail({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredEmail({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredEmail({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getRequiredEmail({ value: 'user@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('user@example.com');

    res = await api.getRequiredEmail({ value: 'user+1@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('user+1@example.com');

    res = await api.getRequiredEmail({ value: 'user_1@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('user_1@example.com');

    res = await api.getRequiredEmail({ value: 'user.1@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('user.1@example.com');
  });

  test('OptionalEmailDataPipe', async () => {
    let res = await api.getOptionalEmail({ value: '' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalEmail({ value: undefined });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalEmail({ value: null });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(null);

    res = await api.getOptionalEmail({ value: 'ABCDE12345!##$5q' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalEmail({ value: '你好' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalEmail({ value: '🎉🎉🎉' });
    expect(res.statusCode).toBe(400);

    res = await api.getOptionalEmail({ value: 'user@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('user@example.com');

    res = await api.getOptionalEmail({ value: 'user+1@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('user+1@example.com');

    res = await api.getOptionalEmail({ value: 'user_1@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('user_1@example.com');

    res = await api.getOptionalEmail({ value: 'user.1@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe('user.1@example.com');
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

    res = await api.getOptionalNumber({ value: 0 });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(0);

    res = await api.getOptionalNumber({ value: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.data?.value).toBe(1);
  });
});
