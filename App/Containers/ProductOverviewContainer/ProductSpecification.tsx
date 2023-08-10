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
export interface State {
  features: any[];
}

type Props = StateProps & DispatchProps & OwnProps;

class ProductSpecification extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
    };
  }

  public back = () => {
    this.props.navigation.pop();
  };

  public renderFeatureList = (data: any) => {
    const value = R.path(["item", "featureValues", "0", "value"])(data);
    const name = R.path(["item", "name"])(data);
    const symbol = R.pathOr("", ["item", "featureUnit", "symbol"], data);

    return <BulletTextComponent text={name + " : " + value + " " + symbol} textStyle={styles.bulletText} />;
  };

  public componentDidMount(): void {
    const features = R.compose(
      R.reject(R.propEq("name", "Warranty Duration")),
      R.propOr([], "features"),
      R.find(R.propEq("code", "Specification")),
      R.propOr([], "classifications"),
    )(this.props.route.params?.item ?? {});
    this.setState({ features });
  }

  public render() {
    const data = this.props.route.params?.item ?? {};
    const value = R.pathOr("", ["grossWeight", "0", "featureValues", "0", "value"])(data);
    const name = R.path(["grossWeight", "0", "name"])(data);
    const symbol = R.pathOr("", ["grossWeight", "0", "featureUnit", "symbol"], data);

    return (
      <MainContainer>
        <SmallHeader navigation={this.props.navigation} title={"Specifications"} />
        {this.state.features.length <= 0 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.noResult}>No information available.</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            <View>
              <FlatList
                data={this.state.features}
                renderItem={this.renderFeatureList}
                style={styles.listStyle}
                {...accessibility("productSpecificationList")}
              />
              {value !== "" && <BulletTextComponent text={name + " : " + value + " " + symbol} textStyle={styles.bulletText} style={styles.bulletTextStyle} />}
            </View>
          </ScrollView>
        )}
      </MainContainer>
    );
  }
}

export default safeRender(ProductSpecification, navigationalScreens.ProductSpecificationScreen);
