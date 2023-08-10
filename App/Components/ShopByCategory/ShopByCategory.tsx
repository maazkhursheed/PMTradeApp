import * as React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPMCategoriesTileSlot, getPMMoreCategoriesTileSlot } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import LoadingView from "../LoadingView";
import ShopByCategoryItem from "./ShopByCategoryItem/ShopByCategoryItem";
import style from "./ShopByCategoryStyle";

interface StateProps {
  data?: any;
  loading?: boolean;
}

type Props = StateProps;

const ShopByCategory: React.SFC<Props> = ({ data, loading }: Props) => {
  const [isExpanded, setExpanded] = React.useState(false);
  let categories = isExpanded ? [...getPMCategoriesTileSlot(data), ...getPMMoreCategoriesTileSlot(data)] : getPMCategoriesTileSlot(data);
  return (
    <LoadingView style={style.container} hideViewOnLoading={true} isLoading={loading}>
      <Text style={style.heading}>Shop by category</Text>
      <FlatList
        contentContainerStyle={style.listContainerStyle}
        data={categories}
        numColumns={2}
        renderItem={({ item }) => {
          return <ShopByCategoryItem item={item} />;
        }}
      />
      <TouchableOpacity onPress={() => setExpanded(!isExpanded)}>
        <Text style={style.viewMoreStyle}>{isExpanded ? "View less categories" : "View more categories"}</Text>
      </TouchableOpacity>
    </LoadingView>
  );
};

const mapStateToProps = (state: RootState, ownProps: Props): StateProps => ({
  data: state.marketingTile?.data,
  loading: state.marketingTile?.fetching,
});

export default connect(mapStateToProps)(ShopByCategory);
