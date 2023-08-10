import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Animated } from "react-native";
import BigBlueHeader from "~root/Components/BigBlueHeader/BigBlueHeader";
import { FeatureKeys } from "~root/Components/FeatureToggle";
import { useFeatureToggleChangeNotifier } from "~root/Components/FeatureToggle/FeatureToggle";
import HeaderSegment from "~root/Components/HeaderSegment/HeaderSegment";
import JobsListComponent from "~root/Components/JobsListComponent/JobsListComponent";
import OfflineNotice from "~root/Components/OfflineNotice";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import QuotesListComponent from "~root/Components/QuotesListComponent/QuotesListComponent";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { EnumQuoteType } from "~root/Lib/QuoteHelper";
import { AnimationProvider } from "~root/Provider/AnimationProvider";
import { safeRender, withAppender } from "~root/Provider/Appender";
import { PermissionTypes } from "~root/Types/Permissions";
import styles from "./JobsContainerStyle";

export interface OwnProps {
  route: any;
}

export interface DispatchProps {}

export interface StateProps {}

export interface State {
  scrollY: Animated.Value;
}

type Props = OwnProps & DispatchProps & StateProps;

enum Selection {
  Quotes = "Quotes",
  InProgress = "In Progress",
}

const JobsContainer: React.FC<Props> = () => {
  const [featureToggle, setFeatureToggle] = React.useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedQuoteToSend, setSelectedQuoteToSend] = React.useState(EnumQuoteType.InProgress);
  const [segmentValue, setSegmentValue] = React.useState(Selection.InProgress);

  useEffect(() => {
    if (route?.params?.navParam?.selectedQuote) {
      setSelectedQuoteToSend(route?.params?.navParam?.selectedQuote);
      navigation.setParams({
        navParam: {
          selectedQuote: undefined,
        },
      });
    }
  }, [navigation, route?.params?.navParam?.selectedQuote]);

  useFeatureToggleChangeNotifier(FeatureKeys.QuotesSelector, (toggleStatus: boolean) => {
    setFeatureToggle(toggleStatus);
    navigation.dispatch(StackActions.popToTop());
    setSegmentValue(Selection.InProgress);
  });
  const checkViewPricePermissions = React.useCallback(
    ({ hasPermission }) => {
      if (!hasPermission && segmentValue !== Selection.InProgress) {
        setSegmentValue(Selection.InProgress);
      }
    },
    [segmentValue],
  );

  return (
    <>
      {/*@ts-ignore*/}
      <PermissionComponent permissionTypes={[PermissionTypes.UserAdmin, PermissionTypes.AccountOwner, PermissionTypes.ViewPricing]}>
        {checkViewPricePermissions}
      </PermissionComponent>
      <AnimationProvider>
        <BigBlueHeader title={"Jobs"}>
          {/*@ts-ignore*/}
          {featureToggle && (
            <PermissionComponent
              style={styles.permissionViewStyle}
              hideView={true}
              permissionTypes={[PermissionTypes.UserAdmin, PermissionTypes.AccountOwner, PermissionTypes.ViewPricing]}
            >
              <HeaderSegment
                selected={segmentValue}
                onSelected={setSegmentValue}
                values={[Selection.Quotes, Selection.InProgress]}
                style={styles.headerSegmentStyle}
                selectedButtonStyle={styles.selectedBtnStyle}
                selectedButtonTextStyle={styles.selectedTextStyle}
                unSelectedTextStyle={styles.unSelectedTextStyle}
              />
            </PermissionComponent>
          )}
        </BigBlueHeader>
        <OfflineNotice />
        {segmentValue === Selection.Quotes ? (
          <QuotesListComponent selectedQuote={selectedQuoteToSend} setSelectedQuoteToSend={setSelectedQuoteToSend} />
        ) : (
          <JobsListComponent />
        )}
      </AnimationProvider>
    </>
  );
};

export default withAppender(safeRender(JobsContainer, navigationalScreens.JobsScreen));
