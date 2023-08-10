import React from "react";
import MainContainer from "~root/Components/MainContainer";
import { navigationalScreens } from "~root/Lib/BranchHelper";
import { safeRender } from "~root/Provider/Appender";
import FulfilmentDetailsHeader from "./FulfilmentContentHeader";
import FulfilmentContentView from "./FulfilmentContentView";

const FulfilmentDetailsContainer = () => {
  return (
    <MainContainer>
      <FulfilmentDetailsHeader />
      <FulfilmentContentView />
    </MainContainer>
  );
};

export default safeRender(FulfilmentDetailsContainer, navigationalScreens.DeliveryOptionDetailsScreen);
