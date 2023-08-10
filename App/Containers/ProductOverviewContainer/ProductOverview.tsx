import R from "ramda";
import * as React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import BulletTextComponent from "~root/Components/BulletTextComponent";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { safeRender } from "~root/Provider/Appender";
import styles from "./ProductOverviewStyle";

/**
 * The properties passed to the component
 */
export interface OwnProps {}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {}

/**
 * The properties mapped from the global state
 */
export interface StateProps {}

/**
 * The local state
 */
export interface State {}

type Props = StateProps & DispatchProps & OwnProps;

class ProductOverview extends React.Component<Props, State> {
  public back = () => {
    this.props.navigation.pop();
  };

  public renderFeatureList = (data: any) => {
    const feature = R.path(["item", "featureValues", "0", "value"])(data);
    return <BulletTextComponent text={feature} textStyle={styles.bulletText} />;
  };

  public render() {
    const data = this.props.route.params.item;
    const features = R.compose(R.propOr([], "features"), R.find(R.propEq("code", "WebFeature")), R.propOr([], "classifications"))(data);
    const description = R.pathOr("", ["description"])(data);
    return (
      <MainContainer>
        <SmallHeader navigation={this.props.navigation} title={"Overview"} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.titleView}>
            <Text {...accessibility("productOverviewDescriptionLabel")} style={styles.titleText}>
              Description
            </Text>
          </View>

          <View {...accessibility("productOverviewDescription")} style={styles.bulletTextContainer}>
            <BulletTextComponent text={"SKU: " + R.path(["code"])(data)} textStyle={[styles.bulletText, styles.bulletComponentStyle]} />
            {!!description.length && <BulletTextComponent text={description} textStyle={styles.bulletText} />}
          </View>
          <View style={[styles.featureView, styles.titleView]}>
            <Text {...accessibility("productOverviewFeature")} style={styles.titleText}>
              Features
            </Text>
          </View>

          <FlatList data={features} renderItem={this.renderFeatureList} style={styles.listStyle} {...accessibility("productOverviewFeatureList")} />
        </ScrollView>
      </MainContainer>
    );
  }
}

export default safeRender(ProductOverview, navigationalScreens.ProductOverviewScreen);
