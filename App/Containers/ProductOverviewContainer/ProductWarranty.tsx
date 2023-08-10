import R from "ramda";
import * as React from "react";
import { Linking, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BulletTextComponent from "~root/Components/BulletTextComponent";
import DocumentItem from "~root/Components/DocumentItem";
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
  constructor(props) {
    super(props);
    this.state = {};
  }

  public back = () => {
    this.props.navigation.pop();
  };

  public render() {
    const data = this.props.route.params.item;
    const warranty = R.compose(
      R.applySpec({
        fileName: R.always(R.compose(R.last, R.split("/"), R.propOr("", "warrantySheet"))(data)),
        file: R.always(R.prop("warrantySheet", data)),
        value: R.path(["featureValues", "0", "value"]),
        unit: R.path(["featureUnit", "name"]),
      }),
      R.find(R.propEq("name", "Warranty Duration")),
      R.propOr([], "features"),
      R.find(R.propEq("code", "Specification")),
      R.propOr([], "classifications"),
    )(data);
    return (
      <MainContainer>
        <SmallHeader navigation={this.props.navigation} title={"Warranty"} />
        {!!warranty.value ? (
          <>
            <KeyboardAwareScrollView style={styles.scrollView}>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>Description</Text>
              </View>

              <View {...accessibility("productWarrantyDescription")} style={styles.bulletTextContainer}>
                <BulletTextComponent text={warranty.value + " " + warranty.unit + " warranty"} textStyle={[styles.bulletText, styles.bulletComponentStyle]} />
              </View>
              {!!warranty.fileName && (
                <>
                  <View style={[styles.featureView, styles.titleView]}>
                    <Text {...accessibility("productSupportingDocument")} style={styles.titleText}>
                      Supporting document
                    </Text>
                  </View>

                  <DocumentItem item={{ fileName: "Warranty" }} onPress={() => Linking.openURL(warranty.file)} />
                </>
              )}
            </KeyboardAwareScrollView>
          </>
        ) : (
          <View style={styles.noInfoContainer}>
            <Text style={styles.noInfoText}>No information available.</Text>
          </View>
        )}
      </MainContainer>
    );
  }
}

export default safeRender(ProductOverview, navigationalScreens.ProductWarrantyScreen);
