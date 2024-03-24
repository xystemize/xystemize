import { Injectable, OnModuleInit } from '@nestjs/common';
import { auth } from 'firebase-admin';

import { FirebaseService } from '../firebase/FirebaseService';

@Injectable()
export class FirebaseAuthService implements OnModuleInit {
  auth?: auth.Auth = FirebaseService.auth;

  async onModuleInit() {
    this.auth = FirebaseService.auth;
  }

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
}
