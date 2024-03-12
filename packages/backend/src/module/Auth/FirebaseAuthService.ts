import { Injectable, OnModuleInit } from '@nestjs/common';
import { auth } from 'firebase-admin';

import { FirebaseService } from '../Firebase/FirebaseService';

@Injectable()
export class FirebaseAuthService implements OnModuleInit {
  auth?: auth.Auth = FirebaseService.auth;

  async onModuleInit() {
    this.auth = FirebaseService.auth;
  }

  // async signUp(params: SignUpDataModel) {
  //   return this.auth?.createUser(params.toObjectWithoutBlankProps());
  // }

  async getEmailVerificationLink(email: string) {
    return this.auth?.generateEmailVerificationLink(email);
  }

  async verifyAccountEmail(uid: string) {
    await this.auth?.updateUser(uid, {
      emailVerified: true,
    });
  }

  async deleteUser(uid: string) {
    await this.auth?.deleteUser(uid);
  }

  // async getCustomClaim(params?: { accountId: string | null }) {
  //   if (!params?.accountId) {
  //     return null;
  //   }

  //   const user = await this.auth?.getUser(params.accountId);

  //   if (!user) {
  //     return null;
  //   }

  //   const customClaim = new CustomClaimDataModel(user.customClaims);
  //   customClaim.userId = user.uid;
  //   customClaim.sub = user.uid;
  //   customClaim.email = user.email ?? '';
  //   customClaim.emailVerified = user.emailVerified;

  //   return customClaim;
  // }

  // async updateCustomClaim(customClaim?: CustomClaimDataModel | null) {
  //   if (!customClaim) {
  //     return;
  //   }

  //   return this.auth?.setCustomUserClaims(customClaim.accountId, customClaim.toCustomClaim());
  // }
}
