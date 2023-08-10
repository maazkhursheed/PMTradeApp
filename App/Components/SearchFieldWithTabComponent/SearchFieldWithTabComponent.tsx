import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";
import { connect } from "react-redux";
import AccountBranchSelector from "~root/Components/AccountBranchSelector/AccountBranchSelector";
import SearchField from "~root/Components/SearchField";
import { RootState } from "~root/Reducers";
import { SearchSuggestionsActions } from "~root/Reducers/SearchSuggestionsReducers";
import styles from "./SearchFieldWithTabComponentStyle";

interface OwnProps extends ViewProps {
  navigation: any;
  searchText: string;
}

interface DispatchProps {
  reset?: () => void;
  setTerm: (term: string) => void;
}

interface StateProps {}

type Props = OwnProps & StateProps & DispatchProps;

const SearchFieldWithTabComponent: React.SFC<Props> = ({ navigation, searchText, setTerm, reset, ...props }: Props) => {
  const clear = () => {
    navigation.goBack();
  };
  const route = useRoute();
  return (
    <View {...props}>
      <TouchableOpacity onPress={clear}>
        <SearchField
          pointerEvents={"none"}
          editable={false}
          onClosePress={() => {
            setTerm("");
            clear();
            reset();
          }}
          value={"" + searchText}
          label={undefined}
          filterText={":"}
          autoCorrect={false}
          isCustom={true}
          returnKeyType={"search"}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          iconStyle={styles.iconStyle}
        />
      </TouchableOpacity>
      {!route.params?.hideAccountSelection && <AccountBranchSelector />}
    </View>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  setTerm: term => dispatch(SearchSuggestionsActions.setTerm(term)),
  reset: () => dispatch(SearchSuggestionsActions.resetFields()),
});

const mapStateToProps = (state: RootState): StateProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFieldWithTabComponent);
