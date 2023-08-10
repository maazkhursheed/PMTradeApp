import React from "react";
import CartGrayIcon from "~root/Images/cartGray/CartGrayIcon.svg";
import ConfirmationGrayIcon from "~root/Images/confirmationGray/ConfirmationGrayIcon.svg";
import DeliveryGrayIcon from "~root/Images/deliveryGray/DeliveryGrayIcon.svg";
import PaymentGrayIcon from "~root/Images/paymentGray/PaymentGrayIcon.svg";
import TrollyCartIcon from "~root/Images/trollyCart/TrollyCartIcon.svg";
import {
  SO1_DECSCRIPTION,
  SO1_TITLE,
  SO2_TITLE,
  SO3_DECSCRIPTION,
  SO3_TITLE,
  SO4_DECSCRIPTION,
  SO4_TITLE,
  SO5_DECSCRIPTION,
  SO5_TITLE,
} from "~root/Lib/AlertsHelper";
import CardSpecialInfo from "./CardSpecialInfo";

const dataArray = [
  {
    title: SO1_TITLE,
    description: SO1_DECSCRIPTION,
    ImageSource: TrollyCartIcon,
    showSpecialText: true,
    showMultipleIcons: false,
  },
  {
    title: SO2_TITLE,
    description: "",
    ImageSource: CartGrayIcon,
    showSpecialText: false,
    showMultipleIcons: false,
  },
  {
    title: SO3_TITLE,
    description: SO3_DECSCRIPTION,
    ImageSource: ConfirmationGrayIcon,
    showSpecialText: false,
    showMultipleIcons: false,
  },
  {
    title: SO4_TITLE,
    description: SO4_DECSCRIPTION,
    ImageSource: PaymentGrayIcon,
    showSpecialText: false,
    showMultipleIcons: false,
  },
  {
    title: SO5_TITLE,
    description: SO5_DECSCRIPTION,
    ImageSource: DeliveryGrayIcon,
    showSpecialText: false,
    showMultipleIcons: true,
  },
];

const SpecialOrderCard = () => {
  return dataArray.map((data, index) => (
    <CardSpecialInfo
      key={index}
      title={data.title}
      description={data.description}
      ImageSource={data.ImageSource}
      showSpecialText={data.showSpecialText}
      showMultipleIcons={data.showMultipleIcons}
    />
  ));
};

export default SpecialOrderCard;
