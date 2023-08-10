import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "~root/Components/LoadingView";
import { EnumRelatedAndAlternateReferenceType } from "~root/Lib/ProductHelper";
import { ProductActions } from "~root/Reducers/ProductReducers";
import RelatedProductListingPage from "../../Components/RelatedProductListingPage/RelatedProductListingPage";
import SmallHeaderNew from "../../Components/SmallHeaderNew";
import { ALTERNATIVE_PRODUCTS_SUBTITLE, RELATED_PRODUCTS_SUBTITLE } from "../../Lib/AlertsHelper";
import { accessibility } from "../../Lib/DataHelper";
import { RootState } from "../../Reducers";
import styles from "./RelatedProductsDetailsContainerStyle";

const RelatedProductsDetailsContainer: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productCode, referenceType, fromQuotes, existingEntryNumber, fromCart, existingQuoteId, existingCartItem, onSwapSuccess } = route?.params?.data;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (referenceType && productCode) {
      dispatch(
        ProductActions.requestRelatedAndSubstituteProducts(
          {
            productCode,
            referenceType,
          },
          {},
        ),
      );
    }
  }, [productCode, referenceType]);

  const { items, isLoading, swapLoading } = useSelector((state: RootState) => ({
    items:
      referenceType === EnumRelatedAndAlternateReferenceType.SIMILAR ? state?.product?.substituteAlternateProducts : state?.product?.substituteRelatedProducts,
    isLoading: state?.product?.fetching,
    swapLoading: state?.cart?.fetching || state?.quotes.fetching,
  }));

  return (
    <View style={styles.loadingView}>
      <SmallHeaderNew
        navigation={navigation}
        title={`${referenceType === EnumRelatedAndAlternateReferenceType.ACCESSORIES ? "Related Products" : "Alternative Products"} ${
          items?.length && !isLoading ? "(" + items?.length + ")" : ""
        }`}
        subTitle={referenceType === EnumRelatedAndAlternateReferenceType.ACCESSORIES ? RELATED_PRODUCTS_SUBTITLE : ALTERNATIVE_PRODUCTS_SUBTITLE}
      />
      <LoadingView hideViewOnLoading={isLoading} isLoading={isLoading || swapLoading} style={styles.loadingView}>
        <KeyboardAwareFlatList
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.02}
          numColumns={1}
          data={items || []}
          renderItem={({ item }) => (
            <RelatedProductListingPage
              existingEntryNumber={existingEntryNumber}
              existingQuoteId={existingQuoteId}
              item={item}
              fromQuotes={fromQuotes}
              referenceType={referenceType}
              fromCart={fromCart}
              existingCartItem={existingCartItem}
              onSwapSuccess={onSwapSuccess}
            />
          )}
          bounces={false}
          {...accessibility("relatedProductsFlatList")}
          style={styles.flatListStyle}
        />
      </LoadingView>
    </View>
  );
};
export default RelatedProductsDetailsContainer;
