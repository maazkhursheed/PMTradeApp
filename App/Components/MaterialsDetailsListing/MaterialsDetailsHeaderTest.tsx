import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { MaterialsDetailsHeader } from "./MaterialsDetailsHeader";

const mockStore = configureMockStore();
const store = mockStore({});

describe("MaterialsDetailsHeader UI Testing", () => {
  const component = renderer.create(<Provider store={store}>{MaterialsDetailsHeader(1)}</Provider>).toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
