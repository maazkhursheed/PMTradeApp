import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import LabourSectionDetailContainer from "./LabourSectionDetailContainer";

const mockStore = configureMockStore();

const store = mockStore(require("~root/Containers/LabourSectionDetailContainer/LabourSectionDetailContainerTest.json"));

describe("Labour section UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <LabourSectionDetailContainer />
        </SafeAreaProvider>
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
