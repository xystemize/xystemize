import { Name } from '../contant/Name';

export interface AppBaseDataInterface {
  [Name.id]?: string | null;
  [Name.createdTimestamp]?: number | string;
  [Name.updatedTimestamp]?: number | string;
  [Name.visibilityId]?: number | string;
}
