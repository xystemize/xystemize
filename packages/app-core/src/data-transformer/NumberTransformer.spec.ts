import { NumberDateWithDefaultTransformer, NumberWithDefaultTransformer } from './NumberTransformer';
import { OptionalNumberTransformer, PositiveNumberWithDefaultTransformer } from '.';

describe('NumberTransformerTests', () => {
  test('NumberTransformer', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';

    expect(NumberWithDefaultTransformer({ default: 0 })({ value })).toBe(0);

    value = 0;
    expect(NumberWithDefaultTransformer({ default: 1 })({ value })).toBe(0);

    value = 1;
    expect(NumberWithDefaultTransformer({ default: 0 })({ value })).toBe(1);

    value = '1';
    expect(NumberWithDefaultTransformer({ default: 0 })({ value })).toBe(1);

    value = '0';
    expect(NumberWithDefaultTransformer({ default: 1 })({ value })).toBe(0);

    value = '2';
    expect(NumberWithDefaultTransformer({ default: 1 })({ value })).toBe(2);
  });

  test('OptionalNumberTransformer', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';

    expect(OptionalNumberTransformer({ value })).toBe(null);

    value = undefined;
    expect(OptionalNumberTransformer({ value })).toBe(null);

    value = '0';
    expect(OptionalNumberTransformer({ value })).toBe(0);

    value = '1';
    expect(OptionalNumberTransformer({ value })).toBe(1);

    value = 0;
    expect(OptionalNumberTransformer({ value })).toBe(0);

    value = 1;
    expect(OptionalNumberTransformer({ value })).toBe(1);
  });

  test('PositiveNumberWithDefaultTransformer', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';

    expect(PositiveNumberWithDefaultTransformer({ default: 0 })({ value })).toBe(0);

    value = 0;
    expect(PositiveNumberWithDefaultTransformer({ default: 1 })({ value })).toBe(0);

    value = 1;
    expect(PositiveNumberWithDefaultTransformer({ default: 0 })({ value })).toBe(1);

    value = '1';
    expect(PositiveNumberWithDefaultTransformer({ default: 0 })({ value })).toBe(1);

    value = '0';
    expect(PositiveNumberWithDefaultTransformer({ default: 1 })({ value })).toBe(0);

    value = '2';
    expect(PositiveNumberWithDefaultTransformer({ default: 1 })({ value })).toBe(2);

    value = '-2';
    expect(PositiveNumberWithDefaultTransformer({ default: 1 })({ value })).toBe(0);

    value = null;
    expect(PositiveNumberWithDefaultTransformer({ default: -1 })({ value })).toBe(0);
  });

  test('NumberDateWithDefaultTransformer', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';

    expect(NumberDateWithDefaultTransformer({ value })).toBeGreaterThanOrEqual(1);

    value = null;
    expect(NumberDateWithDefaultTransformer({ value })).toBeGreaterThanOrEqual(1);

    value = undefined;
    expect(NumberDateWithDefaultTransformer({ value })).toBeGreaterThanOrEqual(1);

    const now = Date.now();
    value = String(now);
    expect(NumberDateWithDefaultTransformer({ value })).toBe(now);
  });
});
