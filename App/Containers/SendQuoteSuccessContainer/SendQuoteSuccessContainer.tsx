import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import SmallHeader from "~root/Components/SmallHeader";
import { RootState } from "~root/Reducers";
import { ApplicationStyles, Images, Metrics } from "~root/Themes";
import MainContainer from "../../Components/MainContainer";
import { occludeSensitiveView } from "../../Lib/DataHelper";
import styles from "./SendQuoteSuccessContainerStyles";

const SendQuoteSuccessContainer: React.SFC = () => {
  const navigation = useNavigation();
  const bottomBarHeight = useBottomTabBarHeight();
  const [isFullScreenIssue, setIsFullScreenIssue] = useState(false);

  const { quotesDetails } = useSelector((state: RootState) => ({
    quotesDetails: state.quotes.quotesListDetails,
  }));

  const GST = (quotesDetails?.totalPrice?.value * 15) / 100;
  const total = quotesDetails?.totalPrice?.value + GST;

  const onSuccess = React.useCallback(() => {
    navigation.navigate("Jobs");
  }, []);

  const onReturn = React.useCallback(() => {
    navigation.navigate("Jobs");
  }, []);

  return (
    <MainContainer
      onLayout={event => {
        setIsFullScreenIssue(event.nativeEvent.layout.height > Metrics.screenHeight - bottomBarHeight);
      }}
    >
      <SmallHeader style={ApplicationStyles.noShadow} title={"Quote Sent"} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center" }}>
        <Image style={styles.sentImage} source={Images.quoteSent} resizeMode={"contain"} />
        <Text style={styles.heading}>Nice Job!</Text>
        <Text style={styles.subHeading}>We’ve sent a copy of the quote to your email address so you have a record of it</Text>

        <View style={[styles.card, styles.shadowProp]}>
          <View style={styles.innerCardContainer}>
            <Text style={styles.cardHeading}>{quotesDetails?.jobName}</Text>
            <Text style={styles.cardSubHeading}>{quotesDetails?.jobAddress?.formattedAddress}</Text>
          </View>
          <View style={styles.seperator} />
          <View style={[styles.innerCardSubContainer]}>
            <View style={styles.cardDataContainer}>
              <Text style={styles.cardLabel}>Customer Name</Text>
              <Text ref={occludeSensitiveView} style={styles.cardData}>
                {quotesDetails?.consumerAddress?.firstName}
              </Text>
            </View>
            <View style={styles.cardDataContainer}>
              <Text style={styles.cardLabel}>Phone</Text>
              <Text ref={occludeSensitiveView} style={styles.cardData}>
                {quotesDetails?.consumerAddress?.phone}
              </Text>
            </View>
            <View style={styles.cardDataContainer}>
              <Text style={styles.cardLabel}>Email</Text>
              <Text ref={occludeSensitiveView} style={styles.cardData}>
                {quotesDetails?.consumerAddress?.email}
              </Text>
            </View>
          </View>
          <View style={styles.seperator} />
          <View style={[styles.innerCardSubContainer, { marginBottom: 5 }]}>
            <View style={styles.cardDataContainer}>
              <Text style={styles.cardLabel}>Quote Total incl GST</Text>
              <Text style={styles.cardDataBold}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.lastText}>
          Now that you have finished your quote you can find it in the Pending section where you can make changes and mark it as Won or Lost once you’ve heard
          back from your customer.
        </Text>
      </ScrollView>
      <View style={[styles.buttonContainer, { bottom: isFullScreenIssue ? bottomBarHeight : 0 }]}>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          onPress={() => {
            onReturn();
          }}
        >
          <Text style={styles.buttonText}>Return to Quotes</Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

export default SendQuoteSuccessContainer;
