import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import { DISCLOSURE_TEXT_REVIEW } from "~root/Lib/AlertsHelper";
import EstimateProductDisclosure from "./EstimateProductDisclosure";

const mockStore = configureMockStore();
const store = mockStore({
  branchList: {
    selectedBranch: {},
  },
});
const entries = [
  {
    product: {
      specialProduct: true,
    },
  },
];

describe("SpecialProductDisclosure UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <EstimateProductDisclosure disClosureText={DISCLOSURE_TEXT_REVIEW} />
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
