import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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

      isAuthenticatedUser = isEmailVerified;
    } catch (error) {
      isAuthenticatedUser = false;
    }

    return isAuthenticatedUser;
  }
}

// Purpose of OptionalFirebaseAuthUserGuard
// is to be able to obtain customClaim
// It should always return true
@Injectable()
export class OptionalFirebaseAuthUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticatedUser = true; // should always be true

    try {
      const req = context.switchToHttp().getRequest() || {};
      const { headers } = req;
      const { authorization } = headers || {};
      const token = String(authorization).replace('Bearer ', '').trim();
      await auth().verifyIdToken(token);
    } catch (error) {
      // ignore
    }

    return isAuthenticatedUser;
  }
}
