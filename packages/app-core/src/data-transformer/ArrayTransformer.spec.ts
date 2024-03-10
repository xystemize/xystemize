import {
  ArrayStringWithTrimAndLimitTransformer,
  ArrayStringWithTrimTransformer,
  ArrayTransformer,
} from './ArrayTransformer';
import { UniqueArrayStringWithTrimTransformer } from '.';

describe('DateStringTransformerTests', () => {
  test('DateStringTransformer', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';
    expect(ArrayTransformer({ value })).toStrictEqual([]);

    value = 'lkajrelkalfmalkje';
    expect(ArrayTransformer({ value })).toStrictEqual([]);

    value = null;
    expect(ArrayTransformer({ value })).toStrictEqual([]);

    value = undefined;
    expect(ArrayTransformer({ value })).toStrictEqual([]);

    value = {};
    expect(ArrayTransformer({ value })).toStrictEqual([]);

    value = [];
    expect(ArrayTransformer({ value })).toStrictEqual([]);

    value = [null, undefined, ''];
    expect(ArrayTransformer({ value })).toStrictEqual([]);

    value = [0, 1, 2, 3, 4, 5];
    expect(ArrayTransformer({ value })).toStrictEqual([0, 1, 2, 3, 4, 5]);

    value = ['0', '1', '  2  ', 3, 4, 5, null, undefined, ''];
    expect(ArrayStringWithTrimTransformer({ value })).toStrictEqual(['0', '1', '2', '3', '4', '5']);

    value = [1, 2, 3, 4, 5, 6, 7];
    expect(ArrayStringWithTrimAndLimitTransformer({ limit: 5 })({ value })).toStrictEqual(['1', '2', '3', '4', '5']);

    value = [1, 2, 3, 4, 5, 6, 7, 7, 7];
    expect(UniqueArrayStringWithTrimTransformer({ value })).toStrictEqual(['1', '2', '3', '4', '5', '6', '7']);
  });
});
