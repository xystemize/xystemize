import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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

      req.decodedIdToken = decodedIdToken;

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

@Injectable()
export class FirebaseUnverifiedEmailOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let isOwner = false;

    try {
      const req = context.switchToHttp().getRequest() || {};
      const { body, headers, params } = req;
      const { authorization } = headers || {};
      const token = String(authorization).replace('Bearer ', '').trim();
      const decodedIdToken = await auth().verifyIdToken(token);
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
