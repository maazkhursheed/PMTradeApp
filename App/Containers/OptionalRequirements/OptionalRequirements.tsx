import firebase from "@react-native-firebase/app";
import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import * as React from "react";
import { FlatList, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "~root/Components/Card";
import CardSectionHeader from "~root/Components/Card/CardSectionHeader";
import CartMenuCollapes from "~root/Components/CartMenuCollapes";
import LargeButton from "~root/Components/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import OptionalInstructions from "~root/Components/OptionalInstructions";
import SiteDetailsItemComponent from "~root/Components/SiteDetailsItemComponent";
import SmallHeader from "~root/Components/SmallHeader";
import TruckTypeComponent from "~root/Components/TruckTypeComponent";
import { getBranchTownRegion, navigationalScreens, OrderTypes, SiteRequirements } from "~root/Lib/BranchHelper";
import { getFulfilmentpageAnalyticsObj } from "~root/Lib/DataHelper";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { ApplicationStyles } from "~root/Themes";
import { truckTypeStandardHiab } from "../../Lib/AlertsHelper";
import { useCashCustomerStatus } from "../../Lib/QuoteHelper";
import styles from "./OptionalRequirementsStyles";

const OptionalRequirements: React.FunctionComponent = props => {
  const { cartData, selectedBranch, availableTruckRequirements, availableSiteRequirements } = useSelector((state: RootState) => ({
    cartData: state?.cart,
    selectedBranch: state.branchList?.selectedBranch,
    availableTruckRequirements: state?.cart?.deliveryRequirements?.availableTruckRequirements || [],
    availableSiteRequirements: state?.cart?.deliveryRequirements?.availableSiteRequirements || [],
  }));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [siteRequirements, setSiteRequirements] = React.useState([]);
  const [truckRequirements, setTruckRequirements] = React.useState(cartData?.truckRequirements[0] || truckTypeStandardHiab);
  const [instructions, setInstructions] = React.useState(cartData?.additionalInfo || "");
  const { CashCustomerStatus } = useCashCustomerStatus();

  React.useEffect(() => {
    let siteRequirementsArr = [];
    availableSiteRequirements.map((value, index) => {
      const selected = R.compose(R.includes(value), R.propOr([], "siteRequirements"))(cartData);
      siteRequirementsArr.push({ label: value, selected });
    });
    setSiteRequirements(siteRequirementsArr);
  }, []);

  const toggleSiteDetailItemSelection = React.useCallback(
    (siteDetailItemIndex: number) => {
      const selected = siteRequirements[siteDetailItemIndex].selected;
      siteRequirements[siteDetailItemIndex].selected = !selected;
      setSiteRequirements([...siteRequirements]);
    },
    [siteRequirements],
  );

  const renderItem = (item: any, index) => {
    const truckItem = {
      label: item,
      onPress: () => setTruckRequirements(item),
    };
    return (
      <View style={{ marginBottom: availableTruckRequirements?.length === index + 1 ? 20 : 0 }}>
        <TruckTypeComponent item={truckItem} selected={truckRequirements === item} />
      </View>
    );
  };

  const logFirebaseEvent = (step: number, orderType: string) => {
    const siteArr = R.compose(R.map(R.prop("label")), R.filter(R.propEq("selected", true)))(siteRequirements) as any;
    const eventLogObject = getFulfilmentpageAnalyticsObj({
      step,
      orderType,
      props: props,
      location: getBranchTownRegion(selectedBranch),
      storeName: selectedBranch?.name,
      deliveryType: truckRequirements,
      onSiteLift: siteArr.includes(SiteRequirements.OnSiteLift).toString(),
      onSiteHazards: siteArr.includes(SiteRequirements.OnSiteHazards).toString(),
      restrictedAccess: siteArr.includes(SiteRequirements.RestrictedAccess).toString(),
    });
    firebase.analytics().logEvent("begin_checkout", eventLogObject);
  };

  React.useEffect(() => logFirebaseEvent(5, OrderTypes.STANDARD), []);

  const continueTapped = React.useCallback(() => {
    logFirebaseEvent(6, OrderTypes.STANDARD);
    const siteArr = R.compose(R.map(R.prop("label")), R.filter(R.propEq("selected", true)))(siteRequirements);
    if (!(availableTruckRequirements.length === 0 && availableSiteRequirements.length === 0)) {
      dispatch(
        CartActions.updateOptionalRequirements({
          siteRequirements: siteArr,
          truckRequirements: [truckRequirements],
        }),
      );
    }
    navigation.navigate("AccountDetails");
  }, [availableSiteRequirements, availableTruckRequirements, siteRequirements, truckRequirements]);

  return (
    <MainContainer>
      <SmallHeader style={ApplicationStyles.noShadow} navigation={navigation} title={"Optional requirements"} />
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {CashCustomerStatus && <CartMenuCollapes />}
        {availableTruckRequirements.length > 0 && (
          <Card style={styles.cardStyle}>
            <CardSectionHeader text={"Available delivery trucks"} style={styles.cardSectionStyle} />
            <FlatList
              data={availableTruckRequirements}
              keyExtractor={item => item.toString()}
              renderItem={({ item, index }) => renderItem(item, index)}
              contentContainerStyle={styles.flatListStyle}
              showsHorizontalScrollIndicator={false}
            />
          </Card>
        )}
        {siteRequirements.length > 0 && (
          <Card style={styles.siteCardStyle}>
            <CardSectionHeader text={"Site Details"} />
            <FlatList
              data={siteRequirements}
              keyExtractor={({ label }) => label.toString()}
              renderItem={({ item, index }) => {
                return <SiteDetailsItemComponent item={{ ...item, onPress: () => toggleSiteDetailItemSelection(index) }} />;
              }}
              contentContainerStyle={styles.flatListStyle}
              showsHorizontalScrollIndicator={false}
            />
          </Card>
        )}
        <OptionalInstructions
          instructions={instructions}
          onSave={instructionstxt => {
            setInstructions(instructionstxt);
            dispatch(
              CartActions.updateOptionalRequirements({
                additionalInfo: instructionstxt,
              }),
            );
          }}
        />
      </ScrollView>
      <View style={styles.continueButtonContainer}>
        <LargeButton textStyle={styles.largeButtonTextStyle} style={styles.largeButtonStyle} onPress={continueTapped} btnText={"Continue"} />
      </View>
    </MainContainer>
  );
};

export default withAppender(safeRender(OptionalRequirements, navigationalScreens.OptionalRequirementsScreen));
