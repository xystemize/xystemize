/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBaseDataModel } from '@xystemize/app-core';
import { firestore } from 'firebase-admin';

import { FirebaseService } from '../firebase';

export type AppBaseDocument = AppBaseDataModel & { id: string };

export class FirestoreTransaction {
  transactions: { type: string; documentRef: firestore.DocumentReference; data: Record<string, any> }[] = [];

  private addTransaction = (data: AppBaseDocument, type: string) => {
    this.transactions.push({
      type: type,
      documentRef: FirebaseService.firestore.collection(data.firestoreCollectionName).doc(data.id),
      data: data.toFirestoreDocument(),
    });
  };

  create = (data: AppBaseDocument) => {
    this.addTransaction(data, 'create');
  };

  set = (data: AppBaseDocument) => {
    this.addTransaction(data, 'set');
  };

  update = (data: AppBaseDocument) => {
    this.addTransaction(data, 'update');
  };

  delete = (data: AppBaseDocument) => {
    this.addTransaction(data, 'delete');
  };
}
