import { Button } from "native-base";
import * as React from "react";
import { Keyboard, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { IAlertCallbacks, showAlertMessage } from "~root/Lib/AlertsHelper";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors, Fonts } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import PercentageSelector from "../PercentageSelector/PercentageSelector";
import PriceComponent from "../PriceComponent";
import styles from "./ChangeMarkupSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
}

interface DispatchProps {
  updateQuoteMarkup: (payload: any, alertCallbacks: IAlertCallbacks) => void;
}

interface StateProps {
  fetching: boolean;
  materialsPrice: any;
  markupPrice: any;
  markupPercentage: any;
  quoteDetails?: any;
}

type Props = OwnProps & DispatchProps & StateProps;

const Permissions = [PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner];

const ChangeMarkupSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped }: Props) => {
  const dispatch = useDispatch();
  const { dispatchAlert } = useCustomAlert();
  const { materialsPrice, markupPrice, markupPercentage, fetching, quoteDetails } = useSelector((state: RootState) => ({
    materialsPrice: state.quotes.quotesListDetails?.materialPrice || "",
    markupPrice: state.quotes.quotesListDetails?.markupPrice || "",
    markupPercentage: state.quotes.quotesListDetails.markupPercentage || "",
    fetching: state.quotes.fetching,
    quoteDetails: state.quotes.quotesListDetails,
  }));

  const [markupPercent, setMarkupPercent] = React.useState(markupPercentage);
  const [markupCost, setMarkupCost] = React.useState(markupPrice?.formattedValue);
  const [materialsTotal, setMaterialsTotal] = React.useState((Number(materialsPrice?.value) + Number(markupPrice?.value)).toFixed(2));
  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Change markup Screen");
      setMarkupPercent(markupPercentage);
      setMarkupCost(markupPrice?.formattedValue);
      setMaterialsTotal((Number(materialsPrice?.value) + Number(markupPrice?.value)).toFixed(2));
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const closeSheet = React.useCallback(() => {
    Keyboard.dismiss();
    sheetCloseTapped();
    removeOcclusionFromTextFields();
  }, []);

  const onCancel = React.useCallback(() => {
    setMarkupPercent(markupPercentage);
    setMarkupCost(markupPrice?.formattedValue);
    setMaterialsTotal((Number(materialsPrice?.value) + Number(markupPrice?.value)).toFixed(2));
    closeSheet();
  }, [markupPercentage, markupPrice, materialsPrice]);

  const onChange = React.useCallback(
    value => {
      setMarkupPercent(value);
      const newMarkupCost = ((Number(value) / 100) * Number(materialsPrice?.value)).toFixed(2);
      const newTotalPrice = (Number(newMarkupCost) + Number(materialsPrice?.value)).toFixed(2);
      setMarkupCost(newMarkupCost);
      setMaterialsTotal(newTotalPrice);
    },
    [materialsPrice],
  );

  const updateMarkup = React.useCallback(
    () =>
      dispatch(
        QuotesActions.updateQuoteMarkupPercent(
          { code: quoteDetails.code, markupPercent: markupPercent },
          {
            onSuccess: closeSheet,
            onFailure: () => {
              showAlertMessage("", "Oops, something went wrong. Please try again.", dispatchAlert);
            },
          },
        ),
      ),
    [markupPercent, quoteDetails],
  );

  return (
    <>
      <BottomSheet
        content={
          <ScrollView style={styles.contentContainer}>
            <STCHeader
              title={"Change markup"}
              titleStyle={styles.titleStyle}
              style={styles.headerStyle}
              leftItem={
                <Button transparent={true} onPress={onCancel} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button
                  disabled={Number(markupPercent) === Number(markupPercentage)}
                  transparent={true}
                  onPress={updateMarkup}
                  {...accessibility("rightItemBtn")}
                >
                  <Text
                    style={[
                      styles.saveButtonStyle,
                      {
                        color: Number(markupPercent) === Number(markupPercentage) ? Colors.darkGrey : Colors.lightBlue,
                      },
                    ]}
                  >
                    {"Save"}
                  </Text>
                </Button>
              }
            />
            <LoadingView style={styles.loadingView} isLoading={fetching}>
              <Text style={styles.labelStyle}>Materials cost</Text>
              <PriceComponent
                {...accessibility("materialsPrice")}
                style={Fonts.style.openSans16Bold}
                prefix={"$"}
                value={materialsPrice.formattedValue}
                hideView={true}
                ignorePOA={true}
                permissionTypes={Permissions}
              />
              <Text style={styles.labelStyle}>Mark-up cost</Text>
              <PriceComponent
                {...accessibility("markupCost")}
                style={Fonts.style.openSans16Bold}
                prefix={"$"}
                ignorePOA={true}
                value={markupCost}
                hideView={true}
                permissionTypes={Permissions}
              />
              <Text style={styles.labelStyle}>Materials total</Text>
              <PriceComponent
                {...accessibility("materialsTotal")}
                style={Fonts.style.openSans24Bold}
                prefix={"$"}
                value={materialsTotal}
                hideView={true}
                ignorePOA={true}
                permissionTypes={Permissions}
              />
              <Text style={styles.labelStyle}>Markup percentage</Text>
              <PercentageSelector
                percentage={markupPercent}
                containerStyle={styles.quantityContainerStyle}
                style={styles.textQuantityStyle}
                onChange={onChange}
              />
            </LoadingView>
          </ScrollView>
        }
        sheetState={sheetState}
      />
    </>
  );
};

export default ChangeMarkupSheet;
