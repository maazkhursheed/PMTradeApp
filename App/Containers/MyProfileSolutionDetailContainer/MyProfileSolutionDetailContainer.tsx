import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CustomIcon from "~root/Components/CustomIcon";
import SmallHeader from "~root/Components/SmallHeader";
import SolutionDetailComponent from "~root/Components/SolutionDetailComponent";
import { RootState } from "~root/Reducers";
import AppThemeContext from "~root/Themes/AppThemeContext";
import styles from "./MyProfileSolutionDetailContainerStyle";

export const KEY_PARAM_SOLUTION_TITLE = "keyParamSolutionTitle";

interface DispatchProps {}

interface StateProps {}

interface State {
  solutionTitle: string;
}

interface OwnProps {}

type Props = StateProps & OwnProps & DispatchProps & NavigationScreenProp<any, any>;

class MyProfileSolutionDetailContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      solutionTitle: "",
    };
  }

  public componentDidMount(): void {
    this.setState({
      solutionTitle: this.props.route.params?.keyParamSolutionTitle ?? "",
    });
  }

  public render() {
    const { solutionTitle } = this.state;
    return (
      <AppThemeContext.Provider value={"light"}>
        <SmallHeader
          actionItem={<CustomIcon name={"close"} style={styles.close} onPress={() => this.props.navigation.getParent().pop()} />}
          title={solutionTitle}
          navigation={this.props.navigation}
        />
        <ScrollView style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.headerStyle}>{solutionTitle}</Text>
            <SolutionDetailComponent solutionTitle={solutionTitle} navigation={this.props.navigation} />
          </View>
        </ScrollView>
      </AppThemeContext.Provider>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileSolutionDetailContainer);
