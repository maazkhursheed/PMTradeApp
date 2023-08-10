import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import CustomIcon from "~root/Components/CustomIcon";
import GenericToast from "./GenericToast";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Generic Toast UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <GenericToast
          internalStateText1={"Products added to cart"}
          getIconType={() => <CustomIcon name={"success"} />}
          toastType={"cart"}
          internalStateText2={""}
        />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
