import { AppStringModel } from './AppStringModel';

describe('appDataAppString', () => {
  const params = { firstName: 'Jeremiah', lastName: 'Lachica' };
  const ok = new AppStringModel({ en: 'Ok', es: 'Ok' });
  const hiFirstName = new AppStringModel({
    en: 'Hi ${firstName}',
    es: 'Hola ${firstName}',
  });
  const hiFirstLastName = new AppStringModel({
    en: 'Hi ${firstName} ${lastName}',
    es: 'Hola ${firstName} ${lastName}',
  });
  const hiFirstFirstLastName = new AppStringModel({
    en: 'Hi ${firstName} ${firstName} ${lastName}',
    es: 'Hola ${firstName} ${firstName} ${lastName}',
  });

  test('english localization', () => {
    AppStringModel.DefaultLanguageKey = 'en';

    expect(ok.value).toBe('Ok');
    expect(hiFirstName.renderWithParams(params)).not.toBe('Hi {firstName}');
    expect(hiFirstName.renderWithParams(params)).toBe('Hi Jeremiah');
    expect(hiFirstLastName.renderWithParams(params)).toBe('Hi Jeremiah Lachica');
    expect(hiFirstFirstLastName.renderWithParams(params)).toBe('Hi Jeremiah Jeremiah Lachica');
  });

  test('spanish localization', () => {
    AppStringModel.DefaultLanguageKey = 'es';

    expect(ok.value).toBe('Ok');
    expect(hiFirstName.renderWithParams(params)).not.toBe('Hola {firstName}');
    expect(hiFirstName.renderWithParams(params)).toBe('Hola Jeremiah');
    expect(hiFirstLastName.renderWithParams(params)).toBe('Hola Jeremiah Lachica');
    expect(hiFirstFirstLastName.renderWithParams(params)).toBe('Hola Jeremiah Jeremiah Lachica');
  });
});
