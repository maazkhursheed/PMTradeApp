import * as React from "react";
import { Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";

interface OwnProps {
  branchPhone: string;
}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const GetInvoicesDailyWeeklyMonthly: React.SFC<Props> = ({ branchPhone }: Props) => (
  <View>
    <Text style={style.textStyle}>
      No matter how you manage your business, you can get your invoices sent to you daily, weekly, or monthly. Simply let our accounts team know how you want
      them and we will set it all up for you.
    </Text>
    <View style={style.separator} />
    <Text style={style.textURLStyle} onPress={() => Linking.openURL(`tel:${branchPhone}`)} {...accessibility("phoneNumber")}>
      {branchPhone}
    </Text>
  </View>
);

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(GetInvoicesDailyWeeklyMonthly);
