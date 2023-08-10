import { StyleSheet } from "react-native";
import { Fonts, Colors, ApplicationStyles } from '~root/Themes';
import colors from '~root/Themes/Colors';

export default StyleSheet.create({
  quotesContainer: {
    backgroundColor: Colors.offWhite, 
    flex: 1
  },
  separator2: {
    padding: 24,
    flex: 1,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  separator: {
    height: 20,
    ...ApplicationStyles.shadow,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  }
});
