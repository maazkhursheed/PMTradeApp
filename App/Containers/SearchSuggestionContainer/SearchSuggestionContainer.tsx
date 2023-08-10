import React, { Component } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import * as Redux from "redux";
import { Subject } from "rxjs";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import SearchField from "~root/Components/SearchField";
import SearchSuggestionCategory from "~root/Components/SearchSuggestionCategory";
import SearchSuggestionItem from "~root/Components/SearchSuggestionItem";
import SmallHeader from "~root/Components/SmallHeader";
import { accessibility } from "~root/Lib/DataHelper";
import { subscribeSuggestions } from "~root/Lib/SearchSuggestion";
import { RootState } from "~root/Reducers";
import { PixelActions } from "~root/Reducers/PixelReducer";
import { SearchSuggestionsActions } from "~root/Reducers/SearchSuggestionsReducers";
import { ApplicationStyles, Colors } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import styles from "./SearchSuggestionStyle";

interface DispatchProps {
  searchSuggestions: (term: string) => void;
  reset: () => void;
  setTerm: (term: string) => void;
  logPixelEvent: (event: string, params: any) => void;
}

interface StateProps {
  suggestions: [];
  term: string;
  loading: boolean;
  cartCount: number;
}

export interface OwnProps {}

export interface State {}

type Props = OwnProps & StateProps & DispatchProps;

class SearchSuggestionContainer extends Component<Props, State> {
  private searchField: any;
  private suggestions$ = new Subject<string>();
  private focusListener: any;

  public constructor(props: Props) {
    super(props);
    this.state = {};
    subscribeSuggestions(this.suggestions$, props);
  }

  public componentDidMount(): void {
    this.props.reset();
    this.focusListener = this.props.navigation.addListener("focus", () => {
      setTimeout(this.searchField?.textInput.focus, 1000);
    });
  }

  public componentWillUnmount(): void {
    this.props.reset();
    this.focusListener?.();
  }

  public submit = text => {
    if (text.length > 0) {
      this.props.navigation.navigate("SearchResults", { searchText: text });
      const params = {
        etype: "submit",
        group: "suggest",
        q: text,
      };
      this.props.logPixelEvent(params);
    }
  };

  public searchSuggestion = item => {
    if (item.name.length > 0) {
      if (!item.isCategory) {
        this.props.navigation.navigate("SearchResults", {
          searchText: item.name || item.value || "",
        });
        const params = {
          etype: "click",
          group: "suggest",
          q: item.name || "",
          aq: this.props.term || "",
        };
        this.props.logPixelEvent(params);
        this.props.setTerm(item.name);
      } else {
        this.props.navigation.navigate("SearchResults", {
          categoryId: ":Sort By:category:" + item.value,
          categoryName: item.isCategory ? item?.name : "",
        });
        // this.props.setTerm(item.name);
      }
    }
  };

  public render() {
    return (
      <AppThemeContext.Provider value={"light"}>
        <MainContainer>
          <View style={styles.container}>
            <SmallHeader style={ApplicationStyles.noShadow} navigation={this.props.navigation} title={"Search"} />
            <SearchField
              ref={r => (this.searchField = r)}
              onChangeText={text => {
                this.props.reset();
                this.suggestions$.next(text);
              }}
              onSubmitEditing={() => this.submit(this.props.term)}
              label={undefined}
              value={this.props.term.replace(":relevance:category:", "")}
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
            <FlatList keyboardShouldPersistTaps={"always"} data={this.props.suggestions} renderItem={this.renderItem} />
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
        {...accessibility("searchTermSelection")}
        onPress={() => {
          this.searchSuggestion(item);
        }}
      >
        {item.isCategory ? (
          <SearchSuggestionCategory suggestion={item} keyword={this.props.term} />
        ) : (
          <SearchSuggestionItem suggestion={item} keyword={this.props.term} />
        )}
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
    suggestions: state.suggestions.all,
    term: state.suggestions.term,
    loading: state.suggestions.fetching,
    cartCount: state.cart.cartEntriesCount,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSuggestionContainer);
