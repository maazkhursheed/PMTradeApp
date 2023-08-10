import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { RootState } from "~root/Reducers";
import { PermissionTypes } from "~root/Types/Permissions";
import CustomIcon from "../../Components/CustomIcon";
import { CARTAGE_DISCLOSURE_HEADING, DISCLOSURE_TEXT_CART_CARTAGE } from "../../Lib/AlertsHelper";
import styles from "./ReviewScreenStyle";

interface OwnProps {
  isPayNow: boolean;
}

const DeliveryCharges: React.SFC = ({ isPayNow }: OwnProps) => {
  const {
    orderType,
    entriesSite,
    dspCharges,
    additionalCharges,
    cartData,
    truckCharges,
    freightAgreementDescription,
    additionalChargesValue,
    dspChargesValue,
    totalDeliveryCost,
  } = useSelector((state: RootState) => ({
    orderType: state.branchList.selectedOrderType,
    cartData: state.cart,
    entriesSite: state?.cart.siteRequirements,
    dspCharges: state.cart.userCartDetail?.dspCharges?.formattedValue || "",
    dspChargesValue: state.cart.userCartDetail?.dspCharges?.value || 0,
    additionalCharges: state.cart.userCartDetail?.siteCharges?.formattedValue || "",
    additionalChargesValue: state.cart.userCartDetail?.siteCharges?.value || 0,
    freightAgreementDescription: state.cart.userCartDetail?.freightAgreementDescription || "",
    truckCharges: state?.cart?.userCartDetail?.truckCharges,
    totalDeliveryCost: state.cart?.userCartDetail?.deliveryCost?.value || 0,
  }));

  return (
    orderType === OrderTypes.STANDARD && (
      <>
        <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
          {!isPayNow && <View style={styles.lineSeparator} />}
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliveryText}>{"Cartage"}</Text>
            {cartData?.userCartDetail?.freightCalculated === false ? (
              <View style={styles.headerRowInstructionsCartage}>
                <CustomIcon style={styles.infoIconCartage} name={"info"} />
                <View style={styles.innerView}>
                  <Text style={styles.messageHeader}>{CARTAGE_DISCLOSURE_HEADING}</Text>
                  <Text style={styles.disclosureText}>{DISCLOSURE_TEXT_CART_CARTAGE}</Text>
                </View>
              </View>
            ) : (
              <>
                {freightAgreementDescription !== "" && (
                  <>
                    <View style={styles.deliveryRow} />
                    <Text style={styles.deliveryText}>{"Freight Agreement: "}</Text>
                    <Text style={styles.freightAgreementText}>{freightAgreementDescription}</Text>
                  </>
                )}

                {dspChargesValue > 0 && (
                  <View style={styles.deliveryRow}>
                    <Text style={styles.dspText}>Standard charge (DSP): {cartData.requestTime}</Text>
                    <Text style={styles.dspText}>{dspCharges}</Text>
                  </View>
                )}

                {truckCharges?.value > 0 && (
                  <View style={styles.deliveryRow}>
                    <Text style={styles.dspText}>Truck: {cartData?.truckRequirements}</Text>
                    <Text style={styles.dspText}>{truckCharges?.formattedValue}</Text>
                  </View>
                )}

                {(additionalChargesValue > 0 || isPayNow) && (
                  <View style={styles.deliveryRow}>
                    <Text style={styles.dspText}>Additional charges:</Text>
                    <Text style={styles.dspText}>{additionalCharges}</Text>
                  </View>
                )}
                {isPayNow && (
                  <View style={styles.deliveryRow}>
                    <Text style={styles.dspText}>{`Extra Time on Site \nFront mount required`}</Text>
                  </View>
                )}
                {entriesSite?.length > 0 && <View style={styles.dividerSpace} />}
                {entriesSite?.map(val => {
                  return <Text style={styles.siteText}>{val}</Text>;
                })}
              </>
            )}
          </View>
        </PermissionComponent>
      </>
    )
  );
};

export default DeliveryCharges;
