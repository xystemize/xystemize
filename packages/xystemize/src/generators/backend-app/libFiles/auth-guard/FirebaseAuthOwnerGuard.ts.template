// import { OwnershipDataModel } from '@docuslice/app-data';
// import { FirebaseService } from '@docuslice/backend/module';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { OwnershipDataModel } from '@xystemize/backend';
import { replace, trim } from 'lodash';

import { FirebaseService } from '../module';

// This allows unverified email account
@Injectable()
export class FirebaseUnverifiedEmailOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let isOwner = false;

    try {
      const req = context.switchToHttp().getRequest() || {};
      const { body, headers, params } = req;
      const { authorization } = headers || {};
      const token = trim(replace(authorization, 'Bearer ', ''));
      const authService = FirebaseService.auth;

      const decodedIdToken = await authService.verifyIdToken(token);
      const ownership = new OwnershipDataModel(body);
      ownership.decodedIdToken = decodedIdToken;
      ownership.reqParams = params;

      req.decodedIdToken = decodedIdToken;

      isOwner = ownership.isDocumentOwner && ownership.isReqParamsValid;
    } catch (error) {
      isOwner = false;
    }

    return isOwner;
  }
}
