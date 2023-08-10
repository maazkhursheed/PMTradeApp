// Styles
import { firebase } from "@react-native-firebase/analytics";
import * as React from "react";
import { Animated } from "react-native";
import { connect } from "react-redux";
import MainContainer from "~root/Components/MainContainer";
import MyListDetailHeader from "~root/Components/MyListDetailHeader";
import MyListDetailSearchHeader from "~root/Components/MyListDetailSearchHeader";
import MyListDetailsListing from "~root/Components/MyListDetailsListing";
import { getBranchTownRegion, navigationalScreens } from "~root/Lib/BranchHelper";
import { getFilteredMyList, getMyListViewObject, getSelectedAccountId } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { RootState } from "../../Reducers";
/**
 * The properties passed to the component
 */
export interface OwnProps {
  item: any;
  index: any;
  navigation: any;
  route: any;
}

/**
 * The properties mapped from Redux dispatch
 */
export interface DispatchProps {}

/**
 * The properties mapped from the global state
 */
export interface StateProps {
  selectedList: any;
  digitalId: any;
  selectedAccountId: any;
  selectedBranch: any;
}

/**
 * The local state
 */
export interface State {
  rename?: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

class MyListDetailContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public componentDidMount(): void {
    setTimeout(() => {
      this.logMyListViewEvents(this.getData(), "view_item_list");
    }, 5000);
  }

  public isSearchedNav = () => !!this.props.route.params?.searchText ?? undefined;

  public getData = () => {
    if (this.isSearchedNav()) {
      const text = this.props.route.params?.searchText ?? undefined;
      return getFilteredMyList(text, this.props.selectedList);
    } else {
      return this.props.selectedList;
    }
  };

  public back = () => {
    this.props.navigation.pop();
  };

  public async logMyListViewEvents(data: any, event: any) {
    const eventLogObject = getMyListViewObject({
      event,
      digitalId: this.props.digitalId,
      selectedAccountId: this.props.selectedAccountId,
      sanitizedData: data,
      location: getBranchTownRegion(this.props.selectedBranch),
      storeName: this.props.selectedBranch?.name,
      listName: this.props.route.params?.item?.listName,
    });
    /**
     * updated following by abdul to remove the error logs from firebase event
     */
    if (!__DEV__) {
      firebase.analytics().logEvent(event, eventLogObject);
    }
  }

  public render() {
    const scrollY = new Animated.Value(0);
    return (
      <MainContainer>
        {this.isSearchedNav() ? (
          <MyListDetailSearchHeader navigation={this.props.navigation} route={this.props.route} scrollY={scrollY} />
        ) : (
          <MyListDetailHeader navigation={this.props.navigation} route={this.props.route} scrollY={scrollY} />
        )}
        <MyListDetailsListing data={this.getData()} navigation={this.props.navigation} route={this.props.route} scrollY={scrollY} />
      </MainContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({});

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    selectedList: state.myList.selectedListData,
    digitalId: extractDigitalIdFromJWTPayload(decodeJWTToken(state.login.tempToken.idToken)) as string,
    selectedAccountId: getSelectedAccountId(state),
    selectedBranch: state.branchList.selectedBranch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAppender(safeRender(MyListDetailContainer, navigationalScreens.MyListDetailsScreen)));
