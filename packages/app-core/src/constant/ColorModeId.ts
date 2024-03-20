export enum ColorModeId {
  LightMode = 1,
  DarkMode,
}

export const colorModeMap = Object.freeze({
  [ColorModeId.LightMode]: 'light',
  [ColorModeId.DarkMode]: 'dark',
});
