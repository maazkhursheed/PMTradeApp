import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import AccountBranchSelector from "~root/Components/AccountBranchSelector/AccountBranchSelector";
import { allProductsSearchText } from "~root/Lib/AlertsHelper";
import { RootState } from "~root/Reducers";
import GenericSearchFieldComponent from "../GenericSearchFieldComponent";
import styles from "./HeaderWithSearchBarComponentStyle";

interface OwnProps {
  navigation: any;
}

interface DispatchProps {}

interface StateProps {}

type Props = OwnProps & StateProps & DispatchProps;

const HeaderWithSearchBarComponent: React.SFC<Props> = ({ navigation }: Props) => {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <GenericSearchFieldComponent
        onPress={() => {
          navigation.navigate("SearchSuggestion");
        }}
        style={[styles.searchField]}
        placeHolderText={allProductsSearchText}
        hasBarcodeIcon={true}
      />
      {!route.params?.hideAccountSelection && <AccountBranchSelector />}
    </View>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({});

const mapStateToProps = (state: RootState): StateProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithSearchBarComponent);
