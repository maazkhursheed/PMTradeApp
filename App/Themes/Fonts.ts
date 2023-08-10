import colors from "~root/Themes/Colors";

const type = {
  base: "Avenir-Book",
  bold: "Avenir-Black",
  emphasis: "HelveticaNeue-Italic",
  OpenSansBold: "OpenSans-Bold",
  OpenSansRegular: "OpenSans-Regular",
  ProximaBold: "ProximaNova-Bold",
  SFProBold: "SFProDisplay-Bold",
  SFProRegular: "SFProDisplay-Regular",
  OpenSansBoldItalic: "OpenSans-BoldItalic",
  OpenSansExtraBold: "OpenSans-ExtraBold",
  OpenSansExtraBoldItalic: "OpenSans-ExtraBoldItalic",
  OpenSansItalic: "OpenSans-Italic",
  OpenSansLight: "OpenSans-Light",
  OpenSansLightItalic: "OpenSans-LightItalic",
  OpenSansSemiBold: "OpenSans-Semibold",
  OpenSansSemiBoldItalic: "OpenSans-SemiboldItalic",
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  extrasmall: 10,
  tiny: 8.5,
};

const style = {
  header1: {
    fontFamily: type.ProximaBold,
    color: colors.darkBlue,
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
  },
  header2: {
    fontFamily: type.ProximaBold,
    color: colors.wedgeBlue,
    fontSize: 16,
  },
  ctaLarge: {
    fontFamily: type.ProximaBold,
    color: colors.textInverse,
    fontSize: 16,
  },
  ctaSmall: {
    fontFamily: type.ProximaBold,
    color: colors.textInverse,
    textTransform: "uppercase",
    fontSize: 11,
  },

  bottomBarText: {
    fontFamily: type.OpenSansRegular,
    color: colors.textInverse,
    textTransform: "uppercase",
    fontSize: 11,
  },
  title: {
    fontFamily: type.OpenSansRegular,
    color: colors.darkerGrey,
    fontSize: 18,
  },
  subtitle: {
    fontFamily: type.OpenSansRegular,
    color: colors.darkerGrey,
    fontSize: 16,
  },
  subtitleSmall: {
    fontFamily: type.OpenSansRegular,
    color: colors.darkerGrey,
    fontSize: 14,
  },
  subtitleHighlight: {
    fontFamily: type.OpenSansBold,
    color: colors.darkerGrey,
    fontSize: 16,
  },
  subtitleLowlight: {
    fontFamily: type.OpenSansRegular,
    color: colors.wedgeBlue,
    fontSize: 16,
  },
  subtitleLowlightItalic: {
    fontFamily: type.OpenSansRegular,
    color: colors.wedgeBlue,
    fontSize: 16,
  },
  supplierMessage: {
    fontFamily: type.OpenSansItalic,
    color: colors.darkBlueHeader,
    fontSize: 14,
  },
  supplierMessageBlue: {
    fontFamily: type.OpenSansRegular,
    color: colors.darkBlueHeader,
    fontSize: 14,
  },
  optionItems: {
    fontFamily: type.OpenSansBold,
    color: colors.wedgeBlue,
    fontSize: 16,
  },

  body: {
    fontFamily: type.OpenSansRegular,
    color: colors.darkerGrey,
    fontSize: 12,
  },
  bodyHighlight: {
    fontFamily: type.OpenSansBold,
    color: colors.darkerGrey,
    fontSize: 12,
  },
  bodyHighlightNew: {
    fontFamily: type.OpenSansBold,
    color: colors.black,
    fontSize: 18,
  },
  labels: {
    fontFamily: type.OpenSansBold,
    color: colors.wedgeBlue,
    fontSize: 12,
  },
  labelsData: {
    fontFamily: type.OpenSansBold,
    color: colors.wedgeBlue,
    fontSize: 14,
  },
  contactData: {
    fontFamily: type.OpenSansBold,
    color: colors.lightBlue,
    fontSize: 14,
  },

  caption: {
    fontFamily: type.OpenSansRegular,
    color: colors.darkerGrey,
    fontSize: 10,
  },
  captionHighlight: {
    fontFamily: type.OpenSansBold,
    color: colors.darkGrey,
    fontSize: 10,
  },
  captionLowlight: {
    fontFamily: type.OpenSansBold,
    color: colors.wedgeBlue,
    fontSize: 10,
  },
  smallCaption: {
    fontFamily: type.OpenSansRegular,
    color: colors.darkerGrey,
    fontSize: 8,
  },
  smallCaptionHighlight: {
    fontFamily: type.OpenSansBold,
    color: colors.darkGrey,
    fontSize: 8,
  },
  smallCaptionLowlight: {
    fontFamily: type.OpenSansBold,
    color: colors.wedgeBlue,
    fontSize: 8,
  },
  btnSmall: {
    fontFamily: type.ProximaBold,
    color: colors.textInverse,
    alignSelf: "center",
    fontSize: 11,
  },
  btnLarge: {
    fontFamily: type.ProximaBold,
    textAlign: "center",
    color: colors.snow,
    fontSize: 16,
    padding: 14,
  },
  smallRedCaptionHighlight: {
    fontFamily: type.OpenSansBold,
    color: colors.red,
    fontSize: 10,
  },
  redLabel: {
    fontFamily: type.OpenSansBold,
    color: colors.red,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  updateTitle: {
    fontFamily: type.OpenSansBold,
    color: colors.brandPrimary,
    fontSize: 21,
    fontWeight: "bold",
  },
  updateMessage: {
    fontFamily: type.OpenSansRegular,
    color: colors.brandPrimary,
    fontSize: 16,
  },
  oopsHeader: {
    fontFamily: type.bold,
    fontWeight: "bold",
    color: colors.black,
    fontSize: 16,
  },
  oopsIfThen: {
    fontFamily: type.emphasis,
    fontWeight: "bold",
    color: colors.darkGrey,
    fontSize: 15,
  },
  oopsMessage: {
    fontFamily: type.emphasis,
    fontWeight: "bold",
    color: colors.wedgeBlue,
    fontSize: 13,
    fontStyle: "italic",
  },
  labelsSTC: {
    fontFamily: type.SFProRegular,
    fontSize: 14,
    color: "black",
  },
  textBodySTC: {
    fontFamily: type.SFProRegular,
    fontSize: 18,
  },
  openSans12: {
    fontFamily: type.OpenSansRegular,
    fontSize: 12,
    color: colors.black,
  },
  openSans34Bold: {
    fontFamily: type.OpenSansBold,
    fontSize: 34,
    color: colors.black,
  },
  openSans10Bold: {
    fontFamily: type.OpenSansBold,
    fontSize: 10,
    color: colors.black,
  },
  openSans11Regualr: {
    fontFamily: type.OpenSansRegular,
    fontSize: 11,
    color: colors.black,
  },
  openSans12Bold: {
    fontFamily: type.OpenSansBold,
    fontSize: 12,
    color: colors.black,
  },
  openSansExtraBold12: {
    fontFamily: type.OpenSansExtraBold,
    fontSize: 12,
    color: colors.black,
  },
  openSansExtraBold28: {
    fontFamily: type.OpenSansExtraBold,
    fontSize: 28,
    color: colors.black,
  },
  openSans14: {
    fontFamily: type.OpenSansRegular,
    fontSize: 14,
    color: colors.black,
  },
  openSans16: {
    fontFamily: type.OpenSansRegular,
    fontSize: 16,
    color: colors.black,
  },
  openSans18Regular: {
    fontFamily: type.OpenSansRegular,
    fontSize: 18,
    color: colors.black,
  },
  openSans16Regular: {
    fontFamily: type.OpenSansRegular,
    fontSize: 16,
    color: colors.black,
  },
  openSans20Regular: {
    fontFamily: type.OpenSansRegular,
    fontSize: 20,
    color: colors.black,
  },
  openSans18Bold: {
    fontFamily: type.OpenSansBold,
    fontSize: 18,
    color: colors.black,
  },
  openSans16Bold: {
    fontFamily: type.OpenSansBold,
    fontSize: 16,
    color: colors.black,
  },
  openSans14Bold: {
    fontFamily: type.OpenSansBold,
    fontSize: 14,
    color: colors.black,
  },
  openSans24Bold: {
    fontFamily: type.OpenSansBold,
    fontSize: 24,
    color: colors.black,
  },
  openSans28Bold: {
    fontFamily: type.OpenSansExtraBold,
    fontSize: 28,
    color: colors.black,
  },
  openSans28PlainBold: {
    fontFamily: type.OpenSansBold,
    fontSize: 28,
    color: colors.black,
  },
  disclosureFont: {
    fontFamily: type.OpenSansRegular,
    fontSize: 12,
    color: colors.darkGrey,
  },
  estimatedFont: {
    fontFamily: type.OpenSansBold,
    color: colors.darkBlueHeader,
    fontSize: 12,
  },
  labelLogo: {
    fontFamily: type.OpenSansRegular,
    color: colors.darkGrey,
    fontSize: 14,
  },
  openSansExtraBold20: {
    fontFamily: type.OpenSansExtraBold,
    fontSize: 20,
    color: colors.darkBlueHeader,
  },
};

export default {
  type,
  size,
  style,
};
