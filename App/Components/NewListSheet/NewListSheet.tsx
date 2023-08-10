import { firebase } from "@react-native-firebase/analytics";
import { Button } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { Keyboard, Platform, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { BranchResponse, getBranchTownRegion } from "~root/Lib/BranchHelper";
import { invokeOnPath } from "~root/Lib/CommonHelper";
import { accessibility, addOcclusionForTextFields, getSelectedAccountId, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { RootState } from "~root/Reducers";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";
import styles from "./NewListSheetStyle";

export enum NewListAction {
  CreateNew,
  Rename,
  AddItemToNewList,
}

interface OwnProps {
  sheetState: SheetState;
  closeSheet: any;
  action?: NewListAction;
  meta?: any; // Extra information about action, If its Add item then item information or old list name for renaming
  callback?: (sheetState: SheetState) => void;
  onSuccess?: (name: string) => void;
}

interface DispatchProps {
  newListAdded?: (name: string) => void;
  createList?: (name: string, callback: IAlertCallbacks) => void;
  createListWithItem?: (name: string, item: any, callback: IAlertCallbacks) => void;
  renameList?: (listName: string, newListName: string, callback: IAlertCallbacks) => void;
}

interface StateProps {
  listNames: string[];
  loading: boolean;
  selectedBranch: BranchResponse;
  selectedAccountId: string;
  digitalId: any;
}

type Props = OwnProps & StateProps & DispatchProps;

const NewListSheet: React.SFC<Props> = ({
  sheetState,
  newListAdded,
  onSuccess,
  loading,
  closeSheet,
  meta,
  createListWithItem,
  createList,
  renameList,
  action = NewListAction.CreateNew,
  listNames,
  callback,
  selectedBranch,
  selectedAccountId,
  digitalId,
}: Props) => {
  const [value, setValue] = React.useState("");
  const [exists, setExist] = React.useState(false);
  const createDisable = value.length === 0 || exists;
  const inputRef = React.useRef(null);

  if (sheetState === SheetState.EXPANDED && inputRef) {
    invokeOnPath(["current", "focus"], inputRef);
  }

  const logCreateNewListEvent = React.useCallback(
    step => {
      const analyticsObj = {
        event: "create_item_list",
        location: getBranchTownRegion(selectedBranch),
        device_type: Platform.OS,
        userId: digitalId,
        accountId: selectedAccountId,
        step,
      };
      firebase.analytics().logEvent("create_item_list", analyticsObj);
    },
    [selectedBranch, selectedAccountId, digitalId],
  );

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName(action === NewListAction.Rename ? "Rename My List Screen" : "Create new My List Screen");
      if (action === NewListAction.CreateNew || action === NewListAction.AddItemToNewList) {
        logCreateNewListEvent(1);
      }
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const doAction = () => {
    if (createDisable) {
      return;
    }
    Keyboard.dismiss();
    switch (action) {
      case NewListAction.AddItemToNewList:
        if (createListWithItem && meta && typeof meta === "string") {
          createListWithItem(value, meta, {
            onSuccess: () => {
              logCreateNewListEvent(2);
              onSuccess?.(value);
              setTimeout(() => {
                newListAdded(value);
              }, 500);
            },
          });
        } else {
          throw new Error("Please pass item sku in meta");
        }
        break;
      case NewListAction.Rename:
        if (renameList && meta && typeof meta === "string") {
          renameList(meta, value, {
            onSuccess: () => {
              onSuccess?.(value);
              setTimeout(() => {
                newListAdded(value);
              }, 500);
            },
          });
        } else {
          throw new Error("Please pass old list name in meta");
        }
        break;
      case NewListAction.CreateNew:
        if (createList) {
          createList(value, {
            onSuccess: () => {
              logCreateNewListEvent(2);
              Toast.show({
                text1: `"${value}" list is created successfully`,
                topOffset: Platform.OS === "ios" ? 50 : 30,
                visibilityTime: 3000,
              });
              onSuccess?.(value);
              setTimeout(() => {
                newListAdded(value);
              }, 500);
            },
          });
        }
        break;
      default:
        break;
    }
    setValue("");
    setExist(false);
    closeSheet();
    removeOcclusionFromTextFields();
  };

  return (
    <BottomSheet
      content={
        <LoadingView style={styles.loadingView} isLoading={loading}>
          <STCHeader
            title={action === NewListAction.Rename ? "Rename My List" : "Create new My List"}
            titleStyle={styles.headerTitleStyle}
            style={{
              backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
            }}
            leftItem={
              <Button
                transparent={true}
                onPress={() => {
                  setValue("");
                  setExist(false);
                  Keyboard.dismiss();
                  closeSheet();
                  removeOcclusionFromTextFields();
                }}
                style={styles.leftItemBtnStyle}
                {...accessibility("leftItemBtn")}
              >
                <Text style={styles.cancelBtnTextStyle}>Cancel</Text>
              </Button>
            }
            rightItem={
              <Button
                disabled={createDisable}
                transparent={true}
                onPress={() => {
                  doAction();
                }}
                style={styles.rightItemBtnStyle}
                {...accessibility("rightItemBtn")}
              >
                <Text
                  style={{
                    ...Fonts.style.openSans16,
                    color: createDisable ? Colors.darkGrey : Colors.lightBlue,
                  }}
                >
                  {action === NewListAction.Rename ? "Rename" : "Create"}
                </Text>
              </Button>
            }
          />
          <SearchBar
            ref={inputRef}
            searchIcon={<View />}
            round={true}
            clearIcon={
              value.length > 0 ? (
                <CustomIcon
                  style={styles.closeIcon}
                  onPress={() => {
                    setExist(false);
                    setValue("");
                  }}
                  name={"clear"}
                  {...accessibility("clearIcon")}
                />
              ) : (
                <View />
              )
            }
            placeholderTextColor={colors.darkGrey}
            containerStyle={styles.searchContainerStyle}
            cancelButtonTitle={"Cancel"}
            onChangeText={text => {
              setValue(text);
              if (R.includes(text.toLowerCase(), listNames)) {
                setExist(true);
              } else {
                setExist(false);
              }
            }}
            onSubmitEditing={doAction}
            placeholder={"Name the new my list"}
            label={undefined}
            autoFocus={false}
            value={value}
            autoCorrect={false}
            selectionColor={Colors.lightBlue}
            isCustom={true}
            returnKeyType={"go"}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <View style={styles.warningContainer}>
            {exists && <Text style={styles.warningText}>{`This "${value}" list already exists, try a different name`}</Text>}
          </View>
        </LoadingView>
      }
      sheetState={sheetState}
    />
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  newListAdded: name => dispatch(MyListActions.newListAdded(name)),
  createList: (name, callback) => dispatch(MyListActions.addList(name, callback)),
  createListWithItem: (name, item, callback) =>
    dispatch(
      MyListActions.addItemToNewList(
        {
          listName: name,
          skuList: [item],
        },
        callback,
      ),
    ),
  renameList: (listName, newListName, callback) =>
    dispatch(
      MyListActions.renameList(
        {
          listName,
          newListName,
        },
        callback,
      ),
    ),
});

const mapStateToProps = (state: RootState): StateProps => ({
  listNames: R.map(R.compose(R.toLower, R.propOr("", "listName")))(state.myList.myLists || []),
  loading: state.myList.fetching,
  selectedBranch: state.branchList.selectedBranch,
  selectedAccountId: getSelectedAccountId(state),
  digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewListSheet);
