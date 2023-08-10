import { useNavigation, useRoute } from "@react-navigation/native";
import R from "ramda";
import * as React from "react";
import { Animated, Text, View } from "react-native";
import { connect } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import OfflineNotice from "~root/Components/OfflineNotice";
import ScrollAnimatedHeaderComponent from "~root/Components/ScrollAnimatedHeaderComponent";
import SmallHeader from "~root/Components/SmallHeader";
import StageOfBuildItem from "~root/Components/StageOfBuildItem";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { showJobSearchName } from "~root/Lib/JobAccountsHelper";
import { withAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { EstimatesActions } from "~root/Reducers/EstimatesReducer";
import { ApplicationStyles } from "~root/Themes";
import style from "./StagesOfBuildContainerStyle";
export interface DispatchProps {
  requestStagesOfBuildAPI: (payload: any, alertCallbacks: IAlertCallbacks) => void;
}

export interface StateProps {
  selectedJobAccountName: string;
  isLoading: boolean;
  data: any;
}

type Props = DispatchProps & StateProps;

const StagesOfBuildContainer: React.SFC<Props> = ({ selectedJobAccountName, requestStagesOfBuildAPI, isLoading, data }: Props) => {
  const [scrollY] = React.useState(new Animated.Value(0));
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [paddingTop, setPaddingTop] = React.useState(undefined);
  const navigation = useNavigation();
  const route = useRoute();
  React.useEffect(() => {
    requestStagesOfBuildAPI({ estimateNumber: route.params.estimateNumber }, {});
    let min = 0;
    let max = 60;
    const animationsDiffClamp = Animated.diffClamp(scrollY, min, max);
    const animatedPadding = animationsDiffClamp.interpolate({
      inputRange: [min, max],
      outputRange: [max, 0],
      extrapolate: "clamp",
    });
    setPaddingTop(animatedPadding);
  }, []);

  return (
    <MainContainer style={style.container}>
      <View style={style.headerContainer} onLayout={event => setHeaderHeight(event.nativeEvent.layout.height)}>
        <SmallHeader navigation={navigation} style={[ApplicationStyles.noShadow]} title={"Order by Stage of Build"} />
      </View>
      <ScrollAnimatedHeaderComponent scrollY={scrollY} style={{ marginTop: headerHeight, elevation: 8 }}>
        <View style={style.shadow}>
          <Text style={style.stagesOfBuildHeader}>Stages of Build for Job:</Text>
          <Text style={style.accountName} ref={occludeSensitiveView}>
            {selectedJobAccountName}
          </Text>
          <View style={style.infoTextContainer}>
            <CustomIcon name={"info"} style={style.infoIcon} />
            <Text style={style.infoText}>Select Stage of Build to order products</Text>
          </View>
          <OfflineNotice />
        </View>
      </ScrollAnimatedHeaderComponent>
      <Text style={[style.accountNameBold, style.shadow]}>{selectedJobAccountName}</Text>
      <LoadingView isLoading={isLoading} style={style.container}>
        <Animated.FlatList
          style={{ paddingTop: paddingTop }}
          contentContainerStyle={style.contentContainer}
          data={data}
          renderItem={item => {
            return <StageOfBuildItem item={item.item} estimateNumber={route.params?.estimateNumber} />;
          }}
          {...accessibility("StagesOfBuildFlatList")}
          bounces={false}
          onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
        />
      </LoadingView>
    </MainContainer>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  requestStagesOfBuildAPI: (payload, callback) => dispatch(EstimatesActions.requestEstimatesListById(payload, callback)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  selectedJobAccountName: state.jobAccounts?.selectedJobAccount
    ? showJobSearchName(state.jobAccounts.selectedJobAccount)
    : state.connectTrade?.selectedTradeAccount.name,
  isLoading: state.estimates?.fetching,
  data: R.pathOr([], ["estimates", "estimatesListById", "0", "section"], state),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAppender(StagesOfBuildContainer));
