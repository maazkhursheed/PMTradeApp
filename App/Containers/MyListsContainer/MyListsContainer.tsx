// Styles
import { firebase } from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { InteractionManager, Keyboard, Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BigBlueHeader from "~root/Components/BigBlueHeader/BigBlueHeader";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import LargeButton from "~root/Components/LargeButton";
import LoadingView from "~root/Components/LoadingView";
import NewListSheet, { NewListAction } from "~root/Components/NewListSheet/NewListSheet";
import AddIcon from "~root/Images/addIcon/AddIcon.svg";
import { NEWLIST } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion, navigationalScreens } from "~root/Lib/BranchHelper";
import { consolidateMyListImages, fetchMyListImages, getSelectedAccountId, getTruncatedListNames } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { AnimationProvider } from "~root/Provider/AnimationProvider";
import { safeRender } from "~root/Provider/Appender";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { RootState } from "../../Reducers";
import MyList from "./MyList";
import style from "./MyListsContainerStyle";

const MyListsContainer = () => {
  const [sheetState, setSheetState] = React.useState(SheetState.CLOSED);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { myLists, loading, selectedBranch, selectedAccountId, digitalId } = useSelector((state: RootState) => ({
    myLists: consolidateMyListImages([fetchMyListImages(state?.myList?.myLists)], state?.myList?.myLists),
    loading: state?.myList?.fetching,
    selectedBranch: state?.branchList?.selectedBranch,
    selectedAccountId: getSelectedAccountId(state),
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state?.login?.tempToken?.idToken)) as string,
  }));

  React.useEffect(() => {
    const _unsubscribeFocusListener = navigation.addListener("focus", () => {
      InteractionManager.runAfterInteractions(() => {
        loadAllList();
        callPixel();
      });
    });
    return () => {
      dispatch(MyListActions.clearNewList());
      _unsubscribeFocusListener();
    };
  }, [navigation]);

  const logMyListPageLoadEvent = React.useCallback((_myLists: any) => {
    const analyticsObj = {
      event: "my_list_overview",
      location: getBranchTownRegion(selectedBranch),
      device_type: Platform.OS,
      userId: digitalId,
      accountId: selectedAccountId,
      list_name: getTruncatedListNames(_myLists || []),
      list_count: _myLists ? _myLists.length : 0,
    };
    firebase.analytics().logEvent("my_list_overview", analyticsObj);
  }, []);

  const onAddList = React.useCallback(() => {
    setSheetState(SheetState.EXPANDED);
  }, []);

  const callPixel = () => {
    dispatch(PixelActions.pixelRequest("pageview", { title: "My Lists", ptype: "other" }));
  };

  const loadAllList = () => {
    dispatch(
      MyListActions.getAllList(undefined, {
        onSuccess: logMyListPageLoadEvent,
      }),
    );
  };

  return (
    <AnimationProvider>
      <BigBlueHeader title={"My Lists"} onPress={onAddList} />
      <LoadingView style={style.container} isLoading={loading} showOpacity={true}>
        <MyList myLists={myLists} />
      </LoadingView>
      <NewListSheet
        action={NewListAction.CreateNew}
        callback={(_sheetState: any) => {
          setSheetState(_sheetState);
        }}
        closeSheet={() => {
          setSheetState(SheetState.CLOSED);
          setTimeout(() => {
            if (Platform.OS === "android") {
              Keyboard.dismiss();
            }
          }, 50);
        }}
        sheetState={sheetState}
      />
      <View style={style.checkoutButtonContainer}>
        <LargeButton textStyle={style.largeButtonTextStyle} style={style.largeButtonStyle} onPress={onAddList} btnText={NEWLIST} SVGIcon={AddIcon} />
      </View>
    </AnimationProvider>
  );
};

export default safeRender(MyListsContainer, navigationalScreens.MyListsScreen);
