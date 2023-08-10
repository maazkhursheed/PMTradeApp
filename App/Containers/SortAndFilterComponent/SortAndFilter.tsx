import { Button } from "native-base";
import * as R from "ramda";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CheckBox from "~root/Components/CheckBox";
import CommonHeader from "~root/Components/CommonHeader/CommonHeader";
import FbIcon from "~root/Components/FbIcon";
import LargeButton from "~root/Components/LargeButton";
import MainContainer from "~root/Components/MainContainer";
import OfflineNotice from "~root/Components/OfflineNotice";
import Radial from "~root/Components/Radial";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { OrderDeliveriesActions } from "~root/Reducers/OrderDeliveriesReducers";
import FilterModel from "~root/Types/Filter";
import { OrderSort, OrderStatus } from "~root/Types/OrderItem";
import style from "./SortAndFilterStyle";

export interface OwnProps {}

export interface StateProps {
  filter: FilterModel;
}

export interface DispatchProps {
  applyFilter: (filter: FilterModel) => void;
}

type Props = OwnProps & StateProps & DispatchProps & NavigationScreenProps;

class SortAndFilter extends React.Component<Props, FilterModel> {
  constructor(props: Props) {
    super(props);
    this.state = props.filter;
  }

  public componentWillReceiveProps(nextProps: any, nextContext: any): void {
    this.setState(nextProps.filter);
  }

  public closeFilter = () => {
    this.props.navigation.pop();
  };

  public clearAll = () => {
    this.setState(R.mergeRight(this.state, { status: [] }));
  };

  public render() {
    return (
      <MainContainer>
        <CommonHeader
          style={style.header}
          noShadow={true}
          title={"SORT & FILTER"}
          rightItem={
            <Button onPress={this.closeFilter} transparent={true} style={style.close} {...accessibility("rightItemBtn")}>
              <FbIcon name={"ic_close"} style={style.iconStyle} />
            </Button>
          }
        />
        <OfflineNotice />
        <ScrollView>
          <View style={style.container}>
            <Text style={style.title} {...accessibility("sortByLabel")}>
              SORT BY
            </Text>
            {R.map(
              value => (
                <Radial
                  style={style.sortByLabel}
                  selected={this.state.sort === value}
                  onPress={() => {
                    this.setState({ sort: value });
                  }}
                  text={OrderSort[value]}
                />
              ),
              R.keys(OrderSort),
            )}
            <View style={style.caretView} />

            <View style={style.orderStatusContainer}>
              <Text style={style.filterByTextStyle} {...accessibility("filterByLabel")}>
                FILTER BY
              </Text>
              <Text onPress={this.clearAll} style={style.clearAllText} {...accessibility("clearAllLabel")}>
                Clear all
              </Text>
            </View>

            <Text style={style.subtitle} {...accessibility("orderStatusLabel")}>
              ORDER STATUS:{" "}
            </Text>
            {R.map(key => (
              <CheckBox
                style={style.filterByLabel}
                selected={R.includes(key, this.state.status)}
                onPress={() => {
                  if (R.includes(key, this.state.status)) {
                    this.setState({
                      status: R.without([key], this.state.status),
                    });
                  } else {
                    this.setState({ status: R.append(key, this.state.status) });
                  }
                }}
                checkBoxDesc={<Text style={style.orderStatusText}>{OrderStatus[key]}</Text>}
              />
            ))(R.keys(OrderStatus))}
          </View>
        </ScrollView>
        <LargeButton
          isFooter={true}
          onPress={() => {
            this.props.applyFilter(this.state);
            this.props.navigation.pop();
          }}
          btnText={"Apply"}
        />
      </MainContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  applyFilter: filter => dispatch(OrderDeliveriesActions.filter(filter)),
});

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  filter: state.orderDeliveries.filter,
});

export default connect(mapStateToProps, mapDispatchToProps)(SortAndFilter);
