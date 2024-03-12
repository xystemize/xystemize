/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { firestore } from 'firebase-admin'; // TODO: Update to v10 for optimization

import { FirebaseService } from '../Firebase/FirebaseService';

@Injectable()
export class FirestoreService implements OnModuleInit {
  firestore: firestore.Firestore = FirebaseService.firestore;

  // get batch(): firestore.WriteBatch {
  //   return this.firestore.batch();
  // }

  // get accounts(): firestore.CollectionReference {
  //   return this.firestore.collection(Name.accounts);
  // }

  // get mediaItems(): firestore.CollectionReference {
  //   return this.firestore.collection(Name.mediaItems);
  // }

  async onModuleInit() {
    this.firestore = FirebaseService.firestore;
  }

  // getOneById = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   id,
  //   collectionName,
  //   classModel,
  // }: {
  //   id: string;
  //   visibilityId?: VisibilityId;
  //   collectionName: string;
  //   classModel: T;
  // }): Promise<{
  //   data: InstanceType<T> | null;
  //   document: firestore.DocumentSnapshot;
  //   docRef: firestore.DocumentReference;
  // }> => {
  //   const docRef = this.firestore.collection(collectionName).doc(id);
  //   const document = await docRef.get();

  //   if (!document.exists) {
  //     return { docRef, document, data: null };
  //   }

  //   const data = new classModel(document.data());

  //   return { docRef, document, data };
  // };

  // getOneByProperty = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   value,
  //   property,
  //   collectionName,
  //   classModel,
  //   visibilityId,
  // }: {
  //   value: string | number | boolean;
  //   property: string;
  //   visibilityId?: VisibilityId;
  //   collectionName: string;
  //   classModel: T;
  // }): Promise<{
  //   data: InstanceType<T> | null;
  //   document?: firestore.DocumentSnapshot | null;
  //   docRef?: firestore.DocumentReference | null;
  // }> => {
  //   const query = visibilityId
  //     ? this.firestore
  //         .collection(collectionName)
  //         .where(property, '==', value)
  //         .where(Name.visibilityId, '==', visibilityId)
  //     : this.firestore.collection(collectionName).where(property, '==', value);

  //   query.limit(1);

  //   const documents = await query.get();
  //   const document = first(documents.docs);

  //   if (!document?.exists) {
  //     return { docRef: document?.ref, document, data: null };
  //   }

  //   const data = new classModel(document.data());

  //   return { docRef: document?.ref, document, data };
  // };

  // getOneByIdandProperty = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   id,
  //   value,
  //   property,
  //   collectionName,
  //   classModel,
  //   visibilityId,
  // }: {
  //   id: string;
  //   value: string | number | boolean;
  //   property: string;
  //   visibilityId?: VisibilityId;
  //   collectionName: string;
  //   classModel: T;
  // }): Promise<{
  //   data: InstanceType<T> | null;
  //   document?: firestore.DocumentSnapshot | null;
  //   docRef?: firestore.DocumentReference | null;
  // }> => {
  //   const query = visibilityId
  //     ? this.firestore
  //         .collection(collectionName)
  //         .where(Name.id, '==', id)
  //         .where(property, '==', value)
  //         .where(Name.visibilityId, '==', visibilityId)
  //     : this.firestore.collection(collectionName).where(Name.id, '==', id).where(property, '==', value);

  //   query.limit(1);

  //   const documents = await query.get();
  //   const document = first(documents.docs);

  //   if (!document?.exists) {
  //     return { docRef: document?.ref, document, data: null };
  //   }

  //   const data = new classModel(document.data());

  //   return { docRef: document?.ref, document, data };
  // };

  // getManyByProperty = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   value,
  //   property,
  //   collectionName,
  //   classModel,
  //   visibilityId,
  // }: {
  //   value: string | number | boolean;
  //   property: string;
  //   visibilityId?: VisibilityId;
  //   collectionName: string;
  //   classModel: T;
  // }): Promise<Array<InstanceType<T>>> => {
  //   const query = visibilityId
  //     ? this.firestore
  //         .collection(collectionName)
  //         .where(property, '==', value)
  //         .where(Name.visibilityId, '==', visibilityId)
  //     : this.firestore.collection(collectionName).where(property, '==', value);

