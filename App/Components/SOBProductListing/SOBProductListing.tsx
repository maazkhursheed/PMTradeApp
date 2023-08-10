import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import LoadingView from "~root/Components/LoadingView";
import SOBProductListItem from "~root/Components/SOBProductListItem/SOBProductListItem";
import { RootState } from "~root/Reducers";
import style from "./SOBProductListingStyles";

interface OwnProps {
  data: any[];
  onLoadMoreProducts: (pageNo: number) => void;
}

interface StateProps {
  isLoading: boolean;
  listTotalCount: number;
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const SOBProductListing: React.SFC<Props> = ({ data, isLoading, listTotalCount, onLoadMoreProducts }: Props) => {
  const [pageNo, setPageNo] = React.useState(2);
  const route = useRoute();

  return (
    <>
      <LoadingView isLoading={isLoading} hideViewOnLoading={false} style={style.loadingViewStyle}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={style.listHeaderContainer}>
            <Text style={style.listHeaderTitle}>Estimated Products </Text>
            <Text style={style.listHeaderItemCount}>{`(${listTotalCount} ${listTotalCount === 1 ? "item" : "items"})`}</Text>
          </View>
          {data.map((item, index) => {
            return <SOBProductListItem item={item} index={index} estimateNumber={route.params?.estimateItem?.estimateNumber} />;
          })}
          {listTotalCount > data.length && (
            <View>
              <Text style={style.productsCountFooter}>
                Showing {data?.length} of {listTotalCount} products
              </Text>
              <TouchableOpacity
                style={style.loadMoreProductsBtn}
                onPress={() => {
                  onLoadMoreProducts(pageNo);
                  setPageNo(pageNo + 1);
                }}
              >
                <Text style={style.loadMoreProductsBtnText}>Load more Products</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAwareScrollView>
      </LoadingView>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isLoading: state.estimates?.fetching,
  listTotalCount: state.estimates.estimatesListDetailsTotalCount,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SOBProductListing);
