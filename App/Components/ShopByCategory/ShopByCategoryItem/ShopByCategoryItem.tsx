import { useNavigation } from "@react-navigation/native";
import R from "ramda";
import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import LoadingView from "~root/Components/LoadingView";
import AppConfig from "~root/Config/AppConfig";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { RootState } from "~root/Reducers";
import { SubCategoriesActions } from "~root/Reducers/SubCategoriesReducers";
import style from "./ShopByCategoryItemStyle";
interface OwnProps {
  item: any;
}

interface StateProps {
  loading: boolean;
}

interface DispatchProps {
  requestSubCategories: (catId: string, meta: IAlertCallbacks) => void;
}

type Props = DispatchProps & OwnProps & StateProps;

const ShopByCategoryItem: React.SFC<Props> = ({ item, requestSubCategories, loading }: Props) => {
  const imageURL = R.pathOr("", ["media", "widescreen", "url"], item);
  const navigation = useNavigation();

  return (
    <LoadingView isLoading={loading} style={style.container}>
      <TouchableOpacity
        onPress={() => {
          requestSubCategories(item.urlLink, {
            onSuccess: (data: any) => {
              const subCat = R.pathOr([], ["subcategories"], data);
              if (subCat.length > 0) {
                navigation.navigate("SuperCategory", {
                  subCategories: data,
                });
              } else {
                navigation.navigate("OrderProduct", {
                  screen: "MainPLP",
                  params: {
                    categoryId: `:Sort By:category:${data?.id}`,
                  },
                });
              }
            },
          });
        }}
        disabled={loading}
      >
        <FastImage source={{ uri: AppConfig.CCV2_ENDPOINT + imageURL }} style={style.imageStyle} resizeMode={FastImage.resizeMode.cover} />
        <Text style={style.textStyle} numberOfLines={3}>
          {item.categoryName || ""}
        </Text>
      </TouchableOpacity>
    </LoadingView>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  requestSubCategories: (catId: string, meta: IAlertCallbacks) => dispatch(SubCategoriesActions.requestSubCategories(catId, meta)),
});

const mapStateToProps = (state: RootState, ownProps: Props): StateProps => ({
  loading: state.subCategories.fetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopByCategoryItem);
