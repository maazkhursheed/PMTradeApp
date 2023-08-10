import * as React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import AppConfig from "~root/Config/AppConfig";
import { Images } from "~root/Themes";
import style from "./JobsListEmptyComponentStyles";

const JobsListEmptyComponent: React.SFC = () => {
  return (
    <View style={style.container}>
      <FastImage source={Images.package} style={style.packageImage} resizeMode={FastImage.resizeMode.contain} />
      <Text style={style.textStyle}>{"No approved jobs\n or estimates."}</Text>
      <Text style={style.descText}>Create job accounts, or get us to load an estimate to manage your job smarter</Text>
      <TouchableOpacity onPress={() => Linking.openURL(AppConfig.ESTIMATES_JOBS_URL)}>
        <Text style={style.learnMore}>Learn more</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JobsListEmptyComponent;
