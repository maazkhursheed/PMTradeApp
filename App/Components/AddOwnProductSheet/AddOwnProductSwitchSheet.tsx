import { Button } from "native-base";
import * as React from "react";
import { Keyboard, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect, useSelector } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import LoadingView from "~root/Components/LoadingView";
import NewQuantitySelector from "~root/Components/NewQuantitySelector";
import NewTextField from "~root/Components/NewTextField/NewTextField";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { descriptionPH, IAlertCallbacks, pricePH, productNamePH, showAlertMessage, uomPH } from "~root/Lib/AlertsHelper";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { Colors } from "~root/Themes";
import styles from "./AddOwnProductSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  sheetCloseTapped: () => void;
}

interface DispatchProps {
  addOwnProduct: (param: any, callback?: IAlertCallbacks) => void;
}

interface StateProps {
  ownProduct: any;
  quoteIdSent: any;
  fetching: boolean;
}

type Props = OwnProps & DispatchProps & StateProps;

const AddOwnProductSwitchSheet: React.SFC<Props> = ({ sheetState, sheetCloseTapped, addOwnProduct, quoteIdSent, fetching }: Props) => {
  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);

  const [productName, setProductName] = React.useState("");

  const [price, setPrice] = React.useState("");

  const [description, setDescription] = React.useState("");

  const [uom, setUOM] = React.useState("");

  const [quantity, setQuantity] = React.useState("1");

  const { dispatchAlert } = useCustomAlert();

  const { sobId } = useSelector((state: RootState) => ({
    sobId: state?.sectionSOBQuotes?.sobId,
  }));

  const requiredText = "Required ";

  React.useEffect(() => {
    setSheetStateInternal(sheetState);
  }, [sheetState]);

  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("Add Own Product Screen");
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  const addAccountTapped = () => {
    const pName = productName?.trim();
    const pPrice = price?.trim();
    const productQuantity = parseInt(quantity, 10);
    Keyboard.dismiss();

    if (pName.length <= 2) {
      showAlert("Please enter a valid product name");
      return;
    }
    if (pPrice.length > 0) {
      const re = /^\d+(\.\d{1,2})?$/;
      if (!re.test(pPrice) || parseFloat(pPrice) === 0) {
        showAlert("Please enter a valid price");
        return;
      }
      if (parseFloat(pPrice) === 0) {
        showAlert("Please enter a valid price");
        return;
      }
    } else {
      showAlert("Please enter a valid price");
      return;
    }

    if (productQuantity === 0) {
      showAlert("Please enter a valid quantity");
      return;
    }

    const OwnProductParams = {
      quantity: productQuantity,
      decimalQty: productQuantity,
      product: {
        code: "custom",
        name: productName,
        description: description,
        unitCode: uom,
      },
      basePrice: {
        value: price,
      },
      customProductFlag: "true",
    };

    addOwnProduct(
      {
        urlParams: {
          quoteId: quoteIdSent,
          sobId,
        },
        bodyParams: OwnProductParams,
      },
      {
        onSuccess: () => {
          closeSheet();
          setProductName("");
          setPrice("");
          setDescription("");
          setUOM("");
          setQuantity("1");
        },
        onFailure: () => {
          showAlert("We were unable to add your product, please try again");
        },
      },
    );
  };

  const showAlert = (alertMessage: string) => {
    showAlertMessage("", alertMessage, dispatchAlert);
  };

  const closeSheet = () => {
    Keyboard.dismiss();
    setSheetStateInternal(SheetState.CLOSED);
    sheetCloseTapped();
    removeOcclusionFromTextFields();
  };

  return (
    <>
      <BottomSheet
        content={
          <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={Platform.select({ android: 150, ios: 50 })} style={styles.contentContainer}>
            <STCHeader
              title={"Add product"}
              titleStyle={styles.titleStyle}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button transparent={true} onPress={closeSheet} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button transparent={true} onPress={addAccountTapped} {...accessibility("rightItemBtn")}>
                  <Text style={styles.addButtonStyle}>{"Add to quote"}</Text>
                </Button>
              }
            />
            <LoadingView style={styles.loadingView} isLoading={fetching} hideViewOnLoading={true}>
              <View style={styles.mainView}>
                <NewTextField label={"Product name"} requiredText={"Required"} placeholder={productNamePH} value={productName} onChangeText={setProductName} />
                <NewTextField label={"Price"} requiredText={"Required"} placeholder={pricePH} value={price} onChangeText={setPrice} />
                <NewTextField label={"Description / Note"} placeholder={descriptionPH} value={description} onChangeText={setDescription} />
                <NewTextField label={"Unit of measure"} placeholder={uomPH} value={uom} onChangeText={setUOM} />
                <Text style={styles.itemValueOptional}>Quantity</Text>
                <NewQuantitySelector
                  quantity={quantity}
                  containerStyle={styles.quantityContainerStyle}
                  style={styles.textQuantityStyle}
                  uom={""}
                  onChange={setQuantity}
                />
              </View>
            </LoadingView>
          </KeyboardAwareScrollView>
        }
        sheetState={sheetStateInternal}
      />
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  ownProduct: state?.quotes?.ownProduct,
  quoteIdSent: state?.quotes?.quotesListDetails?.code,
  fetching: state?.quotes?.fetching,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  addOwnProduct: (payload: any, callback: any) => dispatch(QuotesActions.addOwnProduct(payload, callback || {})),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(AddOwnProductSwitchSheet);
