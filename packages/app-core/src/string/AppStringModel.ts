import { capitalize } from 'lodash';

import { AppBaseModel } from '../base-model';
import { Name } from '../constant';

import { AppStringInterface } from './AppStringInterface';

export class AppStringModel extends AppBaseModel implements AppStringInterface {
  static DefaultLanguageKey: string = Name.en;

  en: string;
  es?: string | null;
  zh?: string | null;

  constructor(params: AppStringInterface) {
    super();
    this.transformAndAssign(AppStringModel, params);
  }

  get value(): string {
    const key = AppStringModel.DefaultLanguageKey;
    return this[key] || this.en;
  }

  get capitalizedValue(): string {
    return capitalize(this.value);
  }

  get upperCaseValue(): string {
    return this.value.toUpperCase();
  }

  get lowerCaseValue(): string {
    return this.value.toLowerCase();
  }

  get suffixWithColon(): string {
    return `${this.value}:`;
  }

  get error(): Error {
    return new Error(this.value);
  }

  renderWithParams = (obj: { [key: string]: string | number }): string => {
    const pattern = /\${([^{]+)}/g;

    return this.value.replace(pattern, (_, key) => {
      const value = String(obj[key]);

      if (!value) {
        return '';
      }

      return value;
    });
  };
}
