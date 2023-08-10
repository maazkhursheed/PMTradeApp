import * as R from "ramda";
import React from "react";
import { ViewProps } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "~root/Reducers";

interface OwnProps extends ViewProps {
  featureKey: FeatureKeys;
}

/**
 * @param featureKey Key name provided in Remote config
 * @param children
 *
 * Use this like in the example below
 * <FeatureContainer featureKey="feature">
 *   <Text>Any child</Text>
 * </FeatureContainer>
 */
export const useFeatureToggle = (feature: FeatureKeys) => {
  const [featureToggle, setFeatureToggle] = React.useState(true);

  const featureToggleStatus = useSelector((state: RootState) => state.appDetail.featureToggle);

  React.useEffect(() => {
    setFeatureToggle(!R.path([feature, "hideView"], featureToggleStatus));
  }, [featureToggleStatus]);

  return featureToggle;
};

export const useFeatureToggleChangeNotifier = (feature: FeatureKeys, notifierCallback: (toggleStatus: boolean) => void) => {
  const [featureToggle, setFeatureToggle] = React.useState(true);

  const featureToggleStatus = useSelector((state: RootState) => state?.appDetail?.featureToggle);
  React.useEffect(() => {
    const featToggle = !R.path([feature, "hideView"], featureToggleStatus);
    setFeatureToggle(featToggle);
    if (featToggle !== featureToggle) {
      notifierCallback(featToggle);
    }
  }, [featureToggleStatus]);
};

export enum FeatureKeys {
  QuotesSelector = "Quotes selection",
}
