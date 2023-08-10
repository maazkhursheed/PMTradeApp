import { Button } from "native-base";
import * as React from "react";
import { Keyboard, KeyboardEvent, Platform, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import { useCustomAlert } from "~root/Components/CustomAlert/CustomAlert";
import CustomIcon from "~root/Components/CustomIcon";
import FbIcon from "~root/Components/FbIcon";
import NotificationsSwitchSheet from "~root/Components/NotificationsSwitchSheet/NotificationsSwitchSheet";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { getTrimmedUserName } from "~root/Lib/CommonHelper";
import { accessibility, addOcclusionForTextFields, occludeSensitiveView, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { isNotificationOn } from "~root/Lib/NotificationsHelper";
import { formatPhoneNumber, getInitials, isFormValid, stripNonNumbers } from "~root/Lib/StringHelper";
import { RootState } from "~root/Reducers";
import { Colors, Fonts } from "~root/Themes";
import ContactInfoItem from "../ContactInfoItem/ContactInfoItem";
import styles from "./ContactDetailsSwitchSheetStyles";
interface OwnProps {
  sheetState: SheetState;
  navigation: any;
  closeSheet: (isCloseAll: boolean) => void;
  contact: any;
  onContactSelect: (selectedContact: any) => void;
  onContactSave: (selectedContact: any) => void;
  courierOrder?: boolean;
  isEditable?: boolean;
}

interface DispatchProps {}

interface StateProps {
  orderType: OrderTypes;
}

type Props = OwnProps & StateProps & DispatchProps;
const SINGLE_INPUT_FIELD_HEIGHT = 90;
const ContactDetailsSwitchSheet: React.SFC<Props> = ({
  navigation,
  sheetState,
  closeSheet,
  contact,
  onContactSelect,
  courierOrder,
  isEditable,
  onContactSave,
  orderType,
}: Props) => {
  const [notificationsSheet, setNotificationsSheet] = React.useState(SheetState.CLOSED);
  const [contactData, setContactData] = React.useState(contact);
  const [firstName, setFirstName] = React.useState(contact?.firstName);
  const [lastName, setLastName] = React.useState(contact?.lastName);
  const [email, setEmail] = React.useState(contact?.mail);
  const [mobile, setMobile] = React.useState(contact?.mobile);
  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const mobileRef = React.useRef();
  const emailRef = React.useRef();

  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [hiddenFieldsHeight, setHiddenFieldsHeight] = React.useState(0);
  const { dispatchAlert } = useCustomAlert();

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardHeight(e.endCoordinates.height);
  }

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      if (contact) {
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setEmail(contact.mail);
        setMobile(contact.mobile);
      }
      setContactData(contact);
      if (isEditable && firstNameRef.current) {
        firstNameRef.current.focus();
      }
    }
  }, [sheetState]);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    return keyboardDidShowListener.remove;
  }, []);

  React.useEffect(() => {
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Contact Details Screen");
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const closeSheetTapped = () => {
    const discard = () => {
      removeOcclusionFromTextFields();
      Keyboard.dismiss();
      closeSheet(false);
    };
    if (isEditable) {
      dispatchAlert?.({
        visible: true,
        heading: "Confirm Discard",
        msg: "Are you sure you want to discard this new contact?",
        button1Text: "Discard",
        onButton1Press: () => {
          dispatchAlert?.({ visible: false });
          discard();
        },
        button2Text: "Keep Editing",
        onButton2Press: () => dispatchAlert?.({ visible: false }),
      });
    } else {
      discard();
    }
  };

  const selectTapped = () => {
    Keyboard.dismiss();
    if (isEditable) {
      contactData.firstName = firstName;
      contactData.lastName = lastName;
      contactData.mobile = stripNonNumbers(mobile);
      contactData.mail = email;
      onContactSave(contactData);
    } else {
      closeSheet(true);
      setTimeout(() => onContactSelect(contactData), 100);
    }
  };

  const isDisabled = () => {
    return isEditable && !isFormValid(firstName, mobile, email);
  };

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={isEditable ? "New Contact" : lastName ? firstName + " " + lastName : firstName}
              titleStyle={styles.titleStyle}
              style={[
                styles.headerStyle,
                {
                  backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button transparent={true} onPress={closeSheetTapped} {...accessibility("leftItemBtn")}>
                  <FbIcon name={"ic_back"} style={styles.close} />
                </Button>
              }
              rightItem={
                <Button transparent={true} onPress={selectTapped} {...accessibility("rightItemBtn")} disabled={isDisabled()}>
                  <Text
                    style={{
                      ...Fonts.style.openSans16,
                      marginRight: 18,
                      color: isDisabled() ? Colors.darkGrey : Colors.lightBlue,
                    }}
                  >
                    {isEditable ? "Save" : "Select"}
                  </Text>
                </Button>
              }
              uxCamTitleHide={isEditable ? false : true}
            />
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps={"handled"}
              style={styles.contentContainer}
              extraScrollHeight={Platform.select({ android: 0, ios: 50 })}
            >
              <View>
                <Text ref={occludeSensitiveView} style={styles.initials}>
                  {getInitials(getTrimmedUserName(firstName, lastName))}
                </Text>
                <TouchableOpacity style={styles.btnCamera}>
                  <CustomIcon name={"camera"} style={styles.cameraIcon} />
                </TouchableOpacity>
              </View>
              <ContactInfoItem
                inputRef={firstNameRef}
                label={"First Name"}
                editable={isEditable}
                value={firstName}
                onChangeText={setFirstName}
                onClearInput={() => setFirstName("")}
                onFocus={Platform.OS === "android" ? () => setHiddenFieldsHeight(SINGLE_INPUT_FIELD_HEIGHT * 3) : undefined}
              />
              <ContactInfoItem
                inputRef={lastNameRef}
                label={"Last Name"}
                editable={isEditable}
                value={lastName}
                onChangeText={setLastName}
                onClearInput={() => setLastName("")}
                onFocus={Platform.OS === "android" ? () => setHiddenFieldsHeight(SINGLE_INPUT_FIELD_HEIGHT * 2) : undefined}
              />
              <ContactInfoItem
                inputRef={emailRef}
                label={"Email"}
                editable={isEditable}
                value={email}
                onChangeText={setEmail}
                onClearInput={() => setEmail("")}
                keyboardType={"email-address"}
                onFocus={Platform.OS === "android" ? () => setHiddenFieldsHeight(SINGLE_INPUT_FIELD_HEIGHT) : undefined}
              />
              <ContactInfoItem
                inputRef={mobileRef}
                label={"Phone"}
                editable={isEditable}
                value={isEditable ? mobile : formatPhoneNumber(mobile)}
                onChangeText={setMobile}
                onClearInput={() => setMobile("")}
                onFocus={Platform.OS === "android" ? () => setHiddenFieldsHeight(0) : undefined}
                keyboardType={"phone-pad"}
              />
              {!courierOrder && (
                <View>
                  <View style={styles.separator} />
                  {!isEditable && (
                    <View>
                      <Text style={styles.headerTitle}>{"Notification settings"}</Text>
                      <View style={styles.subSeparator} />
                      <TouchableOpacity style={styles.viNotification} onPress={() => setNotificationsSheet(SheetState.EXPANDED)}>
                        <View style={styles.viRow}>
                          <CustomIcon name={"notification-icon"} style={styles.notificationIcon} />
                          <Text style={styles.notificationTextStyle}>{"Notifications"}</Text>
                        </View>
                        <View style={styles.viRow}>
                          <Text
                            style={[
                              styles.itemValue,
                              {
                                marginRight: 8,
                                color: isNotificationOn(orderType, contactData?.smsFlags) ? Colors.greenCheck : Colors.darkRed,
                              },
                            ]}
                          >
                            {isNotificationOn(orderType, contactData?.smsFlags) ? "On" : "Off"}
                          </Text>
                          <CustomIcon name={"chevron-right"} style={styles.rightIcon} />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.subSeparator} />
                      <Text style={styles.txtDesc}>
                        {
                          "Setup the notification types the contact will receive for Standard deliveries and Pickup, e.g: when the order is ready, on its way or changed."
                        }
                      </Text>
                      <TouchableOpacity style={styles.btnLearnMore}>
                        <Text style={styles.txtLearnMore}>{"Learn more"}</Text>
                        <CustomIcon name={"external-link"} style={styles.upArrow} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </KeyboardAwareScrollView>
            <NotificationsSwitchSheet
              navigation={navigation}
              sheetState={notificationsSheet}
              contact={contactData}
              onUpdateContact={(contactTemp: any) => {
                setContactData(contactTemp);
                setNotificationsSheet(SheetState.CLOSED);
              }}
            />
          </View>
        }
        sheetState={sheetState}
      />
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    orderType: state.branchList.selectedOrderType,
  };
};

export default connect(mapStateToProps)(ContactDetailsSwitchSheet);
