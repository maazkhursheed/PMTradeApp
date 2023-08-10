import R from "ramda";
import * as React from "react";
import { Linking, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

  public prependKey = (value, key, obj) => {
    const appendedValue = R.compose(R.last, R.split("/"))(value);
    const prefixes = {
      installationGuide: "Installation Guide",
      instructionManual: "Instruction Manual",
      specSheet: "Specification File",
      warrantySheet: "Warranty",
    };
    return prefixes[key] ? prefixes[key] : key;
  };

  public render() {
    const data = this.props.route.params.item;
    const items = R.compose(
      R.values,
      R.mapObjIndexed(
        R.applySpec({
          file: R.identity,
          fileName: this.prependKey,
        }),
      ),
      R.pick(["installationGuide", "instructionManual", "specSheet", "warrantySheet"]),
    )(data);
    return (
      <MainContainer>
        <SmallHeader navigation={this.props.navigation} title={"Supporting Documents"} />
        {items.length > 0 ? (
          <>
            <KeyboardAwareScrollView style={styles.scrollView}>
              <View {...accessibility("productSupportingDocument")} style={styles.itemsContainer}>
                {items.map((value, index) => {
                  return (
                    <DocumentItem
                      key={index}
                      item={value}
                      onPress={() => {
                        Linking.openURL(value.file);
                      }}
                    />
                  );
                })}
              </View>
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

export default safeRender(ProductOverview, navigationalScreens.ProductDocumentScreen);
