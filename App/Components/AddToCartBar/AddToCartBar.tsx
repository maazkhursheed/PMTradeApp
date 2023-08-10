import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import PriceComponent from "~root/Components/PriceComponent";
import { accessibility } from "~root/Lib/DataHelper";
import { PermissionTypes } from "~root/Types/Permissions";
import NewListSheetContainer from "../NewListSheetContainer/NewListSheetContainer";
import styles from "./AddToCartBarStyle";

interface Props {
  quantity: number;
  item: any;
  subTotal: string;
  onUpdateCart: () => void;
}

const AddToCartBar: React.SFC<Props> = ({ subTotal, onUpdateCart, item }: Props) => {
  return (
    <View>
      <View style={[styles.container, styles.containerStyles]}>
        <View style={styles.styleFlexDirection}>
          <View style={styles.iconViewAddToList} {...accessibility("productAddToList")}>
            <NewListSheetContainer item={item}>
              <View {...accessibility("productAddToList")}>
                <CustomIcon name={"add-to-my-list"} style={styles.iconStyle} {...accessibility("productAddToList")} />
              </View>
            </NewListSheetContainer>
          </View>
          <TouchableOpacity style={styles.iconViewAddToCart} onPress={onUpdateCart} {...accessibility("productAddToCart")}>
            <Text style={styles.addToCartStyle}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subTotalViewStyle}>
          <Text {...accessibility("productSubTotalLabel")} style={styles.subTotalTextStyle}>
            Subtotal:{" "}
          </Text>
          <PriceComponent
            {...accessibility("productSubTotal")}
            style={styles.subTotalTextStyle}
            prefix={"NZ$"}
            value={subTotal}
            hideView={true}
            permissionTypes={[PermissionTypes.ViewPricing, PermissionTypes.UserAdmin, PermissionTypes.AccountOwner]}
          />
        </View>
      </View>
    </View>
  );
};

export default AddToCartBar;
