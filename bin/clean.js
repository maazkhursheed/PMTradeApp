#!/usr/bin/env node

const childProcess = require("child_process");
const os = require("os");

/**
 * Do all things that need to be done after installing packages
 *
 * Yes, it slows down package installation a little, but it's nice to not
 * have to remember these extra steps.
 */
[
  // Clean the project
  {
    command:
      "rm -rf ios/Pods && rm -rf ios/Podfile.lock && rm -rf yarn.lock && rm -rf node_modules",
  },
  { command: "yarn install" },
  // on iOS, make sure our native modules are installed
  { command: "pod install", cwd: "ios", onlyPlatforms: ["darwin"] },
]
  .filter(
    ({ onlyPlatforms }) =>
      !onlyPlatforms || onlyPlatforms.includes(os.platform()),
  )
  .forEach(commandAndOptions => {
    const { command, onlyPlatform: _, ...options } = commandAndOptions;
    try {
      childProcess.execSync(command, {
        stdio: "inherit",
        ...options,
      });
    } catch (error) {
      process.exit(error.status);
    }
  });
