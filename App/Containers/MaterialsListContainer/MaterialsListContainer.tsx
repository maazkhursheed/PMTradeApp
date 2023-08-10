import { useNavigation } from "@react-navigation/native";
import R from "ramda";
import * as React from "react";
import { Animated, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "~root/Components/MainContainer";
import MaterialsDetailsListing from "~root/Components/MaterialsDetailsListing";
import SmallHeader from "~root/Components/SmallHeader";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { getSOBMaterialList } from "~root/Lib/StringHelper";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { SectionSOBQuotesActions } from "~root/Reducers/MaterialSectionsSOBQuotesReducers";
import { QuotesActions } from "~root/Reducers/QuotesReducer";
import { ApplicationStyles } from "~root/Themes";
import styles from "./MaterialsListContainerStyle";

const MaterialsListContainer: React.SFC<{}> = ({}) => {
  const navigation = useNavigation();
  const [scrollY] = React.useState(new Animated.Value(0));
  const [currentPage, setCurrentPage] = React.useState(0);

  const { quotesProducts, quoteDetails, pagination, sobId, SOBQuotesList } = useSelector((state: RootState) => ({
    quotesProducts: state.quotes?.quotesProducts?.entries || [],
    quoteDetails: state.quotes?.quotesListDetails,
    pagination: state.quotes?.quotesProducts?.pagination,
    sobId: state.sectionSOBQuotes?.sobId,
    SOBQuotesList:
      !state.sectionSOBQuotes?.SOBQuotesList || R.isEmpty(state.sectionSOBQuotes.SOBQuotesList) ? [] : getSOBMaterialList(state.sectionSOBQuotes.SOBQuotesList),
  }));
  const dispatch = useDispatch();

  const callQuoteProductsAPI = React.useCallback(() => {
    if (pagination) {
      if (currentPage < pagination.totalPages) {
        dispatch(QuotesActions.requestQuoteProducts({ currentPage: currentPage, quoteId: quoteDetails?.code, sobId }, {}));
        setCurrentPage(currentPage + 1);
      }
    } else {
      dispatch(QuotesActions.requestQuoteProducts({ currentPage: currentPage, quoteId: quoteDetails?.code, sobId }, {}));
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, quoteDetails?.code, pagination]);

  React.useEffect(() => {
    dispatch(SectionSOBQuotesActions.getSOBQuotes({ quoteId: quoteDetails?.code }));
    callQuoteProductsAPI();
  }, []);

  return (
    <>
      <MainContainer style={styles.container}>
        <SmallHeader
          title={"Materials list"}
          navigation={navigation}
          style={ApplicationStyles.noShadow}
          actionItem={
            <Text style={styles.rightItemBtn} onPress={() => navigation.navigate("MaterialsScreen")}>
              Add +
            </Text>
          }
        />

        <MaterialsDetailsListing data={SOBQuotesList} scrollY={scrollY} onEndReached={callQuoteProductsAPI} isMaterialsList={true} />
      </MainContainer>
    </>
  );
};

export default withAppender(safeRender(MaterialsListContainer, navigationalScreens.MaterialsListScreen));
