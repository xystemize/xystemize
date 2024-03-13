/* eslint-disable no-undef */

import { PubSub } from '@google-cloud/pubsub';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { FirebaseService } from '../firebase/FirebaseService';

// const env = Environment.instance;

@Injectable()
export class PubSubService implements OnModuleInit {
  pubSub: PubSub = FirebaseService.pubsub;

  // get mediaCreateOnPublish() {
  //   return this.pubSub.topic(Name.mediaCreateOnPublish);
  // }

  async onModuleInit() {
    this.pubSub = FirebaseService.pubsub;
  }

  // async addTopic(topicName: string) {
  //   try {
  //     await FirebaseService.pubsub.createTopic(topicName);
  //   } catch (err) {
  //     // ignore
  //   }
  // }

  // async addTopics() {
  //   const topics = [Name.mediaCreateOnPublish];

  //   await Promise.all(
  //     topics.map((topic) => {
  //       return this.addTopic(topic);
  //     })
  //   );
  // }

  // async publishMediaCreate(media?: MediaDataModel | null) {
  //   if (env.isTestEnv || !media) {
  //     return;
  //   }

  //   if (media.isGif || !media.fileExtension) {
  //     return;
  //   }

  //   return this.mediaCreateOnPublish.publishMessage(media.toPubSubData());
  // }
}
