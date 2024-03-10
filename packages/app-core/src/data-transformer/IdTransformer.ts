import { generateUuid } from '@docuslice/app-util';

export const IdStringWithDefaultTransformer = ({ value }: { value: unknown }) => {
  if (value === null || value === undefined || !value || typeof value !== 'string') {
    return generateUuid();
  }

  return String(value);
};
