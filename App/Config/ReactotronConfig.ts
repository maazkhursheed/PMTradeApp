import Reactotron, { asyncStorage } from "reactotron-react-native";
import { reactotronRedux as reduxPlugin } from "reactotron-redux";
import ImmutableObject from "seamless-immutable";
import Config from "./DebugConfig";

if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!
  Reactotron.configure({
    name: "PlaceMakers Trade App",
    // host: Platform.select({ ios: "192.168.1.4", android: "localhost" }),
  })
    .useReactNative()
    .use(asyncStorage({}))
    .use(reduxPlugin({ onRestore: ImmutableObject }))
    .connect();

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  // swizzle the old one
  const yeOldeConsoleLog = console.log;

  console.error = (...args: any[]) => {
    Reactotron.display({
      name: "CONSOLE.ERROR",
      value: args,
      preview: args.length > 0 && typeof args[0] === "string" ? args[0] : null,
    });
    yeOldeConsoleLog("Error", ...args);
  };

  // make a new one
  // @ts-ignore
  console.log = (...args) => {
    // always call the old one, because React Native does magic swizzling too
    yeOldeConsoleLog(...args);

    // send this off to Reactotron.
    Reactotron.display({
      name: "CONSOLE.LOG",
      value: args,
      preview: args.length > 0 && typeof args[0] === "string" ? args[0] : null,
    });
  };

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  (console as any).tron = Reactotron;
}
