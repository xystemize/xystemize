import { Injectable, OnModuleInit } from '@nestjs/common';

import { FirebaseService } from '../firebase/FirebaseService';

// const env = Environment.instance;

@Injectable()
export class StorageService implements OnModuleInit {
  storage = FirebaseService.storage;

  async onModuleInit() {
    //
  }
}