  //   const snapshots = await query.get();

  //   if (!snapshots.docs.length) {
  //     return [];
  //   }

  //   return snapshots.docs.map((obj) => new classModel(obj.data()));
  // };

  // getManyByAccountId = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   accountId,
  //   collectionName,
  //   classModel,
  // }: {
  //   accountId: string;
  //   visibilityId?: VisibilityId;
  //   collectionName: string;
  //   classModel: T;
  // }): Promise<Array<InstanceType<T>>> => {
  //   const snapshots = await this.firestore
  //     .collection(collectionName)
  //     .where(Name.accountId, '==', accountId)
  //     .where(Name.visibilityId, '!=', VisibilityId.Deleted)
  //     .get();

  //   if (!snapshots.docs.length) {
  //     return [];
  //   }

  //   return snapshots.docs.map((obj) => new classModel(obj.data()));
  // };

  // getManyByIds = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   itemIds,
  //   collectionName,
  //   classModel,
  // }: {
  //   itemIds: string[];
  //   collectionName: string;
  //   classModel: T;
  // }): Promise<Array<InstanceType<T>>> => {
  //   itemIds = uniq(without(itemIds, undefined, null, '') as []);

  //   if (isEmpty(itemIds)) {
  //     return [];
  //   }

  //   const docRefs = itemIds.map((id) => this.firestore.collection(collectionName).doc(id));
  //   const documents = await this.firestore.getAll(...docRefs);

  //   if (!documents.length) {
  //     return [];
  //   }

  //   const items = documents.map((document) => {
  //     return new classModel(document.data());
  //   });

  //   return filter(items, { isValid: true }) as Array<InstanceType<T>>;
  // };

  // getAll = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   collectionName,
  //   classModel,
  //   visibilityId,
  // }: {
  //   collectionName: string;
  //   classModel: T;
  //   visibilityId?: VisibilityId;
  // }): Promise<Array<InstanceType<T>>> => {
  //   const query = visibilityId
  //     ? this.firestore.collection(collectionName).where(Name.visibilityId, '==', visibilityId)
  //     : this.firestore.collection(collectionName);

  //   const snapshots = await query.get();

  //   if (!snapshots.docs.length) {
  //     return [];
  //   }

  //   return snapshots.docs.map((obj) => new classModel(obj.data()));
  // };

  // getPaginatedData = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   timestampName,
  //   timestampValue,
  //   limit,
  //   visibilityId,
  //   collectionName,
  //   classModel,
  // }: {
  //   timestampName: string;
  //   timestampValue?: number;
  //   limit?: OptionalNumber;
  //   visibilityId?: VisibilityId;
  //   collectionName: string;
  //   classModel: T;
  // }): Promise<Array<InstanceType<T>>> => {
  //   visibilityId = visibilityId ?? VisibilityId.Public;
  //   limit = limit ?? RequestConfig.DefaultLimitPerPage;
  //   timestampValue = timestampValue ?? Date.now();

  //   const snapshots = await this.firestore
  //     .collection(collectionName)
  //     .where(timestampName, '<', timestampValue)
  //     .where(Name.visibilityId, '==', visibilityId)
  //     .orderBy(timestampName, 'desc')
  //     .limit(limit)
  //     .get();

  //   if (!snapshots.docs.length) {
  //     return [];
  //   }

  //   return snapshots.docs.map((obj) => new classModel(obj.data()));
  // };

  // getPaginatedDataByProperty = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   value,
  //   property,
  //   timestampName,
  //   timestampValue,
  //   limit,
  //   visibilityId,
  //   collectionName,
  //   classModel,
  // }: {
  //   value: string | number | boolean;
  //   property: string;
  //   timestampName: string;
  //   timestampValue?: number;
  //   limit?: OptionalNumber;
  //   visibilityId?: VisibilityId;
  //   collectionName: string;
  //   classModel: T;
  // }): Promise<Array<InstanceType<T>>> => {
  //   visibilityId = visibilityId ?? VisibilityId.Public;
  //   limit = limit ?? RequestConfig.DefaultLimitPerPage;
  //   timestampValue = timestampValue ?? Date.now();

