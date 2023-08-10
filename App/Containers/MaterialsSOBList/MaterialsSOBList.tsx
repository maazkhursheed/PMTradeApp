import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import AddMaterialsSwitchSheet from "~root/Components/AddMaterialsSwitchSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomIcon from "~root/Components/CustomIcon";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "~root/Components/FeatureToggle/FeatureToggle";
import LoadingView from "~root/Components/LoadingView";
import MaterialsStageOfBuildComponent from "~root/Components/MaterialsStageOfBuildComponent/MaterialsStageOfBuildComponent";
import SmallHeader from "~root/Components/SmallHeader";
import { accessibility } from "~root/Lib/DataHelper";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { SectionSOBQuotesActions } from "~root/Reducers/MaterialSectionsSOBQuotesReducers";
import images from "~root/Themes/Images";
import styles from "./MaterialsSOBListStyle";

const MaterialsSOBList: React.SFC = () => {
  const dispatch = useDispatch();
  const { quoteDetails, fetching } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
    fetching: state.sectionSOBQuotes.fetching,
  }));
  React.useEffect(() => {
    dispatch(SectionSOBQuotesActions.getSOBQuotes({ quoteId: quoteDetails?.code }));
  }, [quoteDetails]);
  const navigation = useNavigation();
  const { append } = useAppender();
  const [stateSheet, setStateSheet] = React.useState(SheetState.CLOSED);
  React.useEffect(() => {
    append(<AddMaterialsSwitchSheet sheetState={stateSheet} sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)} />, "AddMaterialsSwitchSheet", 0);
  }, [stateSheet]);
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setStateSheet(SheetState.CLOSED));

  const { sobMaterialQuotesData } = useSelector((state: RootState) => ({ sobMaterialQuotesData: state.sectionSOBQuotes.SOBQuotesList }));
  const isQuoteEditable = useQuoteStatusChecker();
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  return (
    <LoadingView isLoading={fetching} style={{ flex: 1 }}>
      <SmallHeader
        title={"Materials"}
        navigation={navigation}
        actionItem={
          <Button transparent={true} onPress={() => isQuoteEditable(() => setStateSheet(SheetState.EXPANDED))} style={styles.rightItemStyle}>
            {!isQuoteWonOrLost && <CustomIcon style={styles.iconAdd} name={"add"} />}
          </Button>
        }
      />
      {!sobMaterialQuotesData?.pmQuoteSobList ? (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <FastImage source={images.labourCostEmpty} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.msg1}>Add Materials</Text>
            <Text style={styles.msg2}>Organise materials by stage of build to easily order exactly what you need when you need it.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => isQuoteEditable(() => setStateSheet(SheetState.EXPANDED))}
              {...accessibility("AddMaterialButton")}
            >
              <CustomIcon name={"add"} style={styles.icon} />
              <Text style={styles.buttonText}>Add stage of build</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <MaterialsStageOfBuildComponent items={sobMaterialQuotesData?.pmQuoteSobList} navigation={navigation} />
      )}
    </LoadingView>
  );
};

export default MaterialsSOBList;
