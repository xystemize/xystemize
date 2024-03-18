import { Schema } from '@nx/node/src/generators/library/schema';

export interface JsLibGeneratorSchema extends Schema {
  name: string;
  directory?: string | null;
}
