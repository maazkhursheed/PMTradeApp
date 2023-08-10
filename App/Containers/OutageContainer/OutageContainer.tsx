import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import { Images } from "~root/Themes";
import styles from "./OutageContainerStyle";

export interface OwnProps {
  screensStatus: any;
}

export interface DispatchProps {}

export interface StateProps {}

export interface State {}

type Props = OwnProps & DispatchProps & StateProps;

const BackButton = ({ screensStatus }: any) => {
  try {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={styles.button}>{screensStatus.buttonText}</Text>
      </TouchableOpacity>
    );
  } catch (e) {
    return null;
  }
};

const SmallHeaderInternal = ({ screensStatus }: any) => {
  try {
    const navigation = useNavigation();
    return <SmallHeader title={screensStatus.title || ""} navigation={screensStatus.showBackButton ? navigation : undefined} />;
  } catch (e) {
    return <SmallHeader title={screensStatus.title || ""} />;
  }
};

const OutageContainer: React.SFC<Props> = ({ screensStatus }: Props) => {
  return (
    <MainContainer style={styles.container}>
      <SmallHeaderInternal screensStatus={screensStatus} />
      <View style={styles.imageContainer}>
        <FastImage source={Images.outage} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>{screensStatus.heading}</Text>
          <Text style={styles.text}>{screensStatus.message}</Text>
          {screensStatus.showButton && <BackButton screensStatus={screensStatus} />}
        </View>
      </View>
    </MainContainer>
  );
};

export default OutageContainer;
