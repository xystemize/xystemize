import { isAlphanumeric } from 'class-validator';
import { range } from 'lodash';

import { mapArrayWithConcurrency } from './Array';
import { delayByMilliseconds, delayBySeconds } from './Delay';
import { camelizeKeys } from './Object';
import { extractFirstAndLastName, extractUsernameFromEmail, mask, maskBirthday, maskEmail } from './String';
import { toCapitalCase, toClassName, toPropertyName } from './StringFormat';
import { getExtension, getExtensionFromFileType, removeProtocol } from './Url';
import { generateUuid } from './Uuid';

describe('appUtils', () => {
  test('delay', async () => {
    await delayByMilliseconds(1000);
    await delayBySeconds(1);
    await delayBySeconds(0.5);
  });

  test('toPropertyName', async () => {
    expect(toPropertyName('PropertyName')).toBe('propertyName');
    expect(toPropertyName('propertyName')).toBe('propertyName');
    expect(toPropertyName('property-name')).toBe('propertyName');
    expect(toPropertyName('Property-Name')).toBe('propertyName');
  });

  test('toClassName', () => {
    expect(toClassName('PropertyName')).toBe('PropertyName');
    expect(toClassName('propertyName')).toBe('PropertyName');
    expect(toClassName('property-name')).toBe('PropertyName');
    expect(toClassName('Property-Name')).toBe('PropertyName');
  });

  test('toCapitalCase', () => {
    let name = 'john';
    expect(toCapitalCase(name)).toBe('John');

    name = 'john trevor';
    expect(toCapitalCase(name)).toBe('John trevor');
  });

  test('Generate UUID', async () => {
    expect(isAlphanumeric(generateUuid())).toBeTruthy();
  });

  test('Get Url Extension', async () => {
    expect(getExtension('43688')).toEqual('');
    expect(getExtension('https://example.com/file.jpg')).toBe('jpg');
    expect(getExtension('https://example.com/folder/file.jpg?param.eter#hash=12.345')).toBe('jpg');
    expect(getExtension('https://example.com/')).toBe('');
    expect(getExtension('https://regmedia.co.uk/2017/06/26/cloudflarelogo.jpg?width=100')).toBe('jpg');
    expect(getExtension('https://regmedia.co.uk/2017/06/26/cloudflarelogo.jpg-xml')).toBe('jpg-xml');
    expect(getExtension('file://folder/image.jpg')).toBe('jpg');
    expect(getExtension('file:///storage/emulated/0/DCIM/Camera/filename.jpg')).toBe('jpg');
    expect(getExtension('01FB9F55-72C1-4B44-8591-CA4B4975A1D2.jpg')).toBe('jpg');
  });

  test('Get extension from filetype', async () => {
    expect(getExtensionFromFileType('image/jpg')).toBe('jpg');
    expect(getExtensionFromFileType('video/mp4')).toBe('mp4');
  });

  test('executePromisesWithConcurrency', async () => {
    const count = 100;
    let numbers = range(count);

    expect(numbers.length).toBe(count);

    const handler = async (num) => {
      return num;
    };

    numbers = await mapArrayWithConcurrency(numbers, 1000, handler);
    expect(numbers.length).toBe(count);
  });

  test('removeProtocol', async () => {
    expect(removeProtocol('google.com')).toBe('google.com');
    expect(removeProtocol('google.com/hello')).toBe('google.com/hello');
    expect(removeProtocol('google.com/hello/1234')).toBe('google.com/hello/1234');

    expect(removeProtocol('http://google.com')).toBe('google.com');
    expect(removeProtocol('http://google.com/hello')).toBe('google.com/hello');
    expect(removeProtocol('http://google.com/hello/1234')).toBe('google.com/hello/1234');

    expect(removeProtocol('https://google.com')).toBe('google.com');
    expect(removeProtocol('https://google.com/hello')).toBe('google.com/hello');
    expect(removeProtocol('https://google.com/hello/1234')).toBe('google.com/hello/1234');
  });

  test('mask', () => {
    const text = mask('hello world');

    // success: should mask the text
    expect(text).toBe('***** *****');
  });

  test('maskBirthday', () => {
    const text = maskBirthday('01/22/2000');

    // success: should mask the text
    expect(text).toBe('**/**/****');
  });

  test('maskEmail', () => {
    let text = maskEmail('hello world');

    // error: invalid text should retain as is
    expect(text).toBe('hello world');

    // success: should mask the first part of the email
    text = maskEmail('hello@example.com');
    expect(text).toBe('*****@example.com');
  });

  test('extractFirstAndLastName', () => {
    let name = extractFirstAndLastName('');
    expect(name.firstName).toBe('');
    expect(name.lastName).toBe('');

    name = extractFirstAndLastName('FirstName LastName');
    expect(name.firstName).toBe('FirstName');
    expect(name.lastName).toBe('LastName');

    name = extractFirstAndLastName('FirstName');
    expect(name.firstName).toBe('FirstName');
    expect(name.lastName).toBe('');

    name = extractFirstAndLastName('FirstName');
    expect(name.firstName).toBe('FirstName');
    expect(name.lastName).toBe('');

    name = extractFirstAndLastName('First Second Last');
    expect(name.firstName).toBe('First Second');
    expect(name.lastName).toBe('Last');
  });

  test('extractUsernameFromEmail', () => {
    let res = extractUsernameFromEmail('jeremiah');
    expect(res.username).toBe('jeremiah');

    res = extractUsernameFromEmail('jeremiah@example.com');
    expect(res.username).toBe('jeremiah');
  });

  test('camelizeKeys', () => {
    const obj = { 'first-name': 'FirstName', LastName: 'LastName', address_n1: 'Address 1', Address_N2: 'Address 2' };
    expect(camelizeKeys(obj)).toStrictEqual({
      firstName: 'FirstName',
      lastName: 'LastName',
      addressN1: 'Address 1',
      addressN2: 'Address 2',
    });
  });
});
