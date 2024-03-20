import { LibraryGeneratorSchema } from '@nx/js/src/utils/schema';

export interface JsLibGeneratorSchema extends LibraryGeneratorSchema {
  name: string;
  directory?: string | null;
  excludeFiles?: string[];
}
