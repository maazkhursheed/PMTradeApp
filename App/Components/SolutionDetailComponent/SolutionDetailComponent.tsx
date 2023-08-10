import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { RootState } from "~root/Reducers";
import { Benefits, BusinessManagement, InstalledSolutions, InStore, InteriorSolutions, Pricing, SupportAndApprentice } from "~root/Types/Solutions";
import FreeTrailerHire from "./SolutionDetailComponents/Benefits/FreeTrailerHire";
import PlaccemakersPlusRewardPoints from "./SolutionDetailComponents/Benefits/PlaccemakersPlusRewardPoints";
import PlacemakersServicePromise from "./SolutionDetailComponents/Benefits/PlacemakersServicePromise";
import GetInvoicesDailyWeeklyMonthly from "./SolutionDetailComponents/BusinessManagement/GetInvoicesDailyWeeklyMonthly";
import HazardoMembership from "./SolutionDetailComponents/BusinessManagement/HazardoMembership";
import NextMinuteApp from "./SolutionDetailComponents/BusinessManagement/NextMinuteApp";
import OnlineStatementAndInvoices from "./SolutionDetailComponents/BusinessManagement/OnlineStatementAndInvoices";
import SparkPhoneService from "./SolutionDetailComponents/BusinessManagement/SparkPhoneService";
import AluminiumJoinery from "./SolutionDetailComponents/InstalledSolutions/AluminiumJoinery";
import Electrical from "./SolutionDetailComponents/InstalledSolutions/Electrical";
import Foundations from "./SolutionDetailComponents/InstalledSolutions/Foundations";
import FrameAndTruss from "./SolutionDetailComponents/InstalledSolutions/FrameAndTruss";
import GarageDoors from "./SolutionDetailComponents/InstalledSolutions/GarageDoors";
import InstalledSolutionsComponent from "./SolutionDetailComponents/InstalledSolutions/InstalledSolutionsComponent";
import Landscaping from "./SolutionDetailComponents/InstalledSolutions/Landscaping";
import Paint from "./SolutionDetailComponents/InstalledSolutions/Paint";
import PinkBattsInsulation from "./SolutionDetailComponents/InstalledSolutions/PinkBattsInsulation";
import Roofing from "./SolutionDetailComponents/InstalledSolutions/Roofing";
import AbsoluteOrderVisibility from "./SolutionDetailComponents/InStore/AbsoluteOrderVisibility";
import CallAndCollect from "./SolutionDetailComponents/InStore/CallAndCollect";
import FastCourierServices from "./SolutionDetailComponents/InStore/FastCourierServices";
import LargeProductDelivery from "./SolutionDetailComponents/InStore/LargeProductDelivery";
import SiteServices from "./SolutionDetailComponents/InStore/SiteServices";
import SpecialOrderTracking from "./SolutionDetailComponents/InStore/SpecialOrderTracking";
import StoreLayoutDedicatedToTrade from "./SolutionDetailComponents/InStore/StoreLayoutDedicatedToTrade";
import Bathrooms from "./SolutionDetailComponents/InteriorSolutions/Bathrooms";
import Flooring from "./SolutionDetailComponents/InteriorSolutions/Flooring";
import Kitchens from "./SolutionDetailComponents/InteriorSolutions/Kitchens";
import Wardrobes from "./SolutionDetailComponents/InteriorSolutions/Wardrobes";
import EasyJobManagement from "./SolutionDetailComponents/Pricing/EasyJobManagement";
import Estimating from "./SolutionDetailComponents/Pricing/Estimating";
import OnlinePricing from "./SolutionDetailComponents/Pricing/OnlinePricing";
import ApprenticeCrew from "./SolutionDetailComponents/SupportAndApprentice/ApprenticeCrew";
import LBPCompliance from "./SolutionDetailComponents/SupportAndApprentice/LBPCompliance";
import PlaceMakersSkillsMaintainanceTrainingSeminar from "./SolutionDetailComponents/SupportAndApprentice/PlaceMakersSkillsMaintainanceTrainingSeminar";
import PlacemakersTradePortal from "./SolutionDetailComponents/SupportAndApprentice/PlacemakersTradePortal";
import UnderConstruction from "./SolutionDetailComponents/SupportAndApprentice/UnderConstruction";
import style from "./SolutionDetailComponentStyle";

interface OwnProps {
  solutionTitle: string;
  navigation: any;
}

interface IStateProps {
  selectedBranch: any;
}

type Props = OwnProps & IStateProps;

const SolutionDetailComponent: React.SFC<Props> = ({ solutionTitle, selectedBranch, navigation }: Props) => {
  const solutionDetails = () => {
    const phone = selectedBranch?.address?.phone;
    switch (solutionTitle) {
      // IN STORE
      case InStore.CallAndCollect:
        return <CallAndCollect branchPhone={phone} />;
      case InStore.SpecialOrderTracking:
        return <SpecialOrderTracking />;
      case InStore.FastCourierServices:
        return <FastCourierServices navigation={navigation} />;
      case InStore.LargeProductDelivery:
        return <LargeProductDelivery />;
      case InStore.AbsoluteOrderVisibility:
        return <AbsoluteOrderVisibility />;
      case InStore.SiteServices:
        return <SiteServices />;
      case InStore.StoreLayoutDedicatedToTrade:
        return <StoreLayoutDedicatedToTrade />;

      // BUSINESS MANAGEMENT
      case BusinessManagement.OnlineStatementAndInvoices:
        return <OnlineStatementAndInvoices />;
      case BusinessManagement.GetInvoicesDailyWeeklyMonthly:
        return <GetInvoicesDailyWeeklyMonthly branchPhone={phone} />;
      case BusinessManagement.NextMinuteApp:
        return <NextMinuteApp />;
      case BusinessManagement.HazardoMembership:
        return <HazardoMembership />;
      case BusinessManagement.SparkPhoneService:
        return <SparkPhoneService />;

      // Pricing & Estimates
      case Pricing.Estimating:
        return <Estimating />;
      case Pricing.OnlinePricing:
        return <OnlinePricing />;
      case Pricing.EasyJobManagement:
        return <EasyJobManagement />;

      // SupportAndApprentice
      case SupportAndApprentice.LBPCompliance:
        return <LBPCompliance />;
      case SupportAndApprentice.UnderConstruction:
        return <UnderConstruction />;
      case SupportAndApprentice.ApprenticeCrew:
        return <ApprenticeCrew />;
      case SupportAndApprentice.PlaceMakersSkillsMaintainanceTrainingSeminar:
        return <PlaceMakersSkillsMaintainanceTrainingSeminar />;
      case SupportAndApprentice.PlacemakersTradePortal:
        return <PlacemakersTradePortal />;

      // Benefits
      case Benefits.PlaccemakersPlusRewardPoints:
        return <PlaccemakersPlusRewardPoints />;
      case Benefits.FreeTrailerHire:
        return <FreeTrailerHire />;
      case Benefits.PlacemakersServicePromise:
        return <PlacemakersServicePromise />;

      // InstalledSolutions
      case InstalledSolutions.InstalledSolutions:
        return <InstalledSolutionsComponent branchPhone={phone} />;
      case InstalledSolutions.FrameAndTruss:
        return <FrameAndTruss />;
      case InstalledSolutions.Roofing:
        return <Roofing />;
      case InstalledSolutions.AluminiumJoinery:
        return <AluminiumJoinery />;
      case InstalledSolutions.GarageDoors:
        return <GarageDoors />;
      case InstalledSolutions.PinkBattsInsulation:
        return <PinkBattsInsulation />;
      case InstalledSolutions.Electrical:
        return <Electrical />;
      case InstalledSolutions.Foundations:
        return <Foundations />;
      case InstalledSolutions.Landscaping:
        return <Landscaping />;
      case InstalledSolutions.Paint:
        return <Paint />;

      // InteriorSolutions
      case InteriorSolutions.Bathrooms:
        return <Bathrooms />;
      case InteriorSolutions.Kitchens:
        return <Kitchens />;
      case InteriorSolutions.Wardrobes:
        return <Wardrobes />;
      case InteriorSolutions.Flooring:
        return <Flooring />;

      default:
        return <Text style={style.textStyle}>Not Found</Text>;
    }
  };

  return <View style={style.solutionDetailsView}>{solutionDetails()}</View>;
};

const mapStateToProps = (state: RootState): IStateProps => ({
  selectedBranch: state.branchList.selectedBranch,
});

export default connect(mapStateToProps)(SolutionDetailComponent);
