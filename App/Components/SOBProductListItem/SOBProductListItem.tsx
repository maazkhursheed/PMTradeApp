import firebase from "@react-native-firebase/app";
import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import CustomIcon from "~root/Components/CustomIcon";
import NewQuantitySelector from "~root/Components/NewQuantitySelector/NewQuantitySelector";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import PriceComponent from "~root/Components/PriceComponent";
import ProductStockStatus from "~root/Components/ProductStockStatus";
import QuotesProductTabView from "~root/Components/QuotesProductTabView/QuotesProductTabView";
import TimberLength from "~root/Components/TimberLength";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { getBranchTownRegion } from "~root/Lib/BranchHelper";
import { accessibility, getJobItemSanitizedObj, getSelectedAccountId, isTimberFlag, showRelatedToast } from "~root/Lib/DataHelper";
import { decodeJWTToken, extractDigitalIdFromJWTPayload } from "~root/Lib/LoginHelper";
import { getSpecialFromSanitizeData, getStock } from "~root/Lib/ProductHelper";
import { RootState } from "~root/Reducers";
import { ProductActions } from "~root/Reducers/ProductReducers";
import { Colors, Images } from "~root/Themes";
import { PermissionTypes } from "~root/Types/Permissions";
import { SpecialProductStatus, useCashCustomerStatus } from "../../Lib/QuoteHelper";
import SpecialOrderStatus from "../SpecialOrderProductStatus/SpecialOrderProductStatus";
import styles from "./SOBProductListItemStyles";

interface OwnProps extends TouchableOpacityProps {
  item: any;
  onFocus?: () => void;
  isLoading?: boolean;
  estimateNumber: string;
  index?: number;
}

interface DispatchProps {
  updateCart?: (payload: any, meta: IAlertCallbacks) => void;
}

interface StateProps {
  digitalId: any;
  selectedAccountId: any;
  selectedBranch: any;
  selectedJobAccount: any;
  userId: any;
  state: any;
}

type Props = OwnProps & DispatchProps & StateProps;

const renderDescription = (item: any, CashCustomerStatus: boolean) => {
  return (
    <View style={styles.descriptionContainer}>
      {!!item.Brand && (
        <Text style={styles.brand} {...accessibility("productBrand")}>
          {item.Brand}
        </Text>
      )}
      <Text style={styles.productDescription} {...accessibility("productDescription")}>
        {item.ProductDescription}
      </Text>
      <View style={{ marginTop: 4, flexDirection: "row", alignItems: "baseline" }}>
        <PermissionComponent
          style={styles.priceContainer}
          hideView={true}
          permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
        >
          <PriceComponent ignorePermission={true} style={styles.productPrice} value={item.Price} ignorePOA={true} {...accessibility("productPrice")} />
          <Text style={styles.priceSlash}> / </Text>
        </PermissionComponent>
        <Text style={styles.priceUom} {...accessibility("productUom")}>
          {item.UOM}
        </Text>
        {SpecialProductStatus(item) && CashCustomerStatus ? (
          <SpecialOrderStatus isFromList={false} styleContainer={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} />
        ) : (
          <ProductStockStatus
            styleContainer={{ justifyContent: "flex-end", alignItems: "baseline", flex: 1 }}
            styleIcon={styles.stockStatusIcon}
            styleText={styles.stockStatusText}
            showTick={true}
            stock={getStock(item)}
            isSpecial={getSpecialFromSanitizeData(item)}
            isConstrained={item.PmExclusive}
          />
        )}
      </View>
    </View>
  );
};

const SOBProductListItem: React.SFC<Props> = ({
  item,
  onFocus,
  updateCart,
  estimateNumber,
  index,
  userId,
  state,
  selectedBranch,
  selectedJobAccount,
}: Props) => {
  const route = useRoute();
  const [quantity, setQuantity] = React.useState("1");
  const image = item.Image === "" ? Images.safetyCone : { uri: item.Image };
  const { CashCustomerStatus } = useCashCustomerStatus();
  const sendJobAddItemAnalytics = (event: any) => {
    const params = {
      event,
      feature_type: "Job",
      userId: extractDigitalIdFromJWTPayload(decodeJWTToken(userId)) as string,
      accountId: getSelectedAccountId(state),
      branch: selectedBranch.branchName,
      branchId: selectedBranch.branchID,
      jobId: selectedJobAccount ? selectedJobAccount.JobId : "",
      job_date: "",
      job_expiry: "",
      job_stage: "",
      location: getBranchTownRegion(selectedBranch),
      itemList: item,
      index,
    };
    const eventLogObject = getJobItemSanitizedObj(params);
    firebase.analytics().logEvent(event, eventLogObject);
  };

  return (
    <View style={styles.containerLineItemEstimatedList}>
      <QuotesProductTabView
        style={styles.marginBottom}
        alternateProductCount={item?.alternateProductCount ?? 0}
        relatedProductCount={item?.relatedProductCount ?? 0}
        sku={item?.SKU}
      />
      <View style={[styles.containerLineItem, { borderBottomColor: Colors.white }]} {...accessibility("productListItem")}>
        <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
        {renderDescription(item, CashCustomerStatus)}
      </View>
      <PermissionComponent hideView={true} permissionTypes={[PermissionTypes.PlaceOrders, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}>
        <View style={styles.buttonsContainer}>
          <NewQuantitySelector
            style={styles.quantitySelectorStyle}
            uom={item.uomFormat}
            estimatedQuantity={item.EstimatedQuantity}
            onBlur={e => {
              if (Number(quantity) === 0) {
                setQuantity("1");
              }
            }}
            isTimber={isTimberFlag(item)}
            quantity={quantity}
            onFocus={onFocus}
            onChange={(quantity1, fromIcon) => {
              if (fromIcon && Number(quantity1) === 0) {
                setQuantity(quantity1);
                setTimeout(() => setQuantity("1"), 0);
              } else {
                setQuantity(quantity1);
              }
            }}
          />
          <TouchableOpacity
            style={styles.addToCartEstimatedProduct}
            onPress={() => {
              updateCart?.(
                { entry: item, quantity, isUpdate: false, estimateNumber },
                {
                  onSuccess: () => showRelatedToast(item?.relatedProductCount ?? 0, item?.SKU),
                },
              );
              sendJobAddItemAnalytics("add_to_cart");
            }}
          >
            <View {...accessibility("productAddToCart")}>
              <CustomIcon name={"add-to-cart"} style={styles.iconStyle} {...accessibility("productAddToCart")} />
            </View>
          </TouchableOpacity>
        </View>
        <TimberLength
          style={styles.rowView}
          bottomViewStyle={styles.trimBottomRowView}
          trimLengthText={"Selected trim length"}
          isTimberFlag={isTimberFlag(item)}
          multiple={item.SelectedMultiple}
          uom={item.UOM}
          quantity={quantity}
        />
      </PermissionComponent>
    </View>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  updateCart: (payload, meta) => dispatch(ProductActions.cartChange(payload, meta)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  selectedJobAccount: state.jobAccounts.selectedJobAccount,
  selectedBranch: state.branchList?.selectedBranch,
  userId: state.login?.tempToken?.idToken,
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(SOBProductListItem);
