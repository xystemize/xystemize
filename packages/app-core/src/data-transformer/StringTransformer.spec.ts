import {
  StringTransformer,
  StringWithTrimAndLowerCaseTransformer,
  StringWithTrimAndUpperCaseTransformer,
  StringWithTrimTransformer,
} from './StringTransformer';

describe('StringTransformerTests', () => {
  test('StringTransformer', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';
    expect(StringTransformer({ value })).toBe('');

    value = null;
    expect(StringTransformer({ value })).toBe('');

    expect(StringTransformer({ value: undefined })).toBe('');

    value = '     ';
    expect(StringTransformer({ value })).toBe(value);

    value = '   🙃   ';
    expect(StringTransformer({ value })).toBe(value);

    value = '  STRING   ';
    expect(StringWithTrimTransformer({ value })).toBe('STRING');

    value = 12345;
    expect(StringWithTrimTransformer({ value })).toBe('12345');

    value = '12345   ';
    expect(StringWithTrimTransformer({ value })).toBe('12345');

    value = true;
    expect(StringWithTrimTransformer({ value })).toBe('true');

    value = 'STRINGS';
    expect(StringWithTrimAndLowerCaseTransformer({ value })).toBe('strings');

    value = '   🙃   ';
    expect(StringWithTrimAndLowerCaseTransformer({ value })).toBe('🙃');

    value = 'strings';
    expect(StringWithTrimAndUpperCaseTransformer({ value })).toBe('STRINGS');
  });
});
