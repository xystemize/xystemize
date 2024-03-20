import { MIN_LENGTH } from 'class-validator';

export const ValidationName = Object.freeze({
  MinLength: MIN_LENGTH,
  HasCapitalLetter: 'hasCapitalLetter',
  HasNumber: 'hasNumber',
  HasSymbol: 'hasSymbol',
  IsValidUsernameChars: 'isValidUsernameChars',
});
