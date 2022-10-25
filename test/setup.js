import "react-native-gesture-handler/jestSetup";

import MockStorage from "./mockStorage";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

jest.mock("@react-native-async-storage/async-storage", () => MockStorage);
