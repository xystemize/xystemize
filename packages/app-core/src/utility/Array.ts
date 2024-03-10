import { clone } from 'lodash';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const mapArrayWithConcurrency = async <T>(
  items: T[],
  concurrency: number,
  handler: (item: T, index?: number) => Promise<T | void>
) => {
  const clonedItems = clone(items); // we need to clone to avoid unwanted behaviors when we use the same items for other functions
  const values: Array<T | void> = [];

  while (clonedItems.length) {
    const list = await Promise.all(clonedItems.splice(0, concurrency).map(handler));
    values.push(...list);
  }

  return values;
};
