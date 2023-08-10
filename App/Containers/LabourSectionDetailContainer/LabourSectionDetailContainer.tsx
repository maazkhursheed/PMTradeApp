import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddLabourCostSwitchSheet from "~root/Components/AddLabourCostSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomIcon from "~root/Components/CustomIcon";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "~root/Components/FeatureToggle/FeatureToggle";
import LabourAndOtheCostListEmpty from "~root/Components/LabourAndOtheCostListEmpty/LabourAndOtheCostListEmpty";
import LabourCostListItem from "~root/Components/LabourCostListItem/LabourCostListItem";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import PriceComponent from "~root/Components/PriceComponent";
import SmallHeader from "~root/Components/SmallHeader";
import SwipeLeftToRemove from "~root/Components/SwipeLeftToRemove";
import { SWIPE_LEFT_TO_REMOVE_OR_EDIT_TEXT } from "~root/Lib/AlertsHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { getAddCostButtonText, getLabourCostData, getLabourCostTitle, getTotalForCostType } from "~root/Lib/LabourSectionHelper";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors } from "~root/Themes";
import styles from "./LabourSectionDetailContainerStyle";

const LabourSectionDetailContainer: React.SFC = ({}) => {
  const dispatch = useDispatch();
  const { quoteId, isLoading, otherCostList } = useSelector((state: RootState) => ({
    otherCostList: state?.quotes?.labourOtherCost?.otherCostList,
    quoteId: state.quotes?.quotesListDetails,
    isLoading: state.quotes?.fetching,
  }));

  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = React.useState([]);

  const { append } = useAppender();
  const [stateSheet, setStateSheet] = React.useState(SheetState.CLOSED);
  const [isShown, setIsShown] = React.useState(false);
  const isQuoteEditable = useQuoteStatusChecker();
  const handleRemoveItem = (name: string) => {
    const newItem = data.filter(item => item.name !== name);
    setData(newItem);
  };

  React.useEffect(() => {
    append(
      <AddLabourCostSwitchSheet costType={route.params?.costType} sheetState={stateSheet} sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)} />,
      "AddLabourCostSwitchSheet",
      0,
    );
  }, [stateSheet]);
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setStateSheet(SheetState.CLOSED));
  React.useEffect(() => {
    setData(getLabourCostData(otherCostList, route.params?.costType));
  }, [otherCostList]);

  React.useEffect(() => {
    dispatch(QuotesActions.requestLabourCost({ quoteId: quoteId?.code, costType: route.params?.costType }, {}));
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, 1000);
  }, []);

  const showSheet = React.useCallback(() => {
    isQuoteEditable(() => setStateSheet(SheetState.EXPANDED));
  }, [isQuoteEditable]);

  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  return (
    <>
      <MainContainer>
        <SmallHeader title={getLabourCostTitle(route?.params?.costType)} navigation={navigation} />
        <LoadingView isLoading={isLoading} style={{ flex: 1, paddingTop: 16, backgroundColor: Colors.offWhite }}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return <LabourCostListItem item={item} costType={route.params?.costType} handleRemoveItem={handleRemoveItem} />;
            }}
            key={"labourAndOtherCostList"}
            {...accessibility("labourAndOtherCostList")}
            ListEmptyComponent={isShown && !isQuoteWonOrLost ? <LabourAndOtheCostListEmpty /> : null}
            ListFooterComponent={
              <View>
                {data.length > 0 && !isQuoteWonOrLost && (
                  <View>
                    <TouchableOpacity style={[styles.row, { backgroundColor: Colors.white }]} onPress={showSheet}>
                      <CustomIcon style={styles.icon} name={"add"} />
                      <Text style={styles.text}>{getAddCostButtonText(route.params?.costType)}</Text>
                    </TouchableOpacity>
                    <SwipeLeftToRemove text={SWIPE_LEFT_TO_REMOVE_OR_EDIT_TEXT} />
                  </View>
                )}
              </View>
            }
          />
          {data.length > 0 && (
            <View style={styles.footer}>
              <View style={styles.rowFooter}>
                <Text style={styles.changeText}>Costs total (total of all costs added)</Text>
                <PriceComponent style={styles.value} value={getTotalForCostType(otherCostList, route.params?.costType)} ignorePOA={true} />
              </View>
            </View>
          )}
        </LoadingView>
      </MainContainer>
    </>
  );
};

export default LabourSectionDetailContainer;
