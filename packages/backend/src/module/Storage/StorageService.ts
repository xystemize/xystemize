import { Injectable, OnModuleInit } from '@nestjs/common';

import { FirebaseService } from '../Firebase/FirebaseService';

// const env = Environment.instance;

@Injectable()
export class StorageService implements OnModuleInit {
  storage = FirebaseService.storage;

  // get bucket() {
  //   return this.storage.bucket(env.firebaseStorageBucket);
  // }

  async onModuleInit() {
    //
  }

  // async upload(path: string) {
  //   return this.storage.bucket(env.firebaseStorageBucket).upload(path);
  // }

  // async simulateClientPreUpload(media: MediaDataModel) {
  //   if (!env.isTestEnv) {
  //     return;
  //   }

  //   const bucket = media.bucket || env.firebaseStorageBucket;

  //   if (!media.rawFileUri || !media.originalPathWithFileNameForPreUpload) {
  //     return;
  //   }

  //   return this.storage.bucket(bucket).upload(media.rawFileUri, {
  //     destination: media.originalPathWithFileNameForPreUpload,
  //   });
  // }
}
