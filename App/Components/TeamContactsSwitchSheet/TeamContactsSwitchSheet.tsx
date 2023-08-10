import { Button, Icon } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { Keyboard, SectionList, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import ContactDetailsSwitchSheet from "~root/Components/ContactDetailsSwitchSheet/ContactDetailsSwitchSheet";
import ContactItem from "~root/Components/ContactItem";
import LoadingView from "~root/Components/LoadingView";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { OrderTypes, SMSFlags } from "~root/Lib/BranchHelper";
import { accessibility, addOcclusionForTextFields, occludeSensitiveView, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { ContactStreamlineAction } from "~root/Reducers/ContactStreamlineReducers";
import { Colors } from "~root/Themes";
import styles from "./TeamContactsSwitchSheetStyles";

interface OwnProps {
  sheetState: SheetState;
  navigation: any;
  closeSheet: () => void;
  onContactSelect: (selectedContact: any) => void;
}

interface DispatchProps {
  saveContact: (payload: any) => void;
}

interface StateProps {
  contacts: any;
  orderType: OrderTypes;
}

type Props = OwnProps & StateProps & DispatchProps;

const TeamContactsSwitchSheet: React.SFC<Props> = ({ navigation, sheetState, closeSheet, contacts, onContactSelect, orderType, saveContact }: Props) => {
  const [sheetStateInternal, setSheetStateInternal] = React.useState(sheetState);
  const [searchTxt, setSearchTxt] = React.useState("");
  const [selectedContactObj, setSelectedContactObj] = React.useState(undefined);
  const [isContactEditable, setContactEditable] = React.useState(false);
  const [contactDetailsSheet, setContactDetailsSheet] = React.useState(SheetState.CLOSED);
  const [contactsList, setContactsList] = React.useState([]);

  React.useEffect(() => {
    setSheetStateInternal(sheetState);
    if (sheetState === SheetState.EXPANDED) {
      prepareContactsList(contacts);
    }
  }, [sheetState, contacts]);

  React.useEffect(() => {
    if (sheetStateInternal === SheetState.EXPANDED) {
      tagScreenName("Team Contacts Screen");
      addOcclusionForTextFields();
    }
  }, [sheetStateInternal]);

  const prepareContactsList = (contactObj: any) => {
    if (contactObj?.length > 0) {
      const byName = R.ascend(R.compose(R.toLower, R.prop("firstName")));
      const temp = R.sort(byName, contactObj);
      const temp1 = temp.reduce((r, e) => {
        const title = `${e.firstName[0]}`.toUpperCase();
        if (!r[title]) {
          r[title] = { title, data: [e] };
        } else {
          r[title].data.push(e);
        }
        return r;
      }, {});
      setContactsList(Object.values(temp1));
    } else {
      setContactsList([]);
    }
  };

  const closeSheetTapped = () => {
    Keyboard.dismiss();
    setSearchTxt("");
    closeSheet();
    setSheetStateInternal(SheetState.CLOSED);
    removeOcclusionFromTextFields();
  };

  const onContactSave = (contact: any) => {
    setContactEditable(false);
    setSearchTxt("");
    saveContact(contact);
  };
  const newTapped = async () => {
    await setSelectedContactObj({
      code: 0,
      firstName: "",
      lastName: "",
      mail: "",
      mailFlags: [],
      mobile: "",
      digitalId: "",
      smsFlags:
        orderType == OrderTypes.PICKUP
          ? [SMSFlags.READY_FOR_PICKUP]
          : orderType == OrderTypes.STANDARD
          ? [SMSFlags.LEFT_BRANCH, SMSFlags.MISSED_DELIVERY, SMSFlags.ON_ITS_WAY, SMSFlags.SCHEDULE_FOR_DELIVERY]
          : [],
    });
    setContactEditable(true);
    setContactDetailsSheet(SheetState.EXPANDED);
  };

  const renderContactItem = (contact: any) => {
    return (
      <View>
        <View style={styles.contactItemView}>
          <ContactItem
            item={contact.item}
            isSwipable={false}
            courierOrder={orderType === OrderTypes.EXPRESS}
            onContactSelect={onContactSelect}
            onContactTap={() => {
              setSelectedContactObj(contact.item);
              setContactDetailsSheet(SheetState.EXPANDED);
            }}
          />
        </View>
        {contact?.index === contact.section?.data?.length - 1 && <View style={styles.sectionSeparator} />}
      </View>
    );
  };

  const renderSectionHeader = (section: any) => {
    return (
      <View style={styles.parentBranchView}>
        <Text style={styles.parentBranch}>{section.title}</Text>
        <View style={styles.separator} />
      </View>
    );
  };

  const onChangeSearchTxt = (txt: string) => {
    setSearchTxt(txt);
    const temp = contacts?.filter((obj: any) => (obj.firstName + " " + obj.lastName).toLowerCase().includes(txt.toLowerCase()));
    prepareContactsList(temp);
  };

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.contentContainer}>
            <STCHeader
              title={"Team contacts"}
              titleStyle={styles.headerTitleStyle}
              style={[
                {
                  backgroundColor: sheetStateInternal === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
                },
              ]}
              leftItem={
                <Button transparent={true} onPress={closeSheetTapped} {...accessibility("leftItemBtn")}>
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
              rightItem={
                <Button transparent={true} onPress={newTapped} {...accessibility("rightItemBtn")}>
                  <Text style={styles.newTextStyle}>{"New"}</Text>
                </Button>
              }
            />
            <View style={styles.bottomOnlyShadowStyle}>
              <View style={styles.shadowStyle}>
                <View style={styles.inputContainerStyle}>
                  <TextInput
                    ref={occludeSensitiveView}
                    style={styles.inputStyle}
                    placeholder={"Search"}
                    onChangeText={text => onChangeSearchTxt(text)}
                    value={searchTxt}
                    placeholderTextColor={Colors.darkGrey}
                    selectionColor={Colors.lightBlue}
                  />
                  {searchTxt.length > 0 && (
                    <Button transparent={true} style={styles.closeBtn} onPress={() => onChangeSearchTxt("")} {...accessibility("clearText")}>
                      <Icon style={styles.closeIcon} type={"MaterialIcons"} name={"cancel"} />
                    </Button>
                  )}
                </View>
              </View>
            </View>
            <LoadingView style={styles.loadingView} isLoading={false}>
              <SectionList
                sections={contactsList}
                keyExtractor={(item, index) => item + index}
                renderItem={item => renderContactItem(item)}
                stickySectionHeadersEnabled={false}
                renderSectionHeader={({ section }) => renderSectionHeader(section)}
              />
            </LoadingView>
            <ContactDetailsSwitchSheet
              navigation={navigation}
              sheetState={contactDetailsSheet}
              closeSheet={isCloseAll => {
                setContactEditable(false);
                setContactDetailsSheet(SheetState.CLOSED);
                if (isCloseAll) {
                  setSearchTxt("");
                  closeSheet();
                  setSheetStateInternal(SheetState.CLOSED);
                }
              }}
              isEditable={isContactEditable}
              contact={selectedContactObj}
              onContactSelect={onContactSelect}
              onContactSave={onContactSave}
              courierOrder={orderType === OrderTypes.EXPRESS}
            />
          </View>
        }
        sheetState={sheetStateInternal}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  saveContact: payload => dispatch(ContactStreamlineAction.saveContact(payload)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  contacts: state.contactStreamline.contactList,
  orderType: state.branchList.selectedOrderType,
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamContactsSwitchSheet);
