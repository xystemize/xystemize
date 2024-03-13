/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Controller, Get, Module, Query } from '@nestjs/common';
import { FirebaseApiClient, Name } from '@xystemize/app-core';

import { AppBackendModule } from '../module';
import { BackendTest } from '../test';
import { Environment } from '../utility/Environment';

import { OptionalEmailDataPipe, RequiredEmailDataPipe } from './EmailDataPipe';

const accounts = 'accounts';
const baseUrl = Environment.firebaseApiBaseUrl + '/' + accounts;

@Controller(accounts)
class AccountsController {
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
}

describe('DataPipe', () => {
  const backendTest = new BackendTest();
  const api = new AccountsApi();

  beforeAll(async () => {
    await backendTest.initialize(ApiV1Module);
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
});
