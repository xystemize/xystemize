import { AppStringInterface } from './AppStringInterface';
import { AppStringModel } from './AppStringModel';

export type NamedStrings<T> = { [P in keyof T]: AppStringModel };
export type NamedStringsInterface<T> = { [P in keyof T]: AppStringInterface };

export class StringSheet {
  /**
   * Creates a StringSheet reference from the given object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create = <T extends NamedStrings<T> | NamedStrings<any>>(
    strings: T | NamedStrings<T> | NamedStringsInterface<T>
  ): T | NamedStrings<T> => {
    const objKeys = Object.keys(strings);

    objKeys.forEach((key) => {
      const obj = strings[key];
      strings[key] = new AppStringModel(obj);
    });

    return strings as NamedStrings<T>;
  };
}
