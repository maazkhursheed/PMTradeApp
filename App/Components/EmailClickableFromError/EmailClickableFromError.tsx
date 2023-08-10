import * as R from "ramda";
import React from "react";
import { Linking, Text } from "react-native";
import AppConfig from "~root/Config/AppConfig";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./EmailClickableFromErrorStyles";

const emailClickableFromError = (description: string) => {
  if (description) {
    if (R.contains(AppConfig.SUPPORT_EMAIL, description)) {
      const urlExpression = AppConfig.SUPPORT_EMAIL;
      // @ts-ignore
      const urls = R.match(AppConfig.SUPPORT_EMAIL, description);
      const data = R.split(urlExpression, description);
      return (
        <Text style={styles.descriptionStyle}>
          {data.length > 0 ? (
            data.map((value, index) => {
              return [
                index !== 0 ? (
                  <Text
                    key={index}
                    {...accessibility("emailClickable")}
                    onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)}
                    style={styles.emailStyle}
                  >
                    {urls}
                  </Text>
                ) : null,
                value,
              ];
            })
          ) : (
            <Text>{description}</Text>
          )}
        </Text>
      );
    } else {
      return <Text style={styles.descriptionStyle}>{description}</Text>;
    }
  } else {
    return null;
  }
};

export default emailClickableFromError;
