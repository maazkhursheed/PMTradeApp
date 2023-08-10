import * as React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import AccountBranchSelector from "~root/Components/AccountBranchSelector/AccountBranchSelector";
import ScrollAnimatedHeaderComponent from "~root/Components/ScrollAnimatedHeaderComponent";
import SearchField from "~root/Components/SearchField";
import SmallHeader from "~root/Components/SmallHeader";
import { accessibility } from "~root/Lib/DataHelper";
import { SearchSuggestionsActions } from "~root/Reducers/SearchSuggestionsReducers";
import { ApplicationStyles } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import styles from "./MyListDetailSearchHeaderStyle";

interface OwnProps {
  navigation: any;
  route: any;
  scrollY: Animated.Value;
}

interface DispatchProps {
  reset?: () => void;
}

type Props = OwnProps & DispatchProps;

const MyListDetailSearchHeader: React.SFC<Props> = ({ navigation, route, reset, scrollY }: Props) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const back = () => {
    navigation.goBack();
  };

  const clear = () => {
    reset?.();
    navigation.goBack();
  };

  return (
    <>
      <AppThemeContext.Provider value={"light"}>
        <View style={styles.headerContainer} onLayout={event => setHeaderHeight(event.nativeEvent.layout.height)}>
          <SmallHeader style={{ ...ApplicationStyles.noShadow }} title={"My List Search"} navigation={navigation} />
        </View>
        <ScrollAnimatedHeaderComponent scrollY={scrollY} style={{ marginTop: headerHeight }}>
          <View style={styles.container}>
            <TouchableOpacity onPress={back} {...accessibility("MyListDetailsSearchBack")}>
              <SearchField
                pointerEvents={"none"}
                editable={false}
                onClosePress={clear}
                value={route.params?.searchText ?? ""}
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
            <AccountBranchSelector />
          </View>
        </ScrollAnimatedHeaderComponent>
      </AppThemeContext.Provider>
    </>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  reset: () => {
    dispatch(SearchSuggestionsActions.resetFields());
    dispatch(SearchSuggestionsActions.setTerm(""));
  },
});

export default connect(null, mapDispatchToProps)(MyListDetailSearchHeader);
