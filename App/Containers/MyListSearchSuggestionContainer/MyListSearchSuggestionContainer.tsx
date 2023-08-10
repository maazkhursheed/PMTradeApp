import React, { Component } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import * as Redux from "redux";
import { Subject } from "rxjs";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import SearchField from "~root/Components/SearchField";
import SearchSuggestionItem from "~root/Components/SearchSuggestionItem";
import SmallHeader from "~root/Components/SmallHeader";
import { accessibility } from "~root/Lib/DataHelper";
import { subscribeSuggestions } from "~root/Lib/SearchSuggestion";
import { RootState } from "~root/Reducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { SearchSuggestionsActions } from "~root/Reducers/SearchSuggestionsReducers";
import { Colors } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import styles from "./MyListSearchSuggestionStyle";

interface DispatchProps {
  searchSuggestions: (term: string) => void;
  reset: () => void;
  setTerm: (term: string) => void;
  logPixelEvent: (event: string, params: any) => void;
}

interface StateProps {
  suggestions: string[];
  term: string;
  loading: boolean;
  cartCount: number;
  selectedList: any;
}

export interface OwnProps {}

export interface State {}

type Props = OwnProps & StateProps & DispatchProps;

class MyListSearchSuggestionContainer extends Component<Props, State> {
  private searchField: any;
  private suggestions$ = new Subject<string>();
  private _unsubscribeFocusListener: any;

  public constructor(props: Props) {
    super(props);
    this.state = {};
    subscribeSuggestions(this.suggestions$, props);
  }

  public componentDidMount(): void {
    this._unsubscribeFocusListener = this.props.navigation.addListener("focus", () => this.searchField.textInput.focus());
    this.props.reset();
  }

  public componentWillUnmount(): void {
    this._unsubscribeFocusListener();
    this.props.reset();
  }

  public submit = (text: string, isSuggestionClick: boolean) => {
    this.props.navigation.push("MyListDetail", {
      searchText: text,
      item: this.props.route.params.item,
    });
    const params = {
      etype: isSuggestionClick ? "click" : "submit",
      group: "suggest",
      q: text || "",
      aq: isSuggestionClick ? text : "",
    };
    this.props.logPixelEvent(params);
  };

  public render() {
    return (
      <AppThemeContext.Provider value={"light"}>
        <MainContainer>
          <View style={styles.container}>
            <SmallHeader style={styles.smallHeader} title={"My List Search"} navigation={this.props.navigation} />
            <SearchField
              ref={r => (this.searchField = r)}
              onChangeText={text => {
                this.props.reset();
                this.suggestions$.next(text);
              }}
              onSubmitEditing={() => {
                if (this.props.term !== "") {
                  this.submit(this.props.term, false);
                }
              }}
              label={undefined}
              autoFocus={true}
              value={this.props.term}
              filterText={":"}
              autoCorrect={false}
              selectionColor={Colors.lightBlue}
              isCustom={true}
              returnKeyType={"search"}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              clearIcon={this.props.term.length > 0 ? <CustomIcon style={styles.closeIcon} onPress={this.clear} name={"clear"} /> : <View />}
            />
          </View>
          <LoadingView style={styles.listContainer} isLoading={this.props.loading}>
            <FlatList keyboardShouldPersistTaps={"never"} data={this.props.suggestions} renderItem={this.renderItem} />
          </LoadingView>
        </MainContainer>
      </AppThemeContext.Provider>
    );
  }

  private clear = () => {
    this.props.reset();
    this.props.setTerm("");
  };

  private renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        {...accessibility("searchItem")}
        onPress={() => {
          this.props.setTerm(item.name || "");
          this.submit(item.name, true);
        }}
      >
        <SearchSuggestionItem suggestion={item} keyword={this.props.term} />
      </TouchableOpacity>
    );
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  searchSuggestions: (term: string) => dispatch(SearchSuggestionsActions.requestSearchSuggestions(term)),
  reset: () => dispatch(SearchSuggestionsActions.resetFields()),
  setTerm: term => dispatch(SearchSuggestionsActions.setTerm(term)),
  logPixelEvent: (params: any) => dispatch(PixelActions.pixelRequest("event", params)),
});

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    suggestions: state.suggestions.data,
    term: state.suggestions.term,
    loading: state.suggestions.fetching,
    cartCount: state.cart.cartEntriesCount,
    selectedList: state.myList.selectedListData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyListSearchSuggestionContainer);
