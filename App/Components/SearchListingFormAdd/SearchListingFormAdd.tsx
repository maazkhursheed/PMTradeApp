import { firebase } from "@react-native-firebase/analytics";
import { Button } from "native-base";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import * as React from "react";
import { Platform, SectionList, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import CustomAlert from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import NativeWrapper from "~root/Components/NativeWrapper";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { IAlertCallbacks, OKButton } from "~root/Lib/AlertsHelper";
import { BranchResponse, getBranchTownRegion } from "~root/Lib/BranchHelper";
import { accessibility, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { RootState } from "~root/Reducers";
import { MyListActions } from "~root/Reducers/MyListReducers";
import { IItemListRequestParam } from "~root/Types/SearchAPITypes";
import styles from "./SearchListingFormAddStyle";

interface OwnProps {
  sku: string;
  onNewClick: (sku: string) => void;
  onCloseBottomSheet: () => void;
  item?: any;
}

interface IStateProps {
  myLists: any[];
  newList: any[];
  selectedBranch: BranchResponse;
  selectedAccountId: string;
  digitalId: any;
}

interface IDispatchProps {
  requestAddItem: (param: IItemListRequestParam, callback: IAlertCallbacks) => void;
  resetList: () => void;
}

interface State {
  newListIcon: [];
  myListIcon: [];
  loading: boolean;
  visible: boolean;
}

type Props = OwnProps & IStateProps & IDispatchProps;

class SearchListingFormAdd extends React.Component<Props, State> {
  private setFalse = R.compose(R.map(R.F), R.range(0), R.length);

  constructor(props: Props) {
    super(props);
    this.state = {
      newListIcon: [],
      myListIcon: this.setFalse(props.myLists),
      visible: false,
    };
  }

  public reset = () => {
    this.setState({ myListIcon: this.setFalse(this.props.myLists) });
  };

  public componentWillReceiveProps(nextProps: Readonly<OwnProps & IStateProps & IDispatchProps>, nextContext: any): void {
    if (nextProps.myLists.length !== this.props.myLists.length || nextProps.newList.length !== this.props.newList.length) {
      this.setState({
        myListIcon: this.setFalse(nextProps.myLists),
        newListIcon: this.setFalse(nextProps.newList),
      });
    }
  }

  public logAddItemListEvent = () => {
    const analyticsObj = {
      event: "add_item_list",
      location: getBranchTownRegion(this.props.selectedBranch),
      device_type: Platform.OS,
      userId: this.props.digitalId,
      accountId: this.props.selectedAccountId,
      item_id: this.props.item.SKU,
    };
    firebase.analytics().logEvent("add_item_list", analyticsObj);
  };
  public Item = (item: any, index: any, isMyList: boolean) => {
    return (
      <View style={styles.containerRow}>
        <NativeWrapper
          onPress={() =>
            this.props.requestAddItem(
              {
                listName: item?.listName,
                skuList: [this.props.item.SKU],
              },
              {
                onSuccess: () => {
                  this.logAddItemListEvent();
                  const list = isMyList ? this.state.myListIcon : this.state.newListIcon;
                  const lens = R.lensIndex(index);
                  this.setState(
                    {
                      [isMyList ? "myListIcon" : "newListIcon"]: R.set(lens, true, list),
                    },
                    // tslint:disable-next-line:no-empty
                    () => {},
                  );
                },
                onFailure: () => {
                  this.setState({ visible: true });
                },
              },
            )
          }
          {...accessibility("searchSectionItem")}
        >
          <View style={styles.list}>
            <View style={styles.listTextRow}>
              <Text numberOfLines={1} style={styles.listText}>
                {item?.listName}
              </Text>
            </View>
            <View style={styles.listIcon} {...accessibility("addToListIcon")}>
              <CustomIcon
                style={styles.tickIcon}
                name={(isMyList ? this.state.myListIcon[index] : this.state.newListIcon[index]) ? "success" : "add"}
                {...accessibility("addToListIcon")}
              />
            </View>
          </View>
        </NativeWrapper>
      </View>
    );
  };

  public render() {
    const sectionData = R.ifElse(
      RA.isNilOrEmpty,
      R.always([{ title: "My Lists", data: this.props.myLists }]),
      R.always([
        { title: "New", data: this.props.newList },
        { title: "My Lists", data: this.props.myLists },
      ]),
    )(this.props.newList);

    return (
      <>
        <STCHeader
          title={"Add to My List"}
          titleStyle={styles.headerTitleStyle}
          style={styles.headerStyle}
          rightItem={
            <Button
              transparent={true}
              onPress={() => {
                this.props.resetList();
                this.setState({
                  newListIcon: this.setFalse(this.props.newList),
                  myListIcon: this.setFalse(this.props.myLists),
                });
                this.props.onCloseBottomSheet();
              }}
              {...accessibility("rightItemBtn")}
            >
              <Text style={styles.doneTextStyle}>Done</Text>
            </Button>
          }
          leftItem={
            <Button
              transparent={true}
              onPress={() => {
                this.props.onNewClick(this.props.sku);
              }}
              {...accessibility("rightItemBtn")}
            >
              <Text style={styles.newTextStyle}>New</Text>
            </Button>
          }
        />
        <View style={styles.cardContainer}>
          <View style={styles.cardInnerContainer}>
            <FastImage source={{ uri: this.props.item.Image }} style={styles.imageStyle} resize={FastImage.resizeMode.contain} />
            <View style={styles.productInfoView}>
              <Text style={styles.brandStyle}>{this.props.item?.Brand}</Text>
              <Text style={styles.nameStyle} numberOfLines={1}>
                {this.props.item?.ProductDescription}
              </Text>
            </View>
          </View>
          <LoadingView style={{ flex: 1 }} isLoading={this.props.loading}>
            <SectionList
              renderItem={({ item, index, section }) => this.Item(item, index, section.title === "My Lists")}
              renderSectionHeader={({ section: { title } }) => (
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>{title}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index}
              extraData={this.state.myListIcon || this.state.newListIcon}
              sections={sectionData}
              contentContainerStyle={styles.contentContainer}
            />
          </LoadingView>
          <CustomAlert
            heading={"Error"}
            msg={"Unable to add product to your list"}
            visible={this.state?.visible}
            onClose={() => this.setState({ visible: false })}
            button1Text={OKButton}
            onButton1Press={() => this.setState({ visible: false })}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = (state: RootState): IStateProps => ({
  myLists: state.myList.myLists,
  newList: state.myList.newLists,
  loading: state.myList.fetching,
  selectedBranch: state.branchList.selectedBranch,
  selectedAccountId: getSelectedAccountId(state),
  digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  requestAddItem: (param, callback) => {
    dispatch(MyListActions.addItemToList(param, callback));
  },
  resetList: () => dispatch(MyListActions.clearNewList()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(SearchListingFormAdd);
