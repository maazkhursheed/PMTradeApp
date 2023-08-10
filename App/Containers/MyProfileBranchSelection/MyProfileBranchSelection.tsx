import * as React from "react";
import BranchesList from "~root/Components/BranchesList/BranchesList";
import CustomIcon from "~root/Components/CustomIcon";
import SmallHeader from "~root/Components/SmallHeader";
import { BranchResponse } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { ApplicationStyles } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import style from "./MyProfileBranchSelectionStyle";

interface DispatchProps {
  selectBranch: (branchData: BranchResponse) => void;
}

interface StateProps {
  selectedAddress: string | undefined;
  branchDetail: BranchResponse[];
  selectedBranch: BranchResponse;
  parentBranch: BranchResponse;
  branchError: boolean;
}

interface OwnProps {
  onBranchSelect?: (branchData: BranchResponse) => void;
}

interface State {}

type Props = OwnProps & StateProps & DispatchProps;

class MyProfileBranchSelection extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <>
        <AppThemeContext.Provider value={"light"}>
          <SmallHeader
            actionItem={
              <CustomIcon name={"close"} style={style.close} onPress={() => this.props.navigation.getParent().pop()} {...accessibility("closeIcon")} />
            }
            title={"Branches"}
            style={ApplicationStyles.noShadow}
            navigation={this.props.navigation}
          />
          <BranchesList
            onBranchItemPress={branch => {
              this.props.navigation.push("BranchDetail", {
                branch: branch,
                dismiss: () => this.props.navigation.getParent().pop(2),
              });
            }}
          />
        </AppThemeContext.Provider>
      </>
    );
  }
}

export default MyProfileBranchSelection;
