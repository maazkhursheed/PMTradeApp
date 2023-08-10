import { StyleProvider } from "native-base";
import * as React from "react";
import { useReducer } from "react";
import { StatusBar, View } from "react-native";
import PushNotification from "react-native-push-notification";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert, { AlertContext, CustomAlertProps } from "~root/Components/CustomAlert/CustomAlert";
import GenericToastComponent from "~root/Components/GenericToastComponent";
import LoaderComponent from "~root/Components/LoaderComponent/LoaderComponent";
import ModalView from "~root/Components/ModalView/ModalView";
import { getModalContent } from "~root/Lib/AlertsHelper";
import { RootState } from "~root/Reducers";
import { AppActions } from "~root/Reducers/AppReducers";
import { Colors } from "~root/Themes";
import { ModalButtons } from "~root/Types/ComponentTypes/ModalView";
import getTheme from "../../../native-base-theme/components";
import material from "../../../native-base-theme/variables/material";
import ReduxPersist from "../../Config/ReduxPersist";
import ReduxNavigation from "../../Navigation/ReduxNavigation";
import { StartupActions } from "../../Reducers/StartupReducers";
// Styles
import styles from "./RootContainerStyles";

interface OwnProps {}

export interface State {
  modalVisible: boolean;
  modalLabel: string;
  modalContent: React.ReactElement | undefined;
  modalButton: ModalButtons[];
}

interface IStateProps {
  isModalVisible?: boolean;
  modalContent?: any;
}

interface IDispatchProps {
  startup: () => void;
  setModalErrorVisible: (val: boolean) => void;
}

type Props = OwnProps & IDispatchProps & IStateProps;

const toastConfig = {
  cartExtended: internalState => (
    <GenericToastComponent internalStateText1={internalState.text1} children={internalState.props.children} toastType={"cartExtended"} />
  ),
  quoteSuccess: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"quoteSuccess"} />,
  quoteFailure: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"quoteFailure"} />,
  cart: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"cart"} />,
  success: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"success"} />,
  warning: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"warning"} />,
  info: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"info"} />,
  greetings: internalState => (
    <GenericToastComponent internalStateText1={internalState.text1} internalStateText2={internalState.text2} toastType={"greetings"} />
  ),
  error: internalState => <GenericToastComponent internalStateText1={internalState.text1} internalStateText2={internalState.text2} toastType={"error"} />,
  inputError: internalState => (
    <GenericToastComponent internalStateText1={internalState.text1} internalStateText2={internalState.text2} toastType={"inputError"} />
  ),
};

const RootContainer: React.FC = ({ ...props }) => {
  const dispatch = useDispatch();
  const { isModalVisible, modalContent } = useSelector((state: RootState) => ({
    isModalVisible: state.appDetail.isVisible,
    modalContent: state.appDetail.modalContent,
  }));
  React.useEffect(() => {
    if (!ReduxPersist.active) {
      dispatch(StartupActions.startup());
    }
    PushNotification.createChannel({
      channelId: "fcm_fallback_notification_channel", // (required)
      channelName: "Placemakers-Trade-Notification", // (required)
    });
  }, []);
  const modalClose = React.useCallback(() => dispatch(AppActions.appError503Visibility(false)), []);

  const [propsAlert, dispatchAlert] = useReducer(
    (state: CustomAlertProps, action: any) => {
      if (action.visible) {
        return action;
      } else {
        return { visible: false };
      }
    },
    { visible: false },
  );

  return (
    <StyleProvider style={getTheme(material)}>
      <AlertContext.Provider value={{ dispatchAlert }}>
        <View style={styles.mainContainer}>
          <SafeAreaView style={styles.applicationView} />
          <StatusBar barStyle="light-content" backgroundColor={Colors.darkNewBlueHeader} />
          <ReduxNavigation />
          <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
          <LoaderComponent />
          <ModalView
            modalContent={getModalContent(modalContent)}
            title={"Message"}
            buttons={[{ color: Colors.red, text: "OK", onPress: modalClose }]}
            close={modalClose}
            visible={!!isModalVisible}
          />
          <CustomAlert {...propsAlert} />
        </View>
      </AlertContext.Provider>
    </StyleProvider>
  );
};

export default RootContainer;
