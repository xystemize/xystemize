// import { Name } from '@docuslice/app-constant';
// import { CustomClaimDataInterface } from '@docuslice/app-data';
// import { CustomClaimBackendModel } from '@docuslice/backend/app-data';
// import { FirebaseService } from '@docuslice/backend/module';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { replace, trim } from 'lodash';

import { FirebaseService } from '../module';

import { CustomClaimDataInterface, CustomClaimDataModel, Name } from '<%= orgName %>/app-core';

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
      const token = trim(replace(authorization, 'Bearer ', ''));
      const authService = FirebaseService.auth;
      const decodedIdToken = await authService.verifyIdToken(token);

      req[Name.customClaim] = new CustomClaimDataModel(decodedIdToken as CustomClaimDataInterface);
    } catch (error) {
      // ignore
    }

    return isAuthenticatedUser;
  }
}
