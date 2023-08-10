import * as React from "react";
import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomIcon from "~root/Components/CustomIcon";
import styles from "./QuoteAttachmentFooterStyle";

interface OwnProps {}

type Props = OwnProps;

const QuoteAttachmentFooter: React.FunctionComponent<Props> = ({}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        Platform.OS === "ios" ? { paddingBottom: insets.bottom - 10, marginBottom: insets.bottom } : { marginBottom: insets.bottom + 55 },
      ]}
    >
      <View style={styles.innerContainer}>
        <CustomIcon name={"pdf-icon"} style={styles.pdfIcon} />
        <Text style={styles.quoteAttached}>Quote is attached</Text>
      </View>
    </View>
  );
};

export default QuoteAttachmentFooter;
