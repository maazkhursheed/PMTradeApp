import { firebase } from "@react-native-firebase/analytics";
import { Button } from "native-base";
import * as R from "ramda";
import * as React from "react";
import { FlatList, Keyboard, Text, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, tap } from "rxjs/operators";
import BottomSheet from "~root/Components/BottomSheet";
import { SheetState } from "~root/Components/BottomSheet/BottomSheet";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { getFormattedAddresses } from "~root/Lib/CommonHelper";
import { accessibility, addOcclusionForTextFields, removeOcclusionFromTextFields, tagScreenName } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import { AddressActions } from "~root/Reducers/AddressReducers";
import { Colors, Fonts } from "~root/Themes";
import colors from "~root/Themes/Colors";
import CardSectionHeader from "../Card/CardSectionHeader";
import CustomIcon from "../CustomIcon";
import LoadingView from "../LoadingView";
import LocationItem from "../LocationItem";
import SearchField from "../SearchField";
import styles from "./AddressSelectSheetStyle";

interface OwnProps {
  sheetState: SheetState;
  closeAll: () => void;
  callback: any;
  requestGeoCode: (address: string) => void;
}

interface DispatchProps {
  requestAddress: (text: string) => void;
  clearAddress: () => void;
}

interface StateProps {
  addresses: string[];
  previouslyUsedAddresses: any[];
  fetchingAddress: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

const AddressSelectSheet: React.SFC<Props> = ({
  addresses,
  previouslyUsedAddresses,
  fetchingAddress,
  sheetState,
  closeAll,
  requestGeoCode,
  requestAddress,
  clearAddress,
}: Props) => {
  const [addressText, setAddressText] = React.useState("");
  const searchField = React.useRef(null);
  const [addressSubject] = React.useState(new Subject<string>());
  React.useEffect(() => {
    addressSubject
      .pipe(
        tap(value => {
          setAddressText(value);
          clearAddress();
        }),
        debounceTime(500),
        distinctUntilChanged(),
        filter(R.compose(R.gte(R.__, 3), R.length)),
      )
      .subscribe(next => {
        requestAddress(next);
      });
    clearAddress();
  }, []);

  React.useEffect(() => {
    if (sheetState === SheetState.CLOSED) {
      Keyboard.dismiss();
      removeOcclusionFromTextFields();
    }
    if (sheetState === SheetState.EXPANDED) {
      tagScreenName("Address Finder Screen");
      addOcclusionForTextFields();
    }
  }, [sheetState]);

  const onAddressChange = React.useCallback(
    (text: string) => {
      addressSubject.next(text);
    },
    [addressSubject],
  );

  return (
    <>
      <BottomSheet
        content={
          <View style={styles.container}>
            <STCHeader
              title={"Address Finder"}
              titleStyle={{ ...Fonts.style.openSans18Bold }}
              style={{
                backgroundColor: sheetState === SheetState.EXPANDED ? Colors.darkBlue : Colors.cloud,
              }}
              leftItem={
                <Button
                  transparent={true}
                  onPress={() => {
                    firebase.analytics().logEvent("element_click", {
                      element_name: "Done",
                      element_type: "icon",
                    });
                    closeAll();
                    removeOcclusionFromTextFields();
                  }}
                  {...accessibility("rightItemBtn")}
                >
                  <Text style={styles.cancelStyle}>{"Cancel"}</Text>
                </Button>
              }
            />
            <View style={styles.bottomOnlyShadowStyle}>
              <View style={styles.shadowStyle}>
                <SearchField
                  ref={searchField}
                  onChangeText={onAddressChange}
                  onClosePress={() => {
                    clearAddress();
                  }}
                  label={undefined}
                  value={addressText}
                  placeholder={"Search for address"}
                  placeholderTextColor={colors.darkGrey}
                  autoCorrect={false}
                  selectionColor={Colors.lightBlue}
                  isCustom={true}
                  returnKeyType={"search"}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  searchIcon={<CustomIcon name={"search"} style={styles.iconStyle} onPress={searchField?.current?.textInput?.focus} />}
                />
              </View>
            </View>
            <View style={styles.listContainerStyle}>
              {addressText === "" && previouslyUsedAddresses.length > 0 && <CardSectionHeader text={"Previously used"} style={styles.listHeaderStyle} />}
              <LoadingView isLoading={fetchingAddress} style={{ flex: 1 }}>
                <FlatList
                  data={addressText !== "" ? addresses : getFormattedAddresses(previouslyUsedAddresses)}
                  style={styles.listStyle}
                  renderItem={item => {
                    return <LocationItem item={item.item} onPress={() => requestGeoCode(item.item)} addressText={addressText} />;
                  }}
                />
              </LoadingView>
            </View>
          </View>
        }
        sheetState={sheetState}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestAddress: text => dispatch(AddressActions.requestAddress(text, undefined)),
  clearAddress: () => dispatch(AddressActions.clearAddress()),
});

const mapStateToProps = (state: RootState): StateProps => {
  return {
    addresses: state.address.addressSuggestions || [],
    previouslyUsedAddresses: state.address.previouslyUsedAddresses,
    fetchingAddress: state.address.fetchingAddress,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressSelectSheet);
