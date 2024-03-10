import { isAlphanumeric } from 'class-validator';

import { IdStringWithDefaultTransformer } from './IdTransformer';

describe('DateStringTransformerTests', () => {
  test('IdStringWithDefaultTransformer', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';
    value = IdStringWithDefaultTransformer({ value });
    expect(value).not.toBe('');
    expect(isAlphanumeric(value)).toBeTruthy();

    value = '';
    value = IdStringWithDefaultTransformer({ value });
    expect(value).not.toBe('');
    expect(isAlphanumeric(value)).toBeTruthy();

    value = null;
    value = IdStringWithDefaultTransformer({ value });
    expect(value).not.toBe('');
    expect(isAlphanumeric(value)).toBeTruthy();

    value = undefined;
    value = IdStringWithDefaultTransformer({ value });
    expect(value).not.toBe('');
    expect(isAlphanumeric(value)).toBeTruthy();
  });
});
