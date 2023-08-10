import R from "ramda";
import * as React from "react";
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "~root/Reducers";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";
import CustomIcon from "../CustomIcon";
import styles from "./QuoteMediaSectionHeaderStyle";

export interface OwnProps {
  onPress: () => void;
  uploadStarted: boolean;
  uploadEnded: boolean;
  numberOfFailedItems: number;
  totalSelected: number;
  currentUploadIndex: number;
  showSubHeader: boolean;
}

type Props = OwnProps;

const QuoteMediaSectionHeader: React.FC<OwnProps> = ({
  onPress,
  currentUploadIndex,
  uploadEnded,
  uploadStarted,
  numberOfFailedItems,
  totalSelected,
  showSubHeader,
}: Props) => {
  const { quoteMedia } = useSelector((state: RootState) => ({
    quoteMedia: state.quotes.quoteMedia?.quoteMedia,
  }));
  const [countOfMediaIncluded, setCountOfMediaIncluded] = React.useState(0);
  React.useEffect(() => {
    const selectedMedia = quoteMedia && R.filter(R.propEq("mediaSelected", "true"))(quoteMedia);
    setCountOfMediaIncluded(selectedMedia?.length);
  }, [quoteMedia]);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <CustomIcon style={styles.plusIcon} name={"add"} />
        <Text style={styles.uploadText}>Upload Images or Files</Text>
        <View style={styles.rightContent}>
          {uploadStarted ? (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>
                {currentUploadIndex} of {totalSelected}
              </Text>
              <ActivityIndicator style={{ marginLeft: 10 }} color={Platform.OS === "android" ? Colors.darkBlue : ""} size={"small"} />
            </View>
          ) : numberOfFailedItems > 0 ? (
            <Text style={styles.label}>{numberOfFailedItems + " "}Failed</Text>
          ) : uploadEnded ? (
            <CustomIcon name={"success"} style={{ fontSize: 18, color: colors.greenCheck }} />
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
      {showSubHeader && (
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={Fonts.style.openSans16Bold}>Images & Files</Text>
            <View style={styles.rightContent}>
              <View style={styles.iconsContainer}>
                <View style={styles.row}>
                  <Text style={styles.text}>Included in quote</Text>
                  <Text style={styles.value}>{countOfMediaIncluded}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default QuoteMediaSectionHeader;
