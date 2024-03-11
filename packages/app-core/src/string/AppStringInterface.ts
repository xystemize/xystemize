import { Name } from '../constant';

export interface AppStringInterface {
  [Name.en]: string;
  [Name.es]?: string | null;
  [Name.zh]?: string | null;
}
