import React from "react";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "~root/Components/ContactItem";
import { genericErrorMessage } from "~root/Lib/AlertsHelper";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { RootState } from "~root/Reducers";
import { CartActions } from "~root/Reducers/CartReducer";
import styles from "./FulfilmentDetailsContainerStyles";
export interface OwnProps {
  contact: any;
  selectContact: (selectedContact: any) => void;
}

type Props = OwnProps;

const FulfilmentContactItem: React.SFC<Props> = ({ contact, selectContact }: Props) => {
  const dispatch = useDispatch();

  const { orderType, cartDetailData } = useSelector((state: RootState) => ({
    orderType: state.branchList.selectedOrderType,
    cartDetailData: state.cart.userCartDetail,
  }));

  return (
    <ContactItem
      style={styles.contactView}
      key={contact.firstName}
      item={contact}
      isSwipable={orderType === OrderTypes.STANDARD && cartDetailData?.siteContacts?.length > 1}
      onRemove={contactCode => {
        dispatch(
          CartActions.deleteSiteContactDetails(contactCode, {
            onFailure: () => {
              Toast.show({
                text1: genericErrorMessage,
                type: "info",
                visibilityTime: 3000,
              });
            },
          }),
        );
      }}
      courierOrder={orderType === OrderTypes.EXPRESS}
      onContactSelect={(selectedContact: any) => selectContact(selectedContact)}
    />
  );
};

export default FulfilmentContactItem;
