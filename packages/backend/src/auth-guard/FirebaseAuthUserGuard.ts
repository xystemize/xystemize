import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Name } from '@xystemize/app-core';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseAuthUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let isAuthenticatedUser = false;

    try {
      const req = context.switchToHttp().getRequest() || {};
      const { headers } = req;
      const { authorization } = headers || {};
      const token = String(authorization).replace('Bearer ', '').trim();

      const decodedIdToken = await auth().verifyIdToken(token);
      const isEmailVerified = decodedIdToken.email_verified || false;

      req[Name.customClaim] = decodedIdToken;

      isAuthenticatedUser = isEmailVerified;
    } catch (error) {
      isAuthenticatedUser = false;
    }

    return isAuthenticatedUser;
  }
}
