/* eslint-disable no-undef */

import { PubSub } from '@google-cloud/pubsub';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { FirebaseService } from '../firebase/FirebaseService';

// const env = Environment.instance;

@Injectable()
export class PubSubService implements OnModuleInit {
  pubSub: PubSub = FirebaseService.pubsub;

  async onModuleInit() {
    this.pubSub = FirebaseService.pubsub;
  }
}
