/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),

      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),

      minifierConfig: {
        keep_classnames: true, // Preserve class names
        keep_fnames: true, // Preserve function names
        mangle: {
          keep_classnames: true, // Preserve class names
          keep_fnames: true, // Preserve function names
        },
      },
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();
