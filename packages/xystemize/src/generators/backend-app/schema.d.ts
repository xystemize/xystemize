import { ApplicationGeneratorOptions as Schema } from '@nx/nest/src/generators/application/schema';

export interface BackendAppGeneratorSchema extends Schema {
  name: string;
}
