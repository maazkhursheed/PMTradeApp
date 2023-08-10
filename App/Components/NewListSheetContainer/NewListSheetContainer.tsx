import * as React from "react";
import { Keyboard, Platform, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { MyListActions } from "~root/Reducers/MyListReducers";
import BottomSheet, { SheetState } from "../BottomSheet/BottomSheet";
import NewListSheet, { NewListAction } from "../NewListSheet/NewListSheet";
import SearchListingFormAdd from "../SearchListingFormAdd";

interface OwnProps {
  onPress?: () => void;
  closeAll?: () => void;
  onNewListSuccess?: (name: string) => void;
  item: any;
}

interface DispatchProps {
  requestList: (callback: IAlertCallbacks) => void;
  clearNewList: () => void;
}

interface StateProps {}
type Props = StateProps & DispatchProps & OwnProps;

const NewListSheetContainer: React.SFC<Props> = React.forwardRef(({ item, children, onPress, requestList, clearNewList, onNewListSuccess }: Props, ref) => {
  const [newListSheet, setNewListSheet] = React.useState(SheetState.CLOSED);
  const [newListAction, setNewListAction] = React.useState(NewListAction.AddItemToNewList);
  const [newListMeta, setNewListMeta] = React.useState(undefined);
  const [listingFormSheet, setListingFormSheet] = React.useState(SheetState.CLOSED);

  const { append } = useAppender();

  React.useImperativeHandle(ref, () => ({
    openRenameList: (meta: any) => {
      setNewListAction(NewListAction.Rename);
      setNewListSheet(SheetState.EXPANDED);
      setNewListMeta(meta);
    },
  }));

  const clickMore = React.useCallback(() => {
    setListingFormSheet(SheetState.EXPANDED);
    requestList({});
  }, []);

  React.useEffect(() => {
    if (listingFormSheet === SheetState.CLOSED) {
      clearNewList();
      addItemList.current?.reset();
    }
  }, [listingFormSheet]);

  const addItemList = React.useRef(undefined);
  React.useEffect(() => {
    append(
      <BottomSheet
        sheetState={listingFormSheet}
        content={
          <SearchListingFormAdd
            ref={addItemList}
            item={item}
            sku={item?.SKU}
            onNewClick={(sku: any) => {
              setNewListMeta(sku);
              setNewListAction(NewListAction.AddItemToNewList);
              setNewListSheet(SheetState.EXPANDED);
            }}
            onCloseBottomSheet={() => setListingFormSheet(SheetState.CLOSED)}
          />
        }
      />,
      "listingFormSheet",
      0,
    );
  }, [listingFormSheet, item]);

  React.useEffect(() => {
    append(
      <NewListSheet
        callback={setNewListSheet}
        closeSheet={() => {
          setNewListSheet(SheetState.CLOSED);
          Platform.select({ android: Keyboard.dismiss() });
        }}
        sheetState={newListSheet}
        action={newListAction}
        meta={newListMeta}
        onSuccess={onNewListSuccess}
      />,
      "newListSheet",
      1,
    );
  }, [newListSheet, newListAction, newListMeta]);

  return (
    <TouchableOpacity
      onPress={() => {
        clickMore();
        if (onPress) {
          onPress();
        }
      }}
    >
      {children}
    </TouchableOpacity>
  );
});

const mapStateToProps = (state: RootState): StateProps => ({
  // @ts-ignore
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  requestList: alertCallbacks => dispatch(MyListActions.getAllList(undefined, alertCallbacks)),
  clearNewList: () => dispatch(MyListActions.clearNewList()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(NewListSheetContainer);
