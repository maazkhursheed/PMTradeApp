import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RelatedProductListItem from "~root/Components/RelatedProductListItem";
import RelatedProductBlack from "~root/Images/relatedProductBlack/RelatedProductBlack.svg";
import { RELATED_PRODUCTS, RELATED_PRODUCTS_SUBTITLE } from "~root/Lib/AlertsHelper";
import { EnumRelatedAndAlternateReferenceType } from "~root/Lib/ProductHelper";
import { RootState } from "~root/Reducers";
import { ProductActions } from "../../Reducers/ProductReducers";
import style from "./RelatedProductsCarousalStyle";

interface OwnProps {
  onCickViewAll: () => void;
}

type Props = OwnProps;

const RelatedProductsCarousal: React.FC<Props> = ({ onCickViewAll }: Props) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { relatedProducts } = useSelector((state: RootState) => ({
    relatedProducts: state?.product?.substituteRelatedProducts || [],
  }));

  useEffect(() => {
    dispatch(
      ProductActions.requestRelatedAndSubstituteProducts(
        {
          productCode: route.params?.keyParamSKU ?? "",
          referenceType: EnumRelatedAndAlternateReferenceType.ACCESSORIES,
        },
        {},
      ),
    );
  }, []);

  const navigation = useNavigation();
  return (
    <View style={style.frequentlyOrderContainer}>
      <View style={style.tilteRow}>
        <RelatedProductBlack width="22" height="22" style={style.icon} />
        <Text style={style.title}>
          {RELATED_PRODUCTS} {`(${relatedProducts.length})`}
        </Text>
      </View>
      <Text style={style.subTitle}>{RELATED_PRODUCTS_SUBTITLE}</Text>
      <FlatList
        data={relatedProducts ? relatedProducts.slice(0, 4) : []}
        renderItem={({ item, index }) => {
          return (
            <RelatedProductListItem
              isMyList={false}
              relatedProducts={true}
              isLoading={false}
              item={item}
              index={index}
              productDescriptionProps={{
                numberOfLines: 3,
              }}
            />
          );
        }}
        horizontal={true}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => (item ? item.SKU + item.JobAccountId : index)}
        key={"frequentlyOrderedList"}
        contentContainerStyle={style.frequentlyOrderedList}
        ListFooterComponent={
          relatedProducts && relatedProducts.length > 4 ? (
            <TouchableOpacity
              style={style.viewAll}
              onPress={() => {
                onCickViewAll();
                navigation.navigate("RelatedProductsDetails", {
                  data: {
                    referenceType: EnumRelatedAndAlternateReferenceType.ACCESSORIES,
                    productCode: route?.params?.keyParamSKU ?? "",
                  },
                });
              }}
            >
              <Text style={style.viewAllText}>View all</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

export default RelatedProductsCarousal;
