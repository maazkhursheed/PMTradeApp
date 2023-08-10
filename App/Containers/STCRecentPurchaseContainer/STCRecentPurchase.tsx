import moment from "moment";
import { Col } from "native-base";
import * as RA from "ramda-adjunct";
import React from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Divider from "~root/Components/Divider";
import FbIcon from "~root/Components/FbIcon";
import { IOrderHistoryObject, OrderHistoryStatus } from "~root/Db/OrderHistorySchema";
import { accessibility } from "~root/Lib/DataHelper";
import { isNavigableStatus } from "~root/Lib/OrderHistoryHelper";
import { STCEventScreenNames } from "~root/Lib/STCHelper";
import { RootState } from "~root/Reducers";
import { OrderHistoryActions } from "~root/Reducers/OrderHistoryReducers";
import { StcActions } from "~root/Reducers/StcReducers";
import style from "./STCRecentPuchaseStyle";

export interface State {
  poNumber: string;
  poError?: string;
}

export interface OwnProps {}

export interface StateProps {
  data: IOrderHistoryObject[];
}

interface DispatchProps {
  switchSTCScreen: (screenName: STCEventScreenNames, meta: any) => void;
  requestData: () => void;
}

type Props = OwnProps & StateProps & DispatchProps & NavigationScreenProps;

class STCRecentPurchase extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      poNumber: "",
      poError: undefined,
    };
  }

  public componentDidMount() {
    this.props.requestData();
  }

  public onClose = () => {
    this.props.navigation.pop();
  };

  public renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        {...accessibility("stcRecentPurchaseItemClick")}
        onPress={() => {
          if (isNavigableStatus(item.status)) {
            if (item.status === OrderHistoryStatus.Confirmed) {
              this.props.navigation.navigate("STCGatePass", {
                header: false,
                item,
              });
            }
          }
        }}
      >
        <View style={style.itemContainer}>
          <Text style={style.timeAndStatusStyle}>{RA.isNotNilOrEmpty(item.time) ? moment(item.time).format("LT") : ""}</Text>
          <View style={style.purchaseInfo}>
            <Col size={3}>
              <Text style={style.orderNumberStyle}>{item.orderId}</Text>
            </Col>
            <Col size={2}>
              <Text style={style.statusStyle}>{item.status}</Text>
            </Col>
            {!!isNavigableStatus(item.status) && (
              <Col size={0.5}>
                <FbIcon name={"ic_chevron"} style={style.iconStyle} />
              </Col>
            )}
          </View>
          <Text style={style.poNumberStyle}>{item.poNumber}</Text>
          <Divider style={style.divider} />
        </View>
      </TouchableOpacity>
    );
  };

  public render() {
    return (
      <SectionList
        {...accessibility("stcRecentPurchaseList")}
        style={style.sectionListStyle}
        sections={[{ data: this.props.data, title: "Today" }]}
        contentContainerStyle={style.contentContainerStyle}
        renderSectionHeader={({ section }) => (
          <View style={style.sectionHeader}>
            <Text style={style.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={this.renderItems}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  switchSTCScreen: (screenToSwitch: STCEventScreenNames, meta: any) => dispatch(StcActions.switchScreen(screenToSwitch, meta)),
  requestData: () => dispatch(OrderHistoryActions.request()),
});

const mapStateToProps = (state: RootState): StateProps => {
  return { data: state.orderHistory.data || [] };
};

export default connect(mapStateToProps, mapDispatchToProps)(STCRecentPurchase);
