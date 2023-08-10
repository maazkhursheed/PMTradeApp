import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddLabourCostSwitchSheet from "~root/Components/AddLabourCostSheet";
import SwiperComponent from "~root/Components/SwiperComponent";
import { getRemoveCostWarningMsg } from "~root/Lib/LabourSectionHelper";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { LabourCostType } from "~root/Types/LabourSection";
import { SheetState } from "../BottomSheet/BottomSheet";
import { useCustomAlert } from "../CustomAlert/CustomAlert";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "../FeatureToggle/FeatureToggle";
import PriceComponent from "../PriceComponent";
import EditButton from "../SwiperComponent/EditButton";
import RemoveButton from "../SwiperComponent/RemoveButton";
import styles from "./LabourCostListItemStyle";

interface Props extends ViewProps {
  item: any;
  costType: LabourCostType;
  handleRemoveItem: (name: string) => void;
}

const LabourCostListItem: React.SFC<Props> = ({ item, costType, handleRemoveItem }: Props) => {
  const { notes, name, subTotal, quantity, price } = item;
  const dispatch = useDispatch();
  const { append } = useAppender();
  const route = useRoute();
  const [stateSheet, setStateSheet] = React.useState(SheetState.CLOSED);

  const isQuoteEditable = useQuoteStatusChecker();
  const { quoteDetails } = useSelector((state: RootState) => ({
    quoteDetails: state.quotes.quotesListDetails,
  }));
  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setStateSheet(SheetState.CLOSED));
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  const { dispatchAlert } = useCustomAlert();
  React.useEffect(() => {
    append(
      <AddLabourCostSwitchSheet
        uLabourHours={quantity}
        uLabourNotes={notes}
        uLabourCostName={name}
        uLabourCharge={price}
        isUpdateCost={true}
        costType={route.params?.costType}
        sheetState={stateSheet}
        sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)}
      />,
      "AddLabourCostSwitchSheet",
      0,
    );
    swipe?.current?.swipe();
  }, [stateSheet]);

  const swipe = React.useRef(null);

  const editFunctionality = React.useCallback(() => {
    isQuoteEditable(() => {
      setStateSheet(SheetState.EXPANDED);
      swipe?.current?.swipe();
    });
  }, [isQuoteEditable]);

  const removeFunctionality = React.useCallback(() => {
    dispatchAlert?.({ visible: false });
    dispatch(
      QuotesActions.deleteLabourCost(
        {
          quoteId: quoteDetails.code,
          costType: costType,
          name: name,
        },
        {
          onSuccess: () => {
            handleRemoveItem(name);
          },
          onFailure: () => {
            dispatchAlert?.({
              visible: true,
              heading: "Something went wrong",
              msg: "We couldn’t delete this labour cost, please try again",
              iconName: "delete-fail-large",
              button1Text: "OK",
              onButton1Press: () => dispatchAlert?.({ visible: false }),
            });
          },
        },
      ),
    );
    swipe?.current?.swipe();
  }, [item, quoteDetails?.code, isQuoteEditable]);

  return (
    <SwiperComponent
      isSwipeDisabled={isQuoteWonOrLost}
      ref={swipe}
      disableFullSwipe={true}
      backButtonWidth={200}
      backView={
        <View style={styles.btnViewStyle}>
          <EditButton onPress={editFunctionality} style={styles.editView} />
          <RemoveButton
            onPress={() => {
              swipe?.current?.swipe();
              isQuoteEditable(() => {
                setTimeout(
                  () =>
                    dispatchAlert?.({
                      visible: true,
                      heading: "Remove " + name + "?",
                      msg: getRemoveCostWarningMsg(route.params?.costType),
                      iconName: "trash",
                      button1Text: "Remove",
                      button2Text: "Cancel",
                      onButton1Press: removeFunctionality,
                      onButton2Press: () => dispatchAlert?.({ visible: false }),
                    }),
                  300,
                );
              });
            }}
            style={styles.deleteView}
          />
        </View>
      }
    >
      <View style={styles.listingContainer}>
        <View style={styles.listingContainerBorder}>
          <View style={styles.listingRowHeading}>
            <Text style={styles.listingTextHeading}>{name}</Text>
            <PriceComponent style={styles.value} value={subTotal.value} ignorePOA={true} />
          </View>

          <View style={styles.listingRowHours}>
            <View style={styles.hourContainer}>
              <Text style={styles.listingTextContainerHours}>Hours: </Text>
              <Text style={styles.valueHours}>{quantity}</Text>
            </View>
            <View style={styles.rateContainer}>
              <Text style={styles.listingTextContainerHours}>{`Charge Rate: `}</Text>
              <PriceComponent style={styles.valueHours} value={price} ignorePOA={true} />
            </View>
          </View>
          {notes.length > 0 && <Text style={styles.listingTextPara}>{notes}</Text>}
        </View>
      </View>
    </SwiperComponent>
  );
};

export default LabourCostListItem;
