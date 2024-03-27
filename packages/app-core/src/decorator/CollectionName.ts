import { Name } from '../constant';

export function CollectionName(collectionName: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Function) {
    Object.defineProperty(target.prototype, Name.collectionName, {
      get: () => collectionName,
    });
  };
}
