import * as React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AddMaterialsSwitchSheet from "~root/Components/AddMaterialsSwitchSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import CustomIcon from "~root/Components/CustomIcon";
import { FeatureKeys, useFeatureToggleChangeNotifier } from "~root/Components/FeatureToggle/FeatureToggle";
import LoadingView from "~root/Components/LoadingView";
import MaterialsSectionFooter from "~root/Components/MaterialsSectionFooter/MaterialsSectionFooter";
import MaterialsStageOfBuildItem from "~root/Components/MaterialsStageOfBuildItem";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { useQuoteStatusChecker, useQuoteWonOrLostStatus, useTabBar } from "~root/Lib/QuoteHelper";
import { safeRender, useAppender, withAppender } from "~root/Provider/Appender";
import styles from "./MaterialsStageOfBuildComponentStyle";

interface OwnProps {
  items: any;
  navigation: any;
}
type Props = OwnProps;

const MaterialsStageOfBuildComponent: React.SFC<Props> = ({ items, navigation }: Props) => {
  const { append } = useAppender();
  const [stateSheet, setStateSheet] = React.useState(SheetState.CLOSED);
  React.useEffect(() => {
    append(<AddMaterialsSwitchSheet sheetState={stateSheet} sheetCloseTapped={() => setStateSheet(SheetState.CLOSED)} />, "AddMaterialsSwitchSheet", 0);
  }, [stateSheet]);

  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, () => setStateSheet(SheetState.CLOSED));
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  const isQuoteEditable = useQuoteStatusChecker();

  React.useEffect(() => {
    if (stateSheet === SheetState.EXPANDED) useTabBar(navigation, "none");
    else useTabBar(navigation, "flex");
  }, [stateSheet]);

  return (
    <>
      <LoadingView isLoading={false} style={styles.loadingView}>
        <View style={styles.itemsContainer}>
          <View style={styles.sectionItemContainer}>
            <Text style={styles.textStyle}>Stage of build</Text>
          </View>
          <FlatList
            data={items}
            renderItem={item => {
              return <MaterialsStageOfBuildItem item={item} />;
            }}
            {...accessibility("StagesOfBuildFlatList")}
          />
          {!isQuoteWonOrLost && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => isQuoteEditable(() => setStateSheet(SheetState.EXPANDED))}
              {...accessibility("AddMaterialButton")}
            >
              <CustomIcon name={"add"} style={styles.icon} />
              <Text style={styles.buttonText}>Add stage of build</Text>
            </TouchableOpacity>
          )}
        </View>
      </LoadingView>
      <MaterialsSectionFooter />
    </>
  );
};
export default withAppender(safeRender(MaterialsStageOfBuildComponent, navigationalScreens.MaterialsSectionScreen));
