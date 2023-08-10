import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CustomIcon from "~root/Components/CustomIcon";
import SearchField from "~root/Components/SearchField";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { RootState } from "~root/Reducers";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import colors from "~root/Themes/Colors";
import AllBranchesListItem from "../AllBranchesListItem";
import style from "./AllBranchesListStyles";

interface DispatchProps {
  requestBranchList: (alertCallbacks: IAlertCallbacks) => void;
}

interface StateProps {
  fetching: boolean;
  allBranches: any;
}

interface OwnProps {
  selectedBranch?: (branch: any) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const AllBranchesList: React.SFC<Props> = ({ fetching, allBranches, requestBranchList, selectedBranch }: Props) => {
  const [branchSearchText, setBranchSearchText] = React.useState("");
  const searchField = React.useRef(null);
  const [searchResult, setSearchResult] = React.useState([]);

  React.useEffect(() => {
    requestBranchList({});
  }, []);

  const onRefresh = React.useCallback(() => requestBranchList({}), []);

  const cancelSearchTapped = React.useCallback(() => setBranchSearchText(""), []);

  const searchTextChanged = React.useCallback(
    (text: string) => {
      setBranchSearchText(text);
      setSearchResult(allBranches.filter((data: any) => data?.name?.includes(text)));
    },
    [allBranches],
  );

  return (
    <>
      <View style={style.container}>
        <View style={style.bottomOnlyShadowStyle}>
          <View style={style.shadowStyle}>
            <SearchField
              ref={searchField}
              onChangeText={text => searchTextChanged(text)}
              onSubmitEditing={cancelSearchTapped}
              onClosePress={cancelSearchTapped}
              label={undefined}
              value={branchSearchText}
              placeholder={"Search by branch name"}
              placeholderTextColor={colors.darkGrey}
              autoCorrect={false}
              selectionColor={Colors.lightBlue}
              isCustom={true}
              returnKeyType={"search"}
              inputContainerStyle={style.inputContainerStyle}
              inputStyle={style.inputStyle}
              searchIcon={<CustomIcon name={"location"} style={style.iconStyle} onPress={searchField?.current?.textInput?.focus} />}
            />
          </View>
        </View>
        <FlatList
          refreshControl={<RefreshControl refreshing={fetching} onRefresh={onRefresh} />}
          data={branchSearchText ? searchResult : allBranches}
          keyExtractor={({ branchID }) => branchID.toString()}
          renderItem={item => {
            return (
              <AllBranchesListItem
                item={item.item}
                index={item.index}
                allBranches={allBranches}
                onPress={() => {
                  setBranchSearchText("");
                  if (selectedBranch) {
                    selectedBranch(item.item);
                  }
                }}
              />
            );
          }}
          contentContainerStyle={style.listStyle}
        />
      </View>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    requestBranchList: (alertCallbacks: any) => dispatch(BranchDetailsActions.requestBranchList(alertCallbacks)),
  };
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    fetching: state.branchList.fetching,
    allBranches: state.branchList.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBranchesList);
