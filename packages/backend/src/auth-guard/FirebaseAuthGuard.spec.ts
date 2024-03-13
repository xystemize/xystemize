/* eslint-disable no-undef */
/* eslint-disable @nx/enforce-module-boundaries */
import { Body, Controller, Get, Injectable, Module, Param, Post, UseGuards } from '@nestjs/common';
import { FirebaseNetworkClient, Name } from '@xystemize/app-core';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { autoInjectable } from 'tsyringe';

import { FirebaseAuthOwnerGuard, FirebaseAuthUserGuard } from '../auth-guard';
import { RequiredStringDataPipe } from '../data-pipe';
import { FirebaseClient } from '../firebase';
import { AppBackendModule, FirebaseAuthService } from '../module';
import { BackendTest, generateUserData, TestAccountInterface } from '../test';

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

@Controller(accounts)
class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get(':id')
  @UseGuards(FirebaseAuthUserGuard)
  async getAccountById(
    @Param(Name.id, RequiredStringDataPipe)
    id: string
  ) {
    return { id };
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
  async getAccount(params?: { id?: string; username?: string; email?: string }) {
    return FirebaseNetworkClient.instance.get<{ isAvailable: boolean }>({
      baseUrl: (process.env.FBASE_API_BASE_URL ?? '') + '/' + accounts,
      endpoint: accounts,
      params: params,
    });
  }

  async addAccount(params?: { id?: string; username?: string; email?: string }) {
    return FirebaseNetworkClient.instance.post<typeof params>({
      baseUrl: (process.env.FBASE_API_BASE_URL ?? '') + '/' + accounts,
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

    const { data } = await FirebaseNetworkClient.instance.handleFirebaseResponse(
      signInWithEmailAndPassword(FirebaseClient.instance.auth, account.email, account.password)
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
    FirebaseNetworkClient.instance.currentUser = verifiedUser1.userCredential?.user;

    let res = await api.addAccount({ username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    res = await api.addAccount({ id: 'invalidid', username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    // should not allow non-owner
    FirebaseNetworkClient.instance.currentUser = verifiedUser2.userCredential?.user;
    res = await api.addAccount({ id: verifiedUser1.id, username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    FirebaseNetworkClient.instance.currentUser = verifiedUser1.userCredential?.user;
    res = await api.addAccount({ id: verifiedUser1.id, username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(201);
  });

  test('FirebaseAuthUserGuard', async () => {
    const [verifiedUser1, verifiedUser2] = await Promise.all([
      createVerifiedAccountAndSignUserIn(),
      createVerifiedAccountAndSignUserIn(),
    ]);

    FirebaseNetworkClient.instance.currentUser = null;

    let res = await api.getAccount({ username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    res = await api.getAccount({ id: 'invalidid', username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(403);

    // should allow owner
    FirebaseNetworkClient.instance.currentUser = verifiedUser1.userCredential?.user;
    res = await api.getAccount({ id: verifiedUser1.id, username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(200);

    // should allow non-owner valid user
    FirebaseNetworkClient.instance.currentUser = verifiedUser2.userCredential?.user;
    res = await api.getAccount({ id: verifiedUser1.id, username: verifiedUser1.username, email: verifiedUser1.email });
    expect(res.statusCode).toBe(200);
  });
});