import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LabourCostTypeItem from "~root/Components/LabourCostTypeItem/LabourCostTypeItem";
import LoadingView from "~root/Components/LoadingView";
import MainContainer from "~root/Components/MainContainer";
import SmallHeader from "~root/Components/SmallHeader";
import { RootState } from "~root/Reducers";
import { LabourCostType } from "~root/Types/LabourSection";
import LabourSectionFooter from "../../Components/LabourSectionFooter/LabourSectionFooter";
import { IAlertCallbacks } from "../../Lib/AlertsHelper/index";
import { QuotesActions } from "../../Reducers/QuotesReducer/index";
import styles from "./LabourSectionContainerStyle";

export interface OwnProps {}

export interface DispatchProps {
  requestLabourCost: (payload: any, alertCallbacks: IAlertCallbacks) => void;
}

interface StateProps {
  isLoading: boolean;
  quoteId: any;
}

type Props = OwnProps & DispatchProps & StateProps;

const LabourSectionContainer: React.SFC<Props> = ({}: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { quoteId, isLoading } = useSelector((state: RootState) => ({
    quoteId: state.quotes?.quotesListDetails,
    isLoading: state.quotes?.fetching,
  }));

  React.useEffect(() => {
    dispatch(QuotesActions.requestLabourCost({ quoteId: quoteId?.code, costType: LabourCostType.Labour }, {}));
  }, []);

  return (
    <>
      <MainContainer style={styles.container}>
        <SmallHeader title={"Labour & other costs"} navigation={navigation} />
        <LoadingView isLoading={isLoading} style={styles.loadingView}>
          <View style={styles.itemsContainer}>
            <LabourCostTypeItem costType={LabourCostType.Labour} />
            <LabourCostTypeItem costType={LabourCostType.SubContractor} />
            <LabourCostTypeItem costType={LabourCostType.Overheads} />
            <LabourCostTypeItem costType={LabourCostType.OtherCosts} />
          </View>
        </LoadingView>
        <LabourSectionFooter />
      </MainContainer>
    </>
  );
};

export default LabourSectionContainer;
