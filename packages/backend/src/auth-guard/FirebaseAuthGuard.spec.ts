/* eslint-disable no-undef */
/* eslint-disable @nx/enforce-module-boundaries */
import { Body, Controller, Get, Injectable, Module, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FirebaseApiClient, generateUuid, Name } from '@xystemize/app-core';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { DecodedIdToken } from 'firebase-admin/auth';
import { autoInjectable } from 'tsyringe';

import { FirebaseAuthOwnerGuard, FirebaseAuthUserGuard } from '../auth-guard';
import { RequiredStringDataPipe } from '../data-pipe';
import { FirebaseClient } from '../firebase';
import { AppBackendModule, FirebaseAuthService } from '../module';
import { BackendTest, generateUserData, TestAccountInterface } from '../test';
import { Environment } from '../utility/Environment';

@Injectable()
@autoInjectable()
class AccountsService {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

  async addOne(user: object) {
    await this.firebaseAuthService.auth?.createUser(user);

    return user;
  }

  async generateVerificationLink(email: string) {
    return this.firebaseAuthService.auth?.generateEmailVerificationLink(email);
  }
}

const accounts = 'accounts';
const baseUrl = Environment.firebaseApiBaseUrl + '/' + accounts;

@Controller(accounts)
class AccountsController {
  @Get(':id')
  @UseGuards(FirebaseAuthUserGuard)
  async getAccountById(
    @Req()
    { decodedIdToken }: { decodedIdToken?: DecodedIdToken | null },

    @Param(Name.id, RequiredStringDataPipe)
    id: string
  ) {
    return { id, decodedIdToken };
  }

  @Post()
  @UseGuards(FirebaseAuthOwnerGuard)
  async addOne(
    @Body()
    body: object
  ) {
    return body;
  }
}

@Module({
  imports: [AppBackendModule],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}

@Module({
  imports: [AccountsModule],
})
export class ApiV1Module {}

class AccountsApi {
  async getAccount<T>(params?: { id?: string; username?: string; email?: string }) {
    return FirebaseApiClient.get<T>({
      baseUrl: baseUrl,
      endpoint: params?.id ?? '',
      params: params,
    });
  }

  async addAccount(params?: { id?: string; username?: string; email?: string }) {
    return FirebaseApiClient.post<typeof params>({
      baseUrl: baseUrl,
      endpoint: '',
      params: params,
    });
  }
}

describe('FirebaseAuthGuard', () => {
  const backendTest = new BackendTest();
  const api = new AccountsApi();
  let accountService: AccountsService;

  const createVerifiedAccountAndSignUserIn = async (account?: TestAccountInterface) => {
    account = account ?? generateUserData();

    await accountService.addOne(account);

    const emailVerifyLink = await accountService.generateVerificationLink(account.email);
    await axios.get(emailVerifyLink ?? '');

    const { data } = await FirebaseApiClient.handleFirebaseResponse(
      signInWithEmailAndPassword(FirebaseClient.auth, account.email, account.password)
    );
    account.id = data?.user.uid ?? '';
    account.userCredential = data;

    return account;
  };

  beforeAll(async () => {
    const api = await backendTest.initialize(ApiV1Module);
    accountService = api.get(AccountsService);
  });

  test('FirebaseAuthOwnerGuard', async () => {
    const [verifiedUser1, verifiedUser2] = await Promise.all([
      createVerifiedAccountAndSignUserIn(),
      createVerifiedAccountAndSignUserIn(),
    ]);

    FirebaseApiClient.currentUser = null;
    let res = await api.addAccount({ username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    FirebaseApiClient.currentUser = verifiedUser1.userCredential?.user;
    res = await api.addAccount({ username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    res = await api.addAccount({ id: 'invalidid', username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    // should not allow non-owner
    FirebaseApiClient.currentUser = verifiedUser2.userCredential?.user;
    res = await api.addAccount({ id: verifiedUser1.id, username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    FirebaseApiClient.currentUser = verifiedUser1.userCredential?.user;
    res = await api.addAccount({ id: verifiedUser1.id, username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(201);
  });

  test('FirebaseAuthUserGuard', async () => {
    const [verifiedUser1, verifiedUser2] = await Promise.all([
      createVerifiedAccountAndSignUserIn(),
      createVerifiedAccountAndSignUserIn(),
    ]);

    FirebaseApiClient.currentUser = null;

    let res = await api.getAccount<{ id: string; decodedIdToken: DecodedIdToken }>({
      id: 'InvalidId',
      username: verifiedUser1.username,
      email: verifiedUser1.email,
    });
    expect(res.statusCode).toBe(403);

    res = await api.getAccount({ id: generateUuid(), username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    // should allow owner
    FirebaseApiClient.currentUser = verifiedUser1.userCredential?.user;
    res = await api.getAccount({ id: verifiedUser1.id, username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(200);
    expect(res.data?.decodedIdToken).toBeDefined();

    // should allow non-owner valid user
    FirebaseApiClient.currentUser = verifiedUser2.userCredential?.user;
    res = await api.getAccount({ id: verifiedUser1.id, username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(200);
  });
});
