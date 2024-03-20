import { AppBaseDataModel } from '../base-model';

import { HasCapitalLetter } from './HasCapitalLetter';
import { HasNumber } from './HasNumber';
import { HasSymbol } from './HasSymbol';
import { IsNotBlank } from './IsNotBlank';
import { NumberLength } from './NumberLength';

describe('appValidation', () => {
  test('IsNotBlank', () => {
    class TextInput extends AppBaseDataModel {
      @IsNotBlank()
      value?: string | null;
    }

    const textInput = new TextInput();
    expect(textInput.isValid).toBe(false);

    textInput.value = undefined;
    expect(textInput.isValid).toBe(false);

    textInput.value = null;
    expect(textInput.isValid).toBe(false);

    textInput.value = '';
    expect(textInput.isValid).toBe(false);

    textInput.value = '    ';
    expect(textInput.isValid).toBe(false);

    textInput.value = '  value  ';
    expect(textInput.isValid).toBe(true);

    textInput.value = '1234567890';
    expect(textInput.isValid).toBe(true);

    textInput.value = 'user@example.com';
    expect(textInput.isValid).toBe(true);
  });

  test('NumberLength', () => {
    class TextInput extends AppBaseDataModel {
      @NumberLength(8)
      value = 0;
    }

    const textInput = new TextInput();
    expect(textInput.isValid).toBe(false);

    textInput.value = 1;
    expect(textInput.isValid).toBe(false);

    textInput.value = 12345;
    expect(textInput.isValid).toBe(false);

    textInput.value = 1234567890;
    expect(textInput.isValid).toBe(false);

    textInput.value = 12345678;
    expect(textInput.isValid).toBe(true);
  });

  test('HasCapitalLetter', () => {
    class TextInput extends AppBaseDataModel {
      @HasCapitalLetter()
      value = '';
    }

    const textInput = new TextInput();
    expect(textInput.isValid).toBe(false);

    textInput.value = 'abcde';
    expect(textInput.isValid).toBe(false);

    textInput.value = 'abcde12345';
    expect(textInput.isValid).toBe(false);

    textInput.value = 'abcDe';
    expect(textInput.isValid).toBe(true);

    textInput.value = 'AbCdE';
    expect(textInput.isValid).toBe(true);
  });

  test('HasNumber', () => {
    class TextInput extends AppBaseDataModel {
      @HasNumber()
      value = '';
    }

    const textInput = new TextInput();
    expect(textInput.isValid).toBe(false);

    textInput.value = 'abcde';
    expect(textInput.isValid).toBe(false);

    textInput.value = 'Abcde';
    expect(textInput.isValid).toBe(false);

    textInput.value = 'AbCdE#!@#$%^&&*';
    expect(textInput.isValid).toBe(false);

    textInput.value = 'abcde1fghij';
    expect(textInput.isValid).toBe(true);

    textInput.value = '1abcdefghij';
    expect(textInput.isValid).toBe(true);

    textInput.value = 'abcdefghi1';
    expect(textInput.isValid).toBe(true);

    textInput.value = 'abcde12345';
    expect(textInput.isValid).toBe(true);
  });

  test('HasSymbol', () => {
    class TextInput extends AppBaseDataModel {
      @HasSymbol()
      value = '';
    }

    const textInput = new TextInput();
    expect(textInput.isValid).toBe(false);

    textInput.value = 'abcde';
    expect(textInput.isValid).toBe(false);

    textInput.value = 'Abcde';
    expect(textInput.isValid).toBe(false);

    textInput.value = 'abcde1fghij';
    expect(textInput.isValid).toBe(false);

    textInput.value = 'abcde12345';
    expect(textInput.isValid).toBe(false);

    textInput.value = 'AbCdE!fgHiJ';
    expect(textInput.isValid).toBe(true);

    textInput.value = '@AbCdEfgHiJ';
    expect(textInput.isValid).toBe(true);

    textInput.value = 'AbCdEfgHiJ#';
    expect(textInput.isValid).toBe(true);

    textInput.value = '`';
    expect(textInput.isValid).toBe(true);

    textInput.value = '!';
    expect(textInput.isValid).toBe(true);

    textInput.value = '@';
    expect(textInput.isValid).toBe(true);

    textInput.value = '#';
    expect(textInput.isValid).toBe(true);

    textInput.value = '$';
    expect(textInput.isValid).toBe(true);

    textInput.value = '%';
    expect(textInput.isValid).toBe(true);

    textInput.value = '^';
    expect(textInput.isValid).toBe(true);

    textInput.value = '&';
    expect(textInput.isValid).toBe(true);

    textInput.value = '*';
    expect(textInput.isValid).toBe(true);

    textInput.value = '(';
    expect(textInput.isValid).toBe(true);

    textInput.value = ')';
    expect(textInput.isValid).toBe(true);

    textInput.value = '_';
    expect(textInput.isValid).toBe(true);

    textInput.value = '-';
    expect(textInput.isValid).toBe(true);

    textInput.value = '+';
    expect(textInput.isValid).toBe(true);

    textInput.value = '=';
    expect(textInput.isValid).toBe(true);

    textInput.value = '<';
    expect(textInput.isValid).toBe(true);

    textInput.value = '>';
    expect(textInput.isValid).toBe(true);

    textInput.value = '?';
    expect(textInput.isValid).toBe(true);

    textInput.value = '/';
    expect(textInput.isValid).toBe(true);

    textInput.value = '{';
    expect(textInput.isValid).toBe(true);

    textInput.value = '}';
    expect(textInput.isValid).toBe(true);

    textInput.value = '[';
    expect(textInput.isValid).toBe(true);

    textInput.value = ']';
    expect(textInput.isValid).toBe(true);

    textInput.value = '|';
    expect(textInput.isValid).toBe(true);

    textInput.value = '\\';
    expect(textInput.isValid).toBe(true);

    textInput.value = ',';
    expect(textInput.isValid).toBe(true);

    textInput.value = '.';
    expect(textInput.isValid).toBe(true);
  });
});