  //   const snapshots = await this.firestore
  //     .collection(collectionName)
  //     .where(timestampName, '<', timestampValue)
  //     .where(Name.visibilityId, '==', visibilityId)
  //     .where(property, '==', value)
  //     .orderBy(timestampName, 'desc')
  //     .limit(limit)
  //     .get();

  //   if (!snapshots.docs.length) {
  //     return [];
  //   }

  //   return snapshots.docs.map((obj) => new classModel(obj.data()));
  // };

  // softDeleteOneById = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   id,
  //   collectionName,
  // }: {
  //   id: string;
  //   collectionName: string;
  // }) => {
  //   const docRef = this.firestore.collection(collectionName).doc(id);
  //   const document = await docRef.get();

  //   if (!document.exists) {
  //     throw new BadRequestException();
  //   }

  //   await docRef.update(Name.visibilityId, VisibilityId.Deleted);
  // };

  // softDeleteManyByProperty = async <T extends { new (...args: any[]): InstanceType<T> }>({
  //   value,
  //   property,
  //   collectionName,
  // }: {
  //   value: string | number | boolean;
  //   property: string;
  //   collectionName: string;
  // }) => {
  //   const query = this.firestore.collection(collectionName).where(property, '==', value);
  //   const snapshots = await query.get();

  //   if (!snapshots.docs.length) {
  //     throw new BadRequestException();
  //   }

  //   snapshots.forEach(async (snapshot) => {
  //     await snapshot.ref.update(Name.visibilityId, VisibilityId.Deleted);
  //   });
  // };

  // // Just recently added. We will use this moving forward
  // runTransaction = <T>(updateFunction: (transaction: firestore.Transaction) => Promise<T>) => {
  //   return this.firestore.runTransaction(updateFunction);
  // };

  // runDocumentAddOrUpdateTransaction = async ({ item }: { item: FirestoreDocumentType }) => {
  //   if (!item?.id) {
  //     throw new BadRequestException();
  //   }

  //   const docRef = this.firestore.collection(item.firestoreCollectionName).doc(item.id);

  //   await this.runTransaction(async (transaction) => {
  //     transaction.set(docRef, item.toFirestoreDocument());
  //   });

  //   return { docRef, data: item };
  // };

  // runMultipleDocumentAddOrUpdateTransactions = async ({ items }: { items: Array<FirestoreDocumentType> }) => {
  //   const response: { itemsCount: number } = { itemsCount: 0 };

  //   if (!items.length) {
  //     return response;
  //   }

  //   const chunkedItems = chunk(items, RequestConfig.FirestoreTransactionLimit);

  //   const handler = async (chunkedItems: Array<FirestoreDocumentType>) => {
  //     const transaction = await this.runTransaction(async (transaction) => {
  //       chunkedItems.forEach((item) => {
  //         const docRef = this.firestore.collection(item.firestoreCollectionName).doc(item.id);
  //         transaction.set(docRef, item.toFirestoreDocument());
  //       });
  //     });

  //     response.itemsCount += chunkedItems.length;

  //     return transaction;
  //   };

  //   await mapArrayWithConcurrency(chunkedItems, RequestConfig.DefaultWriteMaxConcurrency, handler);

  //   return response;
  // };

  // runDocumentAddTransaction = async ({ item }: { item: FirestoreDocumentType }) => {
  //   if (!item?.id) {
  //     throw new BadRequestException();
  //   }

  //   const docRef = this.firestore.collection(item.firestoreCollectionName).doc(item.id);

  //   await this.runTransaction(async (transaction) => {
  //     transaction.create(docRef, item.toFirestoreDocument());
  //   });

  //   return { docRef, data: item };
  // };
}
