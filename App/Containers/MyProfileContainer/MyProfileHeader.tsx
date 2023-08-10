// Styles
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import FbIcon from "~root/Components/FbIcon";
import SmallHeader from "~root/Components/SmallHeader";
import { occludeSensitiveView } from "~root/Lib/DataHelper";
import { getInitials } from "~root/Lib/StringHelper";
import { RootState } from "../../Reducers";
import styles from "./MyProfileContainerStyle";

const MyProfileHeader = () => {
  const { name } = useSelector((state: RootState) => ({
    name: state.login?.userData.name,
  }));

  const navigation = useNavigation();

  const onPressUserDetails = React.useCallback(() => {
    navigation.navigate("UserDetails");
  }, [navigation]);

  return (
    <>
      <SmallHeader
        title={"Menu"}
        actionItem={
          <Button transparent={true} onPress={navigation.goBack}>
            <FbIcon name={"ic_close"} style={styles.close} />
          </Button>
        }
      />
      <TouchableOpacity style={styles.item} onPress={onPressUserDetails}>
        <View style={styles.profileBtn}>
          <Text ref={occludeSensitiveView} style={styles.profileBtnTxt}>
            {getInitials(name)}
          </Text>
        </View>
        <Text ref={occludeSensitiveView} style={styles.user}>
          {name}
        </Text>
        <CustomIcon name={"sliders-icon"} style={styles.slider} />
      </TouchableOpacity>
    </>
  );
};

export default MyProfileHeader;
