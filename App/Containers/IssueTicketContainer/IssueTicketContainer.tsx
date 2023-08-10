import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import Barcode from "react-native-barcode-builder";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import MainContainer from "~root/Components/MainContainer";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import STCLargeButton from "~root/Components/STCLargeButton";
import { IOrderHistoryObject } from "~root/Db/OrderHistorySchema";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import { RootState } from "../../Reducers";
// Styles
import styles from "./IssueTicketStyle";

/**
 * The properties passed to the component
 */
export interface OwnProps {
  accountName: string;
  poNumber: string;
  orderNumber: string;
  closeSheet: () => void;
  sheetState: SheetState;
}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {}

/**
 * The properties mapped from the global state
 */
export interface StateProps {
  item?: IOrderHistoryObject;
}

/**
 * The local state
 */
export interface State {}

type Props = StateProps & DispatchProps & OwnProps & NavigationScreenProps;

class IssueTicketContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <MainContainer>
        <STCHeader
          title={"Add more products"}
          titleStyle={styles.titleStyle}
          style={{
            backgroundColor: this.props.sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
          }}
        />
        <ScrollView {...accessibility("issueTicketMainView")} style={styles.contentStyle} contentContainerStyle={styles.contentStyle}>
          <View style={styles.container}>
            <Barcode value={this.props.orderNumber} width={3} text={""} format={"CODE128"} />
            <Text {...accessibility("orderNumber")} style={styles.barcodeTitle}>
              SU {this.props.orderNumber}
            </Text>
          </View>
          <View style={styles.accountPO}>
            <View style={styles.rowStyle}>
              <Text style={styles.subHeading}>Account: </Text>
              <Text {...accessibility("accountName")} style={styles.accountName}>
                {this.props.accountName}
              </Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={styles.subHeading}>PO: </Text>
              <Text {...accessibility("poNumber")} style={styles.subHeading}>
                {" "}
                {this.props.poNumber}{" "}
              </Text>
            </View>
            <Text style={styles.heading}>Let’s finish your order</Text>
            <Text style={styles.bottomText}>Please grab the products you need and show this screen at the counter, and we will get you sorted</Text>
          </View>
          <STCLargeButton
            style={styles.returnToReviewButton}
            onPress={() => {
              this.props.closeSheet();
            }}
            btnText={"Return to review"}
          />
        </ScrollView>
      </MainContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({});

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return { item: state.stcReviewOrder.item };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueTicketContainer);
