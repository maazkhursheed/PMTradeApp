import * as React from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import { connect } from "react-redux";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import { IAlertCallbacks, REQUEST_ITEM } from "~root/Lib/AlertsHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { CartActions } from "~root/Reducers/CartReducer";
import { RequestCartItemParams } from "~root/Types/Cart";
import { SheetState } from "../BottomSheet/BottomSheet";
import CustomIcon from "../CustomIcon";
import LoadingView from "../LoadingView";
import RequestItemInputSheet from "../RequestItemInputSheet/RequestItemInputSheet";
import styles from "./RequestAnItemStyle";

interface OwnProps extends ViewProps {}

interface DispatchProps {
  requestSaveCartInfo: (params: RequestCartItemParams, alertCallbacks: IAlertCallbacks) => void;
}

interface StateProps {
  requestItem: string;
  isLoading: boolean;
  reviewMode: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

const RequestAnItem: React.SFC<Props> = ({ reviewMode, requestItem, requestSaveCartInfo, isLoading }: Props) => {
  const [requestItemInputSheet, setRequestItemInputSheet] = React.useState(SheetState.CLOSED);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const { append } = useAppender();
  const { dispatchAlert } = useCustomAlert();
  React.useEffect(() => {
    append(
      <RequestItemInputSheet sheetState={requestItemInputSheet} isDeleted={isDeleted} onClose={() => setRequestItemInputSheet(SheetState.CLOSED)} />,
      "RequestItemInputSheet",
      0,
    );
  }, [requestItemInputSheet, isDeleted]);

  const onRequestAnItemPress = React.useCallback(() => {
    setIsDeleted(false);
    setRequestItemInputSheet(SheetState.EXPANDED);
  }, []);

  const onDeleteRequestItem = React.useCallback(() => {
    const params = {
      requestItem: "",
    };
    dispatchAlert?.({
      visible: true,
      heading: "Delete item request?",
      msg: "Are you sure you want to delete this item request?",
      button1Text: "Delete",
      onButton1Press: () => {
        dispatchAlert?.({ visible: false });
        requestSaveCartInfo(params, {
          onSuccess: () => setIsDeleted(true),
        });
      },
      button2Text: "Cancel",
      onButton2Press: () => dispatchAlert?.({ visible: false }),
    });
  }, []);

  const onEditRequestItem = React.useCallback(() => setRequestItemInputSheet(SheetState.EXPANDED), []);
  const isItemRequested = requestItem && requestItem.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomIcon style={styles.iconMegaPhone} name={"Icon-Megaphone"} />
        <Text style={styles.title}>Request an item</Text>
      </View>
      <LoadingView isLoading={isLoading}>
        {isItemRequested ? (
          <View>
            <Text style={styles.inputText}>{requestItem}</Text>
            {!reviewMode && (
              <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.iconContainer} onPress={onDeleteRequestItem}>
                  <CustomIcon style={styles.iconTrash} name={"trash"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={onEditRequestItem}>
                  <CustomIcon style={styles.iconTrash} name={"edit"} />
                  <Text style={styles.editText}>Edit request</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={onRequestAnItemPress}>
            <Text style={styles.requestItem}>{REQUEST_ITEM}</Text>
          </TouchableOpacity>
        )}
      </LoadingView>
    </View>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  requestSaveCartInfo: (params: RequestCartItemParams, alertCallbacks: any) => dispatch(CartActions.requestSaveCartInfo(params, alertCallbacks)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  requestItem: state.cart.userCartDetail?.requestItem,
  isLoading: state.cart.fetching || state.cart.savingCartInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestAnItem);
