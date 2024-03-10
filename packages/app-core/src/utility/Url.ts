import { first, last, trim } from 'lodash';

export const getExtension = (url?: string | null) => {
  if (!url) {
    return null;
  }

  let extension = url.replace(/(\w+)?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/g, '');
  extension = first(extension.split(/[#?]/)) || '';
  extension = first(extension.match(new RegExp(/\.([^./?]+)/))) || '';

  return trim(extension).replace('.', '');
};

export const getExtensionFromFileType = (fileType: string) => {
  const strings = fileType.split('/');
  return last(strings);
};

export const getExtensionFromFileName = (fileName: string) => {
  const fileType = last(fileName.split('.'));
  return fileType;
};

export const removeProtocol = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, '');
};
