import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const OnlineStatementAndInvoices: React.SFC<Props> = () => (
  <View>
    <Text style={style.textStyle}>
      PlaceMakers Invoices Online (SABER) provides a user friendly site where you can access your invoices/credit notes/statements and extract transactions into
      your own accounting package. If you use Xero or MYOB, your invoices can automatically be uploaded to your preferred system. Call us now to get setup or
      login on the link below:
    </Text>
    <View style={style.separator} />
    <Text
      style={style.textURLStyle}
      onPress={() => {
        Linking.openURL("https://placemakers.saberonline.co.nz/login.aspx");
      }}
      {...accessibility("saberURLLabel")}
    >
      https://placemakers.saberonline.co.nz/login.aspx
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(OnlineStatementAndInvoices);
