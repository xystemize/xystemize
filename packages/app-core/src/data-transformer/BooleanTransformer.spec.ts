import { BooleanTransformer } from './BooleanTransformer';

describe('BooleanTransformerTests', () => {
  test('BooleanTransformer', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';
    expect(BooleanTransformer({ value })).toBe(false);

    value = undefined;
    expect(BooleanTransformer({ value })).toBe(false);

    value = null;
    expect(BooleanTransformer({ value })).toBe(false);

    value = 'true';
    expect(BooleanTransformer({ value })).toBe(true);

    value = true;
    expect(BooleanTransformer({ value })).toBe(true);

    value = 'false';
    expect(BooleanTransformer({ value })).toBe(false);

    value = false;
    expect(BooleanTransformer({ value })).toBe(false);
  });
});
