// jest.mock('react-native', () => {
//   const ReactNative = require.requireActual('react-native');
//   ReactNative.NativeModules.ExponentKernel = {
//     sdkVersions: '12.0.0,11.0.0',
//   };
//   return ReactNative;
// });

it(`Test jest`, async () => {
  expect({ test: 'yes' }).toEqual({ test: 'yes' });
});
