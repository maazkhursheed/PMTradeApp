import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import DisplayQuoteOptionsSwitchSheet from "~root/Components/DisplayQuoteOptionsSwitchSheet";
import { displayOptionsText } from "~root/Lib/StringHelper";
import { useAppender } from "~root/Provider/Appender";
import { Fonts, Images } from "~root/Themes";
import styles from "./QuoteDisplayOptionsStyle";

const QuoteDisplayOptions: React.SFC = () => {
  const [jobSheet, setJobSheet] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();

  React.useEffect(() => {
    append(
      <DisplayQuoteOptionsSwitchSheet
        sheetState={jobSheet}
        sheetCloseTapped={() => {
          setJobSheet(SheetState.CLOSED);
        }}
      />,
      "DisplayQuoteOptionsSwitchSheet",
      0,
    );
  }, [jobSheet]);

  return (
    <View style={styles.backgroundColor}>
      <View style={styles.summaryContainer}>
        <View style={styles.quoteItemHeaderContainer}>
          <Text style={Fonts.style.openSans16}>{"Display options"}</Text>
          <TouchableOpacity style={styles.editButtonContainer} onPress={() => setJobSheet(SheetState.EXPANDED)}>
            <Text style={styles.editButtonHeader}>{"Edit"}</Text>
            <Image source={Images.editItem} resizeMode={"contain"} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.itemLabel, styles.textLabel]}>{displayOptionsText}</Text>
      </View>
    </View>
  );
};

export default QuoteDisplayOptions;
