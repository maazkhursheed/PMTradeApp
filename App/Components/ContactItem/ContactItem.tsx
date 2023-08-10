import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import SwiperComponent from "~root/Components/SwiperComponent";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { getTrimmedUserName } from "~root/Lib/CommonHelper";
import { accessibility, occludeSensitiveView } from "~root/Lib/DataHelper";
import { isNotificationOn } from "~root/Lib/NotificationsHelper";
import { getInitials } from "~root/Lib/StringHelper";
import { useAppender } from "~root/Provider/Appender";
import { RootState } from "~root/Reducers";
import { SheetState } from "../BottomSheet/BottomSheet";
import ContactDetailsSwitchSheet from "../ContactDetailsSwitchSheet";
import LoadingView from "../LoadingView";
import RemoveButton from "../SwiperComponent/RemoveButton";
import styles from "./ContactItemStyles";

interface OwnProps {
  item: any;
  isSwipable: boolean;
  onContactTap: (contactObj: any) => void;
  onRemove?: (contactCode: string) => void;
  courierOrder?: boolean;
  onContactSelect: (selectedContact: any) => void;
}

interface IStateProps {
  codeOfContactDeleting: number;
  orderType: OrderTypes;
}

interface IDispatchProps {}

type Props = OwnProps & IDispatchProps & IStateProps;
const ContactItem: React.FunctionComponent<Props> = ({
  item,
  isSwipable,
  onContactTap,
  onRemove,
  onContactSelect,
  codeOfContactDeleting,
  courierOrder,
  orderType,
  style,
}: Props) => {
  const swipe = React.useRef(null);

  const removeFunctionality = () => {
    // tslint:disable-next-line:no-unused-expression
    onRemove ? onRemove(item.code) : undefined;
  };

  const { append } = useAppender();
  const [contactDetailsSheet, setContactDetailsSheet] = React.useState(SheetState.CLOSED);

  React.useEffect(() => {
    append(
      <ContactDetailsSwitchSheet
        sheetState={contactDetailsSheet}
        closeSheet={() => setContactDetailsSheet(SheetState.CLOSED)}
        contact={item}
        onContactSelect={onContactSelect}
        courierOrder={orderType === OrderTypes.EXPRESS}
        isEditable={false}
      />,
      "ContactDetailsSwitchSheet",
      0,
    );
  }, [contactDetailsSheet, item]);

  const renderContactView = () => {
    return courierOrder ? (
      <TouchableOpacity
        style={styles.listView}
        {...accessibility("contactList")}
        onPress={() => {
          if (onContactTap) {
            onContactTap(item);
          } else {
            setContactDetailsSheet(SheetState.EXPANDED);
          }
        }}
      >
        <View style={styles.rowView}>
          <View style={styles.profileBtn}>
            <Text ref={occludeSensitiveView} style={styles.profileBtnTxt}>
              {getInitials(getTrimmedUserName(item?.firstName, item?.lastName))}
            </Text>
          </View>
          <View style={styles.contactView}>
            <Text ref={occludeSensitiveView} style={styles.user}>
              {item?.firstName + " " + item?.lastName}
            </Text>
            <Text style={styles.subUser}>{""}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[styles.listView, style]}
        {...accessibility("contactList")}
        onPress={() => {
          if (onContactTap) {
            onContactTap(item);
          } else {
            setContactDetailsSheet(SheetState.EXPANDED);
          }
        }}
      >
        <View style={styles.rowView}>
          <View style={styles.profileBtn}>
            <Text ref={occludeSensitiveView} style={styles.profileBtnTxt}>
              {getInitials(getTrimmedUserName(item?.firstName, item?.lastName))}
            </Text>
          </View>
          <View style={styles.contactView}>
            <Text ref={occludeSensitiveView} style={styles.user}>
              {item?.lastName ? item?.firstName + " " + item?.lastName : item?.firstName}
            </Text>
            <Text style={styles.subUser}>{isNotificationOn(orderType, item?.smsFlags) ? "Notifications On" : "Notifications Off"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isSwipable) {
    return (
      <LoadingView isLoading={codeOfContactDeleting === item.code}>
        <SwiperComponent ref={swipe} onFullSwipe={removeFunctionality} backView={<RemoveButton onPress={removeFunctionality} />}>
          {renderContactView()}
        </SwiperComponent>
      </LoadingView>
    );
  } else {
    return renderContactView();
  }
};

const mapStateToProps = (state: RootState): IStateProps => {
  return {
    codeOfContactDeleting: state.cart.codeOfContactDeleting,
    orderType: state.branchList.selectedOrderType,
  };
};

export default connect(mapStateToProps)(ContactItem);
