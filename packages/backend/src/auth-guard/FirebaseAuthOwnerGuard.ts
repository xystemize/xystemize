import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Name } from '@xystemize/app-core';
import { auth } from 'firebase-admin';

import { OwnershipDataModel } from '../data-model/ownership';

@Injectable()
export class FirebaseAuthOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let isOwner = false;

    try {
      const req = context.switchToHttp().getRequest() || {};
      const { body, headers, params, method } = req;
      const { authorization } = headers || {};
      const token = String(authorization).replace('Bearer ', '').trim();

      const decodedIdToken = await auth().verifyIdToken(token);
      const isEmailVerified = decodedIdToken.email_verified || false;

      req[Name.customClaim] = decodedIdToken;

      if (isEmailVerified) {
        const isGetMethod = method === 'GET';
        const ownership = new OwnershipDataModel(body);
        ownership.decodedIdToken = decodedIdToken;
        ownership.reqParams = params;

        if (isGetMethod) {
          isOwner = ownership.isOwnerBasedFromReqIdParam;
        } else {
          isOwner = ownership.isDocumentOwner;
        }
      }
    } catch (error) {
      isOwner = false;
    }

    return isOwner;
  }
}
