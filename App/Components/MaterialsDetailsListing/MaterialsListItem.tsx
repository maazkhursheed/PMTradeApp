import * as React from "react";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import QuoteMaterialsListItem from "~root/Components/QuoteMaterialsListItem";
import QuotesProductListItem from "~root/Components/QuotesProductListItem";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { useCustomAlert } from "../CustomAlert/CustomAlert";
import SwiperComponent from "../SwiperComponent";
import RemoveButton from "../SwiperComponent/RemoveButton";

interface OwnProps {
  item: any;
  isMaterialsList?: boolean;
}

interface OwnProps {}

interface StateProps {
  quoteDetails?: any;
}

interface DispatchProps {
  deleteQuoteProduct: (params: any, callback: IAlertCallbacks) => void;
}

type Props = OwnProps & DispatchProps & StateProps;

const MaterialListItem = ({ quoteDetails, item, deleteQuoteProduct, isMaterialsList }: Props) => {
  const itemRef = React.useRef<any>(undefined);
  const listRef = React.useRef<any>(undefined);
  const isQuoteEditable = useQuoteStatusChecker();
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  const { dispatchAlert } = useCustomAlert();

  const removeFunctionality = () => {
    itemRef?.current?.swipe();
    dispatchAlert?.({ visible: false });
    deleteQuoteProduct(
      { quoteId: quoteDetails?.code, entryNumber: item?.entryNumber },
      {
        onSuccess: () => {
          Toast.show({
            text1: "Product removed",
            text2: "",
            type: "info",
            visibilityTime: 3000,
          });
        },
        onFailure: () => {
          listRef.current?.resetQuantity();
          Toast.show({
            type: "error",
            text1: "Failed to remove product",
            text2: "",
            visibilityTime: 3000,
          });
        },
      },
    );
  };

  const onRemovePress = () =>
    isQuoteEditable(
      () => {
        dispatchAlert?.({
          visible: true,
          heading: "Remove " + item.product.name + "?",
          msg: "Are you sure you want to remove this product from your Stage of Build?",
          iconName: "trash",
          button1Text: "Remove",
          button2Text: "Cancel",
          onButton1Press: removeFunctionality,
          onButton2Press: () => {
            listRef.current?.resetQuantity();
            dispatchAlert?.({ visible: false });
            setTimeout(() => {
              itemRef?.current?.swipe();
            }, 1500);
          },
        });
      },
      () => {
        itemRef?.current?.swipe();
        listRef.current?.resetQuantity();
      },
    );
  return (
    <>
      {!isMaterialsList ? (
        <SwiperComponent isSwipeDisabled={isQuoteWonOrLost} ref={itemRef} onFullSwipe={onRemovePress} backView={<RemoveButton onPress={onRemovePress} />}>
          <QuotesProductListItem ref={listRef} remove={onRemovePress} item={item} />
        </SwiperComponent>
      ) : (
        <QuoteMaterialsListItem item={item} />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  deleteQuoteProduct: (params, callback) => dispatch(QuotesActions.deleteQuoteProduct(params, callback)),
});
const mapStateToProps = (state: RootState): StateProps => ({
  quoteDetails: state.quotes.quotesListDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialListItem);
