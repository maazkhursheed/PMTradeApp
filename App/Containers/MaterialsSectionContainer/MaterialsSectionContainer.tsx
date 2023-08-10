import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "native-base";
import React, { useReducer } from "react";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import FbIcon from "~root/Components/FbIcon";
import MainContainer from "~root/Components/MainContainer";
import MaterialDeleteSheet from "~root/Components/MaterialDeleteSheet";
import MaterialsDetailsListing from "~root/Components/MaterialsDetailsListing";
import MaterialsSectionHeader from "~root/Components/MaterialsSectionHeader/MaterialsSectionHeader";
import ScrollAnimatedHeaderComponent from "~root/Components/ScrollAnimatedHeaderComponent";
import SmallHeader from "~root/Components/SmallHeader";
import SOBQuotesFooter from "~root/Components/SOBQuotesFooter/SOBQuotesFooter";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { useKeyboard } from "~root/Lib/KeyboardHelper";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { safeRender, useAppender, withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { SectionSOBQuotesActions } from "~root/Reducers/MaterialSectionsSOBQuotesReducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import styles from "./MaterialsSectionContainerStyle";

export interface OwnProps {}

export interface State {
  scrollY: Animated.Value;
}

type Props = OwnProps;

const MaterialsSectionContainer: React.SFC<Props> = ({}: Props) => {
  const navigation = useNavigation();
  const routes = useRoute();
  const isMaterialsList = routes?.params?.isMaterialsList;

  const [scrollY] = React.useState(new Animated.Value(0));
  const [currentPage, setCurrentPage] = React.useState(0);

  const { quotesProducts, quoteDetails, sobMaterialListCount, pagination, screenName, sobId } = useSelector((state: RootState) => ({
    quotesProducts: state.quotes?.quotesProducts?.entries || [],
    quoteDetails: state.quotes?.quotesListDetails,
    sobMaterialListCount: state.sectionSOBQuotes?.SOBQuotesList?.pmQuoteSobList?.length,
    pagination: state.quotes?.quotesProducts?.pagination,
    screenName: state.sectionSOBQuotes?.productSOBScreenName,
    sobId: state.sectionSOBQuotes?.sobId,
  }));

  const [stateReducer, dispatchReducer] = useReducer(
    function (state: any, action: any) {
      if (action.type === "Delete") {
        return {
          iconStyle: undefined,
          heading: "Delete Stage of Build?",
          message: `This will permanently delete the Stage of Build "${screenName}" and all products added to it.`,
          onClose: () => setShowPopUp(false),
          iconName: "trash",
          button1Text: "Delete",
          button2Text: "Cancel",
          onButton1Press: () => {
            setShowPopUp(false);
            dispatch(
              SectionSOBQuotesActions.deleteSectionsSOBQuotes(
                { quoteId: quoteDetails?.code, sobPk: sobId },
                // @ts-ignore
                {
                  onSuccess: navigation.goBack,
                  onFailure: () => {
                    setShowPopUp(true);
                    dispatchReducer({ type: "Error" });
                  },
                },
              ),
            );
          },
          onButton2Press: () => setShowPopUp(false),
        };
      } else {
        return {
          iconStyle: { fontSize: 40 },
          heading: "Something went wrong",
          message: `We couldn’t delete the Stage of Build, please try again`,
          onClose: () => setShowPopUp(false),
          iconName: "delete-fail-large",
          button1Text: "Delete",
          button2Text: "Cancel",
          onButton1Press: () => {
            setShowPopUp(false);
            dispatch(
              SectionSOBQuotesActions.deleteSectionsSOBQuotes(
                { quoteId: quoteDetails?.code, sobPk: sobId },
                // @ts-ignore
                {
                  onSuccess: navigation.goBack,
                  onFailure: () => {
                    setShowPopUp(true);
                    dispatchReducer({ type: "Error" });
                  },
                },
              ),
            );
          },
          onButton2Press: () => setShowPopUp(false),
        };
      }
    },
    {
      iconStyle: undefined,
      heading: "",
      message: "",
      onClose: undefined,
      iconName: "",
      button1Text: "",
      button2Text: "",
      onButton1Press: undefined,
      onButton2Press: undefined,
    },
  );

  const { append } = useAppender();
  const [stateSheet, setStateSheet] = React.useState(SheetState.CLOSED);
  const [showPopUp, setShowPopUp] = React.useState(false);
  const isQuoteEditable = useQuoteStatusChecker();

  const showDeletePopUp = React.useCallback(() => {
    isQuoteEditable(() => {
      setShowPopUp(true);
      setStateSheet(SheetState.CLOSED);
      dispatchReducer({ type: "Delete" });
    });
  }, []);
  React.useEffect(() => {
    append(
      <MaterialDeleteSheet sheetState={stateSheet} showDeletePopUp={showDeletePopUp} sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)} />,
      "MaterialDeleteSheet",
      0,
    );
  }, [stateSheet]);
  const dispatch = useDispatch();
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  const { isKeyboardVisible } = useKeyboard();
  const callQuoteProductsAPI = React.useCallback(() => {
    if (pagination) {
      if (currentPage < pagination.totalPages) {
        dispatch(
          QuotesActions.requestQuoteProducts(
            {
              currentPage,
              quoteId: quoteDetails?.code,
              sobId,
            },
            {},
          ),
        );
        setCurrentPage(currentPage + 1);
      }
    } else {
      dispatch(
        QuotesActions.requestQuoteProducts(
          {
            currentPage,
            quoteId: quoteDetails?.code,
            sobId,
          },
          {},
        ),
      );
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, quoteDetails?.code, pagination]);

  React.useEffect(() => {
    callQuoteProductsAPI();
    return () => dispatch(QuotesActions.clearQuoteProductsList());
  }, []);

  return (
    <MainContainer style={styles.container}>
      <SmallHeader
        title={isMaterialsList ? "Materials" : screenName}
        navigation={navigation}
        actionItem={
          !isQuoteWonOrLost &&
          sobMaterialListCount > 1 && (
            <Button
              onPress={() => {
                setStateSheet(SheetState.OPENED);
              }}
              transparent={true}
              style={styles.rightItemBtn}
            >
              <FbIcon style={styles.icon} name={"ic_more"} />
            </Button>
          )
        }
      />

      <CustomAlert
        heading={stateReducer.heading}
        msg={stateReducer.message}
        visible={showPopUp}
        onClose={stateReducer.onClose}
        iconName={stateReducer.iconName}
        button1Text={stateReducer.button1Text}
        button2Text={stateReducer.button2Text}
        onButton1Press={stateReducer.onButton1Press}
        onButton2Press={stateReducer.onButton2Press}
      />

      {!isQuoteWonOrLost && (
        <ScrollAnimatedHeaderComponent scrollY={scrollY}>
          <MaterialsSectionHeader numberOfProducts={quotesProducts.length} />
        </ScrollAnimatedHeaderComponent>
      )}
      <MaterialsDetailsListing data={quotesProducts} scrollY={scrollY} onEndReached={callQuoteProductsAPI} isMaterialsList={isMaterialsList} />
      {!isKeyboardVisible && <SOBQuotesFooter />}
    </MainContainer>
  );
};

export default withAppender(safeRender(MaterialsSectionContainer, navigationalScreens.MaterialsSectionScreen));
