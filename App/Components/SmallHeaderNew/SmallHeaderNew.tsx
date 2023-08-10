import { Button } from "native-base";
import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import FbIcon from "~root/Components/FbIcon";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import styles from "./SmallHeaderNewStyle";

interface Props extends ViewProps {
  navigation?: any;
  title?: string | React.ReactElement;
  onBackPress?: () => void;
  subTitle?: string;
}
const SmallHeaderNew: React.SFC<Props> = ({ title, subTitle, onBackPress, navigation }: Props) => {
  return (
    <AppThemeContext.Consumer>
      {value => (
        <View style={styles.mainContainer}>
          <View style={styles.container}>
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
            <Text numberOfLines={1} style={[styles.title, { color: value === "dark" ? Colors.white : Colors.black }]}>
              {title}
            </Text>
          </View>
          <Text style={[styles.subTitle, { color: value === "dark" ? Colors.white : Colors.black }]}>{subTitle}</Text>
        </View>
      )}
    </AppThemeContext.Consumer>
  );
};

export default SmallHeaderNew;
