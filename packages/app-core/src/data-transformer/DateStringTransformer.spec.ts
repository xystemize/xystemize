import { isDateString } from 'class-validator';

import { DateStringWithDefaultTransformer } from './DateStringTransformer';

describe('DateStringTransformerTests', () => {
  test('DateStringTransformer', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';
    expect(isDateString(DateStringWithDefaultTransformer({ value }))).toBeTruthy();

    value = 'lkajrelkalfmalkje';
    expect(isDateString(DateStringWithDefaultTransformer({ value }))).toBeTruthy();

    value = new Date(1664547309989).toISOString();
    expect(isDateString(DateStringWithDefaultTransformer({ value }))).toBeTruthy();
    expect(DateStringWithDefaultTransformer({ value })).toBe(value);
  });
});
