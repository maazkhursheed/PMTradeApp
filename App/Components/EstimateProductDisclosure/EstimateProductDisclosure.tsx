import * as React from "react";
import { Linking, Text, View, ViewStyle } from "react-native";
import { connect } from "react-redux";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import colors from "~root/Themes/Colors";
import styles from "./EstimateProductDisclosureStyle";
interface OwnProps {
  style?: ViewStyle;
  disClosureText: string;
}
export interface StateProps {
  selectedBranch: any;
  estimatesIncluded: boolean;
}
type Props = OwnProps & StateProps;
const EstimateProductDisclosure: React.FunctionComponent<Props> = ({ disClosureText, estimatesIncluded, selectedBranch, style }: Props) => {
  const branchPhone = selectedBranch?.address?.phone;
  if (estimatesIncluded) {
    return (
      <View style={[style]}>
        <Text style={styles.disclosureText}>{disClosureText}</Text>
        <Text
          style={[styles.disclosureText, { color: colors.lightBlue }]}
          onPress={() => {
            Linking.openURL(`tel:${branchPhone}`);
          }}
          {...accessibility("branchPhoneLabel")}
        >
          Get in touch
        </Text>
      </View>
    );
  }
  return <View />;
};

const mapStateToProps = (state: RootState): StateProps => ({
  selectedBranch: state?.branchList?.selectedBranch,
  estimatesIncluded: state?.cart?.userCartDetail?.estimatesIncluded,
});

export default connect(mapStateToProps)(EstimateProductDisclosure);
