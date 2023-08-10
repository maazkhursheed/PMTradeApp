import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { NativeModules } from "react-native";
import "react-native-gesture-handler/jestSetup";

NativeModules.RNCNetInfo = {
  getCurrentConnectivity: jest.fn(),
  isConnectionMetered: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

jest.mock("react-native-keychain", () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
}));

jest.mock("@react-navigation/core");

jest.mock("react-native-redash", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };

  return {
    useValues: jest.fn().mockImplementation(() => inset),
  };
});

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest.fn().mockImplementation(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
// jest.mock("jwt-decode");
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("@react-native-firebase/crashlytics", () => ({}));

jest.mock("@react-native-community/geolocation", () => {
  return {
    getCurrentPosition: jest.fn().mockImplementationOnce(success =>
      Promise.resolve(
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        }),
      ),
    ),
    watchPosition: jest.fn(),
  };
});

jest.mock("@react-native-firebase/app", () => {
  return () => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  });
});

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-permissions", () => ({}));

jest.mock("react-native-fs", () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
  };
});

jest.mock("reanimated-bottom-sheet", () => {
  return {
    snapTo: jest.fn(),
  };
});
jest.mock("react-native-redash", () => {
  return {
    proc: jest.fn(),
  };
});
jest.mock("react-native-reanimated", () => {
  const View = require("react-native").View;
  return {
    createAnimatedComponent: jest.fn(),
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    sub: jest.fn(),
    multiply: jest.fn(),
    sqrt: jest.fn(),
    max: jest.fn(),
    diff: jest.fn(),
    onChange: jest.fn(),
    View: View,
    Extrapolate: { CLAMP: jest.fn() },
    Clock: jest.fn(),
    greaterThan: jest.fn(),
    lessThan: jest.fn(),
    startClock: jest.fn(),
    stopClock: jest.fn(),
    clockRunning: jest.fn(),
    not: jest.fn(),
    or: jest.fn(),
    and: jest.fn(),
    spring: jest.fn(),
    decay: jest.fn(),
    defined: jest.fn(),
    call: jest.fn(),
    block: jest.fn(),
    abs: jest.fn(),
    greaterOrEq: jest.fn(),
    lessOrEq: jest.fn(),
    debug: jest.fn(),
    Transition: {
      Together: "Together",
      Out: "Out",
      In: "In",
    },
    Transitioning: {
      View: View,
    },
  };
});

jest.mock("react-native/Libraries/Utilities/Platform", () => {
  const platform = jest.requireActual("react-native/Libraries/Utilities/Platform");
  return {
    ...platform,
    constants: {
      ...platform.constants,
      reactNativeVersion: {
        major: 0,
        minor: 65,
        patch: 1,
      },
    },
  };
});

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock("react-native-ux-cam", () => ({
  setAutomaticScreenNameTagging: jest.fn(),
  occludeSensitiveView: jest.fn(),
  tagScreenName: jest.fn(),
  applyOcclusion: jest.fn(),
}));
