import { Button } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { Animated, Keyboard, Platform, View } from "react-native";
import { connect } from "react-redux";
import AccountBranchSelector from "~root/Components/AccountBranchSelector/AccountBranchSelector";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import DeleteMylistSheet from "~root/Components/DeleteMylistSheet/DeleteMylistSheet";
import FbIcon from "~root/Components/FbIcon";
import ScrollAnimatedHeaderComponent from "~root/Components/ScrollAnimatedHeaderComponent";
import SmallHeader from "~root/Components/SmallHeader";
import { IAlertCallbacks, SEARCHLIST } from "~root/Lib/AlertsHelper";
import { useTabBar } from "~root/Lib/QuoteHelper";
import { useAppender } from "~root/Provider/Appender";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { ApplicationStyles } from "~root/Themes";
import GenericSearchFieldComponent from "../GenericSearchFieldComponent";
import NewListSheet, { NewListAction } from "../NewListSheet/NewListSheet";
import styles from "./MyListDetailHeaderStyle";

interface OwnProps {
  navigation: any;
  route: any;
  scrollY: Animated.Value;
}

interface DispatchProps {
  removeList: (listName: string, callback: IAlertCallbacks) => void;
  logPixelEvent: (event: string, params: any) => void;
  requestList: () => void;
  requestListDetail: (name: string, index: number) => void;
}

type Props = OwnProps & DispatchProps;
const MyListDetailHeader: React.SFC<Props> = ({ navigation, route, removeList, scrollY, logPixelEvent, requestList, requestListDetail }: Props) => {
  const item = route.params?.item ?? {};
  const callPixel = () => {
    logPixelEvent("pageview", {
      title: item?.listName || "My List",
      ptype: "other",
    });
  };

  const [headerHeight, setHeaderHeight] = React.useState(0);
  const { dispatchAlert } = useCustomAlert();
  const [sheetState, setSheetState] = React.useState(SheetState.CLOSED);
  const { append } = useAppender();
  const [newListSheet, setNewListSheet] = React.useState(SheetState.CLOSED);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", callPixel);
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    append(
      <NewListSheet
        closeSheet={() => {
          setNewListSheet(SheetState.CLOSED);
          Platform.select({ android: Keyboard.dismiss() });
        }}
        sheetState={newListSheet}
        action={NewListAction.Rename}
        meta={item?.listName}
        onSuccess={name => {
          navigation.replace("MyListDetail", {
            item: R.assoc("listName", name, route.params?.item ?? {}),
            index: route.params?.index ?? 0,
          });
          requestListDetail(name, route.params?.index ?? 0);
          requestList();
        }}
      />,
      "newListSheet",
      1,
    );
  }, [newListSheet, item?.listName]);

  React.useEffect(() => {
    if (sheetState === SheetState.OPENED) useTabBar(navigation, "none", 1);
    else useTabBar(navigation, "flex", 1);
  }, [sheetState]);

  React.useEffect(() => {
    append(
      <DeleteMylistSheet
        renameListTapped={renameSheetClick}
        navigation={navigation}
        sheetState={sheetState}
        sheetCloseTapped={() => setSheetState(SheetState.CLOSED)}
        deleteTapped={deleteSheetClick}
      />,
      "DeleteMylistSheet",
      0,
    );
  }, [sheetState]);

  const renameSheetClick = () => {
    setSheetState(SheetState.CLOSED);
    setTimeout(() => {
      setNewListSheet(SheetState.EXPANDED);
    }, 50);
  };

  const deleteSheetClick = React.useCallback(() => {
    setTimeout(() => {
      dispatchAlert?.({
        visible: true,
        heading: "Delete My List",
        msg: "It will permanently delete the entire My List folder.",
        button1Text: "Confirm",
        onButton1Press: () => {
          dispatchAlert?.({ visible: false });
          removeList(item?.listName, {
            onSuccess: () => navigation.goBack(),
          });
        },
        button2Text: "Cancel",
        onButton2Press: () => dispatchAlert?.({ visible: false }),
      });
    }, 50);
  }, []);

  const openSheet = React.useCallback(() => setSheetState(SheetState.OPENED), []);

  return (
    <>
      <View style={styles.headerContainer} onLayout={event => setHeaderHeight(event.nativeEvent.layout.height)}>
        <SmallHeader
          navigation={navigation}
          style={[ApplicationStyles.noShadow]}
          actionItem={
            <Button
              transparent={true}
              style={styles.rightItemBtn}
              onPress={() => {
                openSheet();
              }}
            >
              <FbIcon style={styles.icon} name={"ic_more"} />
            </Button>
          }
          title={item?.listName || ""}
        />
      </View>
      <ScrollAnimatedHeaderComponent scrollY={scrollY} style={{ marginTop: headerHeight }}>
        <View style={styles.mainShadowContainer}>
          <GenericSearchFieldComponent
            onPress={() =>
              navigation.push("MyListSearchSuggestion", {
                item,
              })
            }
            style={[styles.searchField]}
            placeHolderText={SEARCHLIST}
            hasBarcodeIcon={true}
          />
          <AccountBranchSelector />
        </View>
      </ScrollAnimatedHeaderComponent>
    </>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  removeList: (listName, callback) => dispatch(MyListActions.removeList(listName, callback)),
  logPixelEvent: (event, params) => dispatch(PixelActions.pixelRequest(event, params)),
  requestListDetail: name => dispatch(MyListActions.requestMyList(name)),
  requestList: () => dispatch(MyListActions.getAllList(undefined, {})),
});

export default connect(null, mapDispatchToProps, null, {
  forwardRef: true,
})(MyListDetailHeader);
