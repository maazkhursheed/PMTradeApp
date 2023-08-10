import React from "react";
import { useSelector } from "react-redux";
import AddChangeContact from "~root/Components/AddChangeContact";
import { Card } from "~root/Components/Card";
import CardSectionHeader from "~root/Components/Card/CardSectionHeader";
import LoadingView from "~root/Components/LoadingView";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { RootState } from "~root/Reducers";
import FulfilmentContactItem from "./FulfilmentContactItem";
import styles from "./FulfilmentDetailsContainerStyles";

export interface OwnProps {
  selectContact: (selectedContact: any) => void;
}

type Props = OwnProps;

const FulfilmentContactView: React.SFC<Props> = ({ selectContact }: Props) => {
  const { orderType, contactLoader, cartDetailData } = useSelector((state: RootState) => ({
    orderType: state.branchList.selectedOrderType,
    cartDetailData: state.cart.userCartDetail,
    contactLoader: state.cart.fetchingContactInfo || state.cart.fetching,
  }));

  return (
    <>
      <Card style={{ ...styles.cardStyle, paddingHorizontal: 0 }}>
        <CardSectionHeader style={{ marginHorizontal: 18 }} text={orderType === OrderTypes.EXPRESS ? "Contact details" : "Contact notifications"} />
        <LoadingView isLoading={contactLoader} hideViewOnLoading={true} style={styles.loadingView}>
          <>
            {cartDetailData.siteContacts?.map((contact: any, index: { toString: () => React.Key | null | undefined }) => (
              <FulfilmentContactItem key={index.toString()} contact={contact} selectContact={selectedContact => selectContact(selectedContact)} />
            ))}
            {(!cartDetailData.siteContacts || cartDetailData?.siteContacts?.length < 4) && (
              <AddChangeContact orderType={orderType} onContactSelect={selectContact} />
            )}
          </>
        </LoadingView>
      </Card>
    </>
  );
};

export default FulfilmentContactView;
