import * as R from "ramda";
import * as React from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, tap } from "rxjs/operators";
import NewTextField from "~root/Components/NewTextField/NewTextField";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { RootState } from "~root/Reducers";
import { AddressActions } from "~root/Reducers/AddressReducers";
import { Fonts } from "~root/Themes";
import { occludeSensitiveView } from "../../Lib/DataHelper";
import LoadingView from "../LoadingView";
import { TextFieldProps } from "../TextField/TextField";
import style from "./AddressSelectComponentStyle";

interface OwnProps extends TextFieldProps {
  selectedAddress: string;
  onSelectAddress: (address: string) => void;
  focusedHeight?: number;
}

type Props = OwnProps;

const AddressSelectComponent: React.SFC<Props> = ({ focusedHeight, selectedAddress, onSelectAddress, ...props }: Props) => {
  const dispatch = useDispatch();
  const { addresses, fetchingAddress } = useSelector((state: RootState) => ({
    addresses: state?.address?.addressSuggestions || [],
    fetchingAddress: state?.address?.fetchingAddress,
  }));

  const [addressText, setAddressText] = React.useState(selectedAddress);
  const [isInputFocused, setInputFocused] = React.useState(false);
  const [addressSubject] = React.useState(new Subject<string>());
  React.useEffect(() => {
    if (isNotNilOrEmpty(selectedAddress)) {
      setAddressText(selectedAddress);
    }
  }, [selectedAddress]);
  React.useEffect(() => {
    addressSubject
      .pipe(
        tap(value => {
          if (value === "") {
            setAddressText(value);
            dispatch(AddressActions.clearAddress());
          }
        }),
        debounceTime(500),
        distinctUntilChanged(),
        // @ts-ignore
        filter(R.compose(R.gte(R.__, 3), R.length)),
      )
      .subscribe(next => {
        dispatch(
          AddressActions.requestAddress(next, {
            onFailure: () => {},
            onSuccess: () => {},
          }),
        );
        onSelectAddress("");
      });
    // dispatch(AddressActions.clearAddress());
  }, []);

  const onAddressChange = React.useCallback(
    (text: string) => {
      setAddressText(text);
      addressSubject.next(text);
      if (props.onChangeText) {
        props.onChangeText(text);
      }
    },
    [addressSubject],
  );

  const onSelectSuggestion = React.useCallback(address => {
    Keyboard.dismiss();
    setAddressText(address);
    onSelectAddress(address);
  }, []);

  const onFocus = React.useCallback(
    e => {
      setInputFocused(true);
      setAddressText("");
      if (props.onFocus) {
        props.onFocus(e);
      }
    },
    [props.onFocus],
  );
  const onBlur = React.useCallback(
    e => {
      setInputFocused(false);
      dispatch(AddressActions.clearAddress());
      if (props.onBlur) {
        props.onBlur(e);
      }
    },
    [props.onBlur],
  );
  return (
    <>
      <View style={{ height: focusedHeight }}>
        <NewTextField
          hideData={true}
          autoCorrect={false}
          {...props}
          onChangeText={onAddressChange}
          value={isInputFocused ? addressText : selectedAddress}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        <LoadingView isLoading={fetchingAddress && isInputFocused} style={style.suggestionsContainer}>
          {isInputFocused &&
            addresses.map(address => {
              return (
                <View ref={occludeSensitiveView} key={address} pointerEvents={"box-none"} style={{ opacity: 1 }}>
                  <TouchableOpacity onPress={() => onSelectSuggestion(address)}>
                    <Text ref={occludeSensitiveView} style={[style.addressSuggestionItem, Fonts.style.openSans16]} numberOfLines={1}>
                      {address}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </LoadingView>
      </View>
    </>
  );
};

export default AddressSelectComponent;
