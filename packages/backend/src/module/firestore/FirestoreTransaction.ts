/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBaseDataModel, Name } from '@xystemize/app-core';
import { firestore } from 'firebase-admin';

import { FirebaseService } from '../firebase';

export type AppBaseDocument = AppBaseDataModel & { id: string };

export class FirestoreTransaction {
  transactions: { type: string; documentRef: firestore.DocumentReference; data?: Record<string, any> }[] = [];

  private addTransaction = ({
    collectionName,
    docId,
    data,
    type,
  }: {
    collectionName: string;
    docId: string;
    data?: Record<string, any>;
    type: string;
  }) => {
    this.transactions.push({
      type: type,
      data: data,
      documentRef: FirebaseService.firestore.collection(collectionName).doc(docId),
    });
  };

  create = (data: AppBaseDocument) => {
    this.addTransaction({
      collectionName: data[Name.collectionName],
      docId: data.id,
      data: data.toCreateObject(),
      type: 'create',
    });
  };

  set = (data: AppBaseDocument) => {
    this.addTransaction({
      collectionName: data[Name.collectionName],
      docId: data.id,
      data: data.toCreateObject(),
      type: 'set',
    });
  };

  update = (data: AppBaseDocument) => {
    this.addTransaction({
      collectionName: data[Name.collectionName],
      docId: data.id,
      data: data.toUpdateObject(),
      type: 'update',
    });
  };

  delete = (data: AppBaseDocument) => {
    this.addTransaction({
      collectionName: data[Name.collectionName],
      docId: data.id,
      type: 'delete',
    });
  };
}
