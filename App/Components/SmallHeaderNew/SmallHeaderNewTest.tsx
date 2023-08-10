import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import SmallHeaderNew from "./SmallHeaderNew";

const mockStore = configureMockStore();
const store = mockStore({});
const item = {
  title: "Alternative Products",
  subTitle: "Product that can be used in place of this item",
};

describe("Products availability item switch sheet UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <SmallHeaderNew title={item.title} subTitle={item.subTitle} />
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
