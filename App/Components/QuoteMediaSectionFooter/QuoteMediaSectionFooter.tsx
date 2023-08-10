import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { Fonts } from "~root/Themes";
import CustomIcon from "../CustomIcon";
import styles from "./QuoteMediaSectionFooterStyle";

export interface OwnProps {}

type Props = OwnProps;

const QuoteMediaSectionFooter: React.FC<OwnProps> = ({}: Props) => {
  const navigation = useNavigation();
  const { quoteMedia } = useSelector((state: RootState) => ({
    quoteMedia: state.quotes.quoteMedia?.quoteMedia,
  }));
  const [countOfMediaIncluded, setCountOfMediaIncluded] = React.useState(0);
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  React.useEffect(() => {
    let selectedMedia = quoteMedia && R.filter(R.propEq("mediaSelected", "true"))(quoteMedia);
    setCountOfMediaIncluded(selectedMedia?.length);
  }, [quoteMedia]);
  return (
    <>
      {isQuoteWonOrLost ? (
        <View style={styles.quoteWonLostContainer}>
          <TouchableOpacity style={styles.backToJobDtailsButton} onPress={navigation.goBack}>
            <Text style={styles.buttonText}>Back to Job Details</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: isQuoteWonOrLost ? "flex-end" : undefined }}>
            <Text style={Fonts.style.openSans12}>Included in quote</Text>
            <Text style={Fonts.style.openSans16Bold}>{countOfMediaIncluded}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.text}>Included in quote</Text>
            <Text style={styles.value}>{countOfMediaIncluded}</Text>
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={navigation.goBack}>
            <CustomIcon style={styles.tickIcon} name={"tick"} />
            <Text style={styles.buttonText}>All Images & Files Added</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default QuoteMediaSectionFooter;
