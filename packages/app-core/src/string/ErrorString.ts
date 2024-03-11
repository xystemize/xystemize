import { StringSheet } from './StringSheet';

export const ErrorString = StringSheet.create({
  undefined: {
    en: 'Something went wrong. Please try again.',
    zh: '错误请重试.',
  },
  null: {
    en: 'Something went wrong. Please try again.',
    zh: '错误请重试.',
  },
  '': {
    en: 'Something went wrong. Please try again.',
    zh: '错误请重试.',
  },
  Error: {
    en: 'Error',
  },
  Generic: {
    en: 'Something went wrong. Please try again.',
    zh: '错误请重试.',
  },
  'auth/account-exists-with-different-credential': {
    en: 'You have previously loggedin with different provider. Try another provider.',
  },
  'auth/user-not-found': {
    en: 'User not found.',
    zh: '用户不可见',
  },
  'auth/wrong-password': {
    en: 'Wrong password',
    zh: '错误密码',
  },
  'auth/invalid-credential': {
    en: 'Invalid credential',
    zh: '凭据无效',
  },
  ErrorClickToTryAgain: {
    en: 'Error. Click to try again.',
  },
});
