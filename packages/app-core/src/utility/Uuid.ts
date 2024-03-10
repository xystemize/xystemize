// Source: https://github.com/firebase/firebase-js-sdk/blob/7043422243ff0aa8f298a04cbc8f0450856c0908/packages/firestore/src/util/misc.ts#L25
// Similar: https://github.com/invertase/react-native-firebase/blob/62715f894e559e75cf4761581938f04c16b48e74/src/utils/index.js#L357
// TODO: In the future, we might want to make it a bit secure by using Crypto randomBytes but that is not available for the browser and React Native environment
export const generateUuid = () => {
  // Alphanumeric characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';

  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return autoId;
};
