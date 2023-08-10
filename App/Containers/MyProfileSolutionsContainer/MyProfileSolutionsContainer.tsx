import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CustomIcon from "~root/Components/CustomIcon";
import SmallHeader from "~root/Components/SmallHeader";
import { RootState } from "~root/Reducers";
import AppThemeContext from "~root/Themes/AppThemeContext";
import {
  Benefits,
  BusinessManagement,
  InstalledSolutions,
  InStore,
  InteriorSolutions,
  Pricing,
  SolutionValue,
  SupportAndApprentice,
} from "~root/Types/Solutions";
import { KEY_PARAM_SOLUTION_TITLE } from "../MyProfileSolutionDetailContainer/MyProfileSolutionDetailContainer";
import styles from "./MyProfileSolutionsContainerStyle";

export const KEY_PARAM_SOLUTION_LEVEL = "keyParamSolutionLevel";
export const KEY_PARAM_SELECTED_SOLUTION = "keyParamSelectedSolution";

interface DispatchProps {}

interface StateProps {}

interface State {
  isSolutionsLevelOne: boolean;
  selectedSolution: string;
}

interface OwnProps {}

type Props = StateProps & OwnProps & DispatchProps & NavigationScreenProp<any, any>;

class MyProfileSolutionsContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSolutionsLevelOne: false,
      selectedSolution: "",
    };
  }

  public componentDidMount(): void {
    this.setState({
      isSolutionsLevelOne: this.props.route.params?.keyParamSolutionLevel,
      selectedSolution: this.props.route.params?.keyParamSelectedSolution ?? "",
    });
  }

  public render() {
    return (
      <AppThemeContext.Provider value={"light"}>
        <SmallHeader
          actionItem={<CustomIcon name={"close"} style={styles.close} onPress={() => this.props.navigation.getParent().pop()} />}
          title={this.state.isSolutionsLevelOne ? "PlaceMakers Solutions" : this.state.selectedSolution}
          navigation={this.props.navigation}
        />
        <ScrollView style={styles.container}>
          {this.state.isSolutionsLevelOne ? this.renderSolutions(Object.values(SolutionValue)) : this.renderSolutions(this.getSelectedSolutions())}
        </ScrollView>
      </AppThemeContext.Provider>
    );
  }

  public renderSolutions(solutionsArray: any) {
    return solutionsArray.reduce((item, acc) => this.renderItem(item, acc), []);
  }

  public renderItem = (accumulate: any, item: any) => {
    const { state } = this.props;
    accumulate.push(
      <TouchableOpacity
        onPress={() => {
          // this.props.navigation.dispatch(CommonActions.setParams({ [KEY_PARAM_SOLUTION_LEVEL]: false }));

          if (this.state.isSolutionsLevelOne) {
            this.props.navigation.push("MyProfileSolutionsContainer", {
              [KEY_PARAM_SELECTED_SOLUTION]: item,
              [KEY_PARAM_SOLUTION_LEVEL]: false,
            });
          } else {
            this.props.navigation.push("MyProfileSolutionDetailContainer", {
              [KEY_PARAM_SOLUTION_TITLE]: item,
              [KEY_PARAM_SOLUTION_LEVEL]: false,
            });
          }
        }}
      >
        <View style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
          <CustomIcon name={"chevron-right"} style={styles.chevron} />
        </View>
        <View style={styles.subSeparator} />
      </TouchableOpacity>,
    );
    return accumulate;
  };

  public getSelectedSolutions() {
    switch (this.state.selectedSolution) {
      case SolutionValue.InStore:
        return Object.values(InStore);
      case SolutionValue.BusinessManagement:
        return Object.values(BusinessManagement);
      case SolutionValue.Pricing:
        return Object.values(Pricing);
      case SolutionValue.SupportAndApprentice:
        return Object.values(SupportAndApprentice);
      case SolutionValue.Benefits:
        return Object.values(Benefits);
      case SolutionValue.InstalledSolutions:
        return Object.values(InstalledSolutions);
      case SolutionValue.InteriorSolutions:
        return Object.values(InteriorSolutions);
      default:
        return [];
    }
  }
}

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileSolutionsContainer);
