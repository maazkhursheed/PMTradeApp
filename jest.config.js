module.exports = {
  preset: "react-native",
  testMatch: ["**/Tests/**/*.ts?(x)", "**/App/**/*Test.ts?(x)"],
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/", "<rootDir>/lib/", "Tests/Setup"],
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
    "\\.(ts|tsx)$": "babel-jest",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  // ...
  transformIgnorePatterns: ["node_modules/(?!react-native|react-navigation|react-native-screens)/"],

  setupFiles: ["./Tests/Setup.tsx", "./node_modules/react-native-gesture-handler/jestSetup.js"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  cacheDirectory: ".jest/cache",
  modulePaths: ["<rootDir>"],
};
