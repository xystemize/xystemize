export const toPropertyName = (str: string): string => {
  return str
    .replace(/([^a-zA-Z0-9])+(.)?/g, (_, __, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/[^a-zA-Z\d]/g, '')
    .replace(/^([A-Z])/, (m) => m.toLowerCase());
};

export const toCapitalCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

export const toClassName = (str: string): string => {
  return toCapitalCase(toPropertyName(str));
};
