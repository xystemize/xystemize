import { isEmail } from 'class-validator';
import { first, last } from 'lodash';

export const mask = (text: string) => {
  return text.replace(/\w/g, '*');
};

export const maskBirthday = (text: string) => {
  return text.replace(/\d/g, '*');
};

export const maskEmail = (text: string) => {
  if (!isEmail(text)) {
    return text;
  }

  const splitStr = text.split('@');
  const result = [splitStr[0].replace(/\w/g, '*'), '@', splitStr[1]].join('');

  return result;
};

export const extractFirstAndLastName = (characters?: string | null) => {
  const words = (characters || '')?.split(' ');

  const end = words.length <= 1 ? 1 : words.length - 1;
  const firsts = words.slice(0, end);

  const firstName = firsts.join(' ');
  const lastName = last(words);

  return {
    firstName: firstName,
    lastName: lastName === firstName ? '' : lastName ?? '',
  };
};

export const extractUsernameFromEmail = (emailAddress?: string | null) => {
  const words = (emailAddress || '')?.split('@');
  const username = first(words) ?? '';
  return { username };
};

export const limitCharacter = ({ max, text }: { text: string | null | undefined; max: number }) => {
  if (!text) {
    return '';
  }

  if (text.length <= max) {
    return text;
  }

  return text.substring(0, max) + '...';
};

export const removeTrailingSlash = (path: string): string => {
  return path.replace(/\/+$/, '');
};

export const isCharExistsInString = ({ string, char }: { string?: string | null; char: string }) => {
  return (string?.search(char) ?? -1) >= 0;
};
