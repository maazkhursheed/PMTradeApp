import { firebase } from "@react-native-firebase/analytics";
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, InteractionManager, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddNewJobSwitchSheet from "~root/Components/AddNewJobSheet/AddNewJobSwitchSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import QuotesListItem from "~root/Components/QuotesListItem";
import QuoteWonOrLostView from "~root/Components/QuoteWonOrLostView";
import AppConfig from "~root/Config/AppConfig";
import { apiErrorBtnTxt, apiErrorMsg, cancelBtnTxt, showAlertToClearCart, titleErr } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { accessibility, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { EnumQuoteType } from "~root/Lib/QuoteHelper";
import { isWonOrLostQuote, quotesLostText, quotesWonText } from "~root/Lib/StringHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { JobAccountsActions } from "~root/Reducers/JobAccountsReducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import colors from "~root/Themes/Colors";
import CustomIcon from "../CustomIcon";
import LoadingView from "../LoadingView";
import style from "./QuotesListComponentStyle";
interface OwnProps {
  selectedQuote: EnumQuoteType;
  setSelectedQuoteToSend: (value: EnumQuoteType) => void;
}

type Props = OwnProps;

const QuotesListComponent: React.FC<Props> = ({ selectedQuote, setSelectedQuoteToSend }: Props) => {
  const { accountId, isLoading, data, cartCount, cart, quotesDetails, userId, selectedBranch } = useSelector((state: RootState) => ({
    isLoading: state?.quotes?.fetching || state?.cart?.fetching,
    data: state?.quotes.quotesList?.quoteList || [],
    cartCount: state?.cart?.cartEntriesCount,
    cart: state?.cart?.userCartDetail,
    quotesDetails: state?.quotes?.quotesListDetails,
    selectedBranch: state?.branchList?.selectedBranch,
    userId: state?.login?.tempToken?.idToken,
    accountId: getSelectedAccountId(state),
  }));
  const isFocused = useIsFocused();
  const { dispatchAlert } = useCustomAlert();
  const [didCallAPI, setDidCallAPI] = React.useState(false);
  const [selectedQuoteType, setSelectedQuoteType] = useState(selectedQuote);
  const [stateSheet, setStateSheet] = useState(SheetState.CLOSED);
  const dispatch = useDispatch();
  const { append } = useAppender();

  useEffect(() => {
    if (selectedQuote) {
      setSelectedQuoteType(selectedQuote);
    }
  }, [selectedQuote]);

  const getQuoteList = React.useCallback(() => {
    dispatch(
      QuotesActions.requestQuotesList(
        { pageNo: 1, numberOfLines: AppConfig.NUMBER_OF_LINES },
        {
          onSuccess: () => setDidCallAPI(true),
          onFailure: () => {
            setDidCallAPI(true);
            dispatchAlert?.({
              visible: true,
              heading: titleErr,
              msg: apiErrorMsg,
              button1Text: apiErrorBtnTxt,
              onButton1Press: () => {
                dispatchAlert?.({ visible: false });
                getQuoteList();
              },
              button2Text: cancelBtnTxt,
              onButton2Press: () => dispatchAlert?.({ visible: false }),
            });
          },
        },
      ),
    );
  }, [cart?.lastSelectedTradeAccount, cart?.lastSelectedJobAccount]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(getQuoteList);
  }, [cart?.lastSelectedTradeAccount, cart?.lastSelectedJobAccount, isFocused]);
  useEffect(() => {
    append(<AddNewJobSwitchSheet sheetState={stateSheet} sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)} />, "AddNewJobSwitchSheet", 0);
  }, [stateSheet]);

  const onViewAllQuotesPress = useCallback(() => {
    const unselectAndClearCart = () => {
      dispatch(JobAccountsActions.selectJobAccount(undefined));
      setTimeout(() => dispatch(ProductActions.clearCart()));
    };
    if (cartCount > 0) {
      showAlertToClearCart(unselectAndClearCart, false, dispatchAlert);
    } else {
      unselectAndClearCart();
    }
  }, [cartCount]);

  const getButtonStyle = useCallback(
    (quoteType: EnumQuoteType) => {
      return quoteType === selectedQuoteType ? style.btnViewSelected : style.btnView;
    },
    [selectedQuoteType],
  );

  const getButtonTextStyle = useCallback(
    (quoteType: EnumQuoteType) => {
      return quoteType === selectedQuoteType ? style.btnTextSelected : style.btnText;
    },
    [selectedQuoteType],
  );

  const refPager = React.useRef<FlatList>(null);
  const scrollView = React.useRef<ScrollView>(null);

  const inProgressClick = useCallback(() => {
    setSelectedQuoteType(EnumQuoteType.InProgress);
    setSelectedQuoteToSend(EnumQuoteType.InProgress);
    refPager.current?.scrollToIndex({ animated: false, index: 0 });
    scrollView?.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [data.length, refPager, scrollView]);

  const pendingClick = useCallback(() => {
    setSelectedQuoteType(EnumQuoteType.Pending);
    setSelectedQuoteToSend(EnumQuoteType.Pending);
    refPager.current?.scrollToIndex({ animated: false, index: 1 });
  }, [data.length, refPager]);

  const wonClick = useCallback(() => {
    setSelectedQuoteType(EnumQuoteType.Won);
    setSelectedQuoteToSend(EnumQuoteType.Won);
    refPager.current?.scrollToIndex({ animated: false, index: 2 });
  }, [data.length, refPager]);

  const lostClick = useCallback(() => {
    setSelectedQuoteType(EnumQuoteType.Lost);
    setSelectedQuoteToSend(EnumQuoteType.Lost);
    refPager.current?.scrollToIndex({ animated: false, index: 3 });
    scrollView?.current?.scrollToEnd({ animated: true });
  }, [data.length, refPager, scrollView]);

  const pageScroll = useCallback(
    (pos: number) => {
      if (pos === 0 && selectedQuoteType !== EnumQuoteType.InProgress) {
        setSelectedQuoteType(EnumQuoteType.InProgress);
        setSelectedQuoteToSend(EnumQuoteType.InProgress);
        scrollView?.current?.scrollTo({ x: 0, y: 0, animated: true });
      } else if (pos === 1 && selectedQuoteType !== EnumQuoteType.Pending) {
        setSelectedQuoteType(EnumQuoteType.Pending);
        setSelectedQuoteToSend(EnumQuoteType.Pending);
      } else if (pos === 2 && selectedQuoteType !== EnumQuoteType.Won) {
        setSelectedQuoteType(EnumQuoteType.Won);
        setSelectedQuoteToSend(EnumQuoteType.Won);
      } else if (pos === 3 && selectedQuoteType !== EnumQuoteType.Lost) {
        setSelectedQuoteType(EnumQuoteType.Lost);
        setSelectedQuoteToSend(EnumQuoteType.Lost);
        scrollView?.current?.scrollToEnd({ animated: true });
      }
    },
    [selectedQuoteType],
  );

  const [allLists, setAllLists] = useState<any[]>([]);

  const sendQuoteAnalytics = React.useCallback((event: any) => {
    const params = {
      event,
      step: 1,
      device_type: Platform.OS,
      step_label: "Quote Create Start",
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId,
      location: getBranchTownRegion(selectedBranch),
    };

    firebase.analytics().logEvent(event, params);
  }, []);

  useEffect(() => {
    if (data && data.length) {
      if (selectedQuote === EnumQuoteType.InProgress) {
        inProgressClick();
      } else if (selectedQuote === EnumQuoteType.Won) {
        wonClick();
      } else if (selectedQuote === EnumQuoteType.Pending) {
        pendingClick();
      } else if (selectedQuote === EnumQuoteType.Lost) {
        lostClick();
      }
      setAllLists([
        data.filter((value: any) => value.status === EnumQuoteType.NotSent || value.status === EnumQuoteType.InProgress),
        data.filter((value: any) => value.status === EnumQuoteType.Pending),
        data.filter((value: any) => value.status === EnumQuoteType.Won || value.status === EnumQuoteType.Integrated),
        data.filter((value: any) => value.status === EnumQuoteType.Lost),
      ]);
    } else if (allLists.length) {
      setAllLists([]);
    }
  }, [data, data.length, quotesDetails]);

  const setMessage = useCallback((val: EnumQuoteType) => {
    switch (val) {
      case EnumQuoteType.InProgress:
        return "No In Progress jobs";
      case EnumQuoteType.Pending:
        return "No Pending jobs";
      case EnumQuoteType.Won:
        return "No Won jobs";
      case EnumQuoteType.Lost:
        return "No Lost jobs";
    }
  }, []);

  const onScrollEnd = useCallback(
    e => {
      const contentOffset = e.nativeEvent.contentOffset;
      const viewSize = e.nativeEvent.layoutMeasurement;

      // Divide the horizontal offset by the width of the view to see which page is visible
      const pageNum = Math.floor(contentOffset.x / viewSize.width);

      pageScroll(pageNum);
    },
    [pageScroll],
  );

  return (
    <>
      <LoadingView isLoading={isLoading} style={style.loadingView}>
        <View style={[style.statusBtnView]}>
          {allLists[0]?.length !== undefined && (
            <ScrollView ref={scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={[getButtonStyle(EnumQuoteType.InProgress), style.marginLeft]} onPress={inProgressClick}>
                <Text style={getButtonTextStyle(EnumQuoteType.InProgress)}>{"In Progress (" + allLists[0]?.length + ")"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={getButtonStyle(EnumQuoteType.Pending)} onPress={pendingClick}>
                <Text style={getButtonTextStyle(EnumQuoteType.Pending)}>{"Pending (" + allLists[1]?.length + ")"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={getButtonStyle(EnumQuoteType.Won)} onPress={wonClick}>
                <Text style={getButtonTextStyle(EnumQuoteType.Won)}>{"Won (" + allLists[2]?.length + ")"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={getButtonStyle(EnumQuoteType.Lost)} onPress={lostClick}>
                <Text style={getButtonTextStyle(EnumQuoteType.Lost)}>{"Lost (" + allLists[3]?.length + ")"}</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
        <FlatList
          ref={refPager}
          onScrollToIndexFailed={console.log}
          onScroll={onScrollEnd}
          data={[0, 1, 2, 3]}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          keyExtractor={item => item}
          renderItem={info => (
            <FlatList<any>
              key={info.item}
              {...accessibility("quotesList")}
              scrollEventThrottle={16}
              contentContainerStyle={style.animatedFLPB}
              bounces={false}
              keyExtractor={item => item.code}
              data={didCallAPI ? allLists[info.item] : []}
              ListHeaderComponent={() => (
                <>
                  <QuoteWonOrLostView isLoading={isLoading || !didCallAPI} isWonOrLost={isWonOrLostQuote(selectedQuoteType)}>
                    <View style={style.infoTextContainer}>
                      <CustomIcon name={"info"} style={style.infoIcon} />
                      <Text style={style.infoText}>
                        {(selectedQuoteType.includes(EnumQuoteType.Won) && quotesWonText) || (selectedQuoteType.includes(EnumQuoteType.Lost) && quotesLostText)}
                      </Text>
                    </View>
                  </QuoteWonOrLostView>
                </>
              )}
              ListEmptyComponent={() => (
                <View style={style.messageView}>{didCallAPI && <Text style={style.messageStyle}>{setMessage(selectedQuoteType)}</Text>}</View>
              )}
              renderItem={({ item }: any) => <QuotesListItem item={item} key={item.code} quoteType={selectedQuoteType} />}
            />
          )}
        />
        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={[style.buttonStyle]}
            onPress={() => {
              sendQuoteAnalytics("quote_create");
              setStateSheet(SheetState.EXPANDED);
            }}
            {...accessibility("AddNewJobButton")}
          >
            <CustomIcon name={"Tag-icon"} size={12} style={{ color: colors.white }} />
            <Text style={style.buttonText}>Add new job</Text>
          </TouchableOpacity>
          {cart?.lastSelectedTradeAccount !== cart?.lastSelectedJobAccount && (
            <TouchableOpacity style={[style.buttonStyle, { marginLeft: 8 }]} onPress={onViewAllQuotesPress}>
              <CustomIcon name={"Tag-icon"} size={12} style={{ color: colors.white }} />
              <Text style={style.buttonText}>View all quotes</Text>
            </TouchableOpacity>
          )}
        </View>
      </LoadingView>
    </>
  );
};

export default QuotesListComponent;
