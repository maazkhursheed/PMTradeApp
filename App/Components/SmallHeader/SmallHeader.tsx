import { Button } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import RNUxcam from "react-native-ux-cam";
import FbIcon from "~root/Components/FbIcon";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import styles from "./SmallHeaderStyle";

interface Props extends ViewProps {
  navigation?: any;
  title?: string | React.ReactElement;
  actionItem?: React.ReactElement;
  uxCamTitleHide?: boolean;
  onBackPress?: () => void;
}
const SmallHeader: React.SFC<Props> = ({ title, onBackPress, navigation, actionItem, style, uxCamTitleHide, ...props }: Props) => {
  return (
    <AppThemeContext.Consumer>
      {value => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: value === "dark" ? Colors.darkBlueHeader : Colors.white,
            },
            style,
            {
              zIndex: 10,
              elevation: value === "dark" ? 1 : 0,
            },
          ]}
          {...props}
        >
          <View style={styles.leftItem}>
            {(navigation || onBackPress) && (
              <Button onPress={onBackPress || navigation.goBack} style={styles.backIconContainer} transparent={true} {...accessibility("backIcon")}>
                <View {...accessibility("backIcon")}>
                  <FbIcon
                    name={"ic_back"}
                    style={[styles.backIcon, { color: value === "dark" ? Colors.white : Colors.black }]}
                    {...accessibility("backIcon")}
                  />
                </View>
              </Button>
            )}
          </View>
          {R.is(String, title) ? (
            <Text
              ref={view => {
                if (view && uxCamTitleHide) {
                  RNUxcam.occludeSensitiveView(view);
                }
              }}
              numberOfLines={1}
              style={[styles.title, { color: value === "dark" ? Colors.white : Colors.black }]}
            >
              {title}
            </Text>
          ) : (
            { title }
          )}
          {actionItem && <View style={styles.rightItem}>{actionItem}</View>}
        </View>
      )}
    </AppThemeContext.Consumer>
  );
};

export default SmallHeader;
