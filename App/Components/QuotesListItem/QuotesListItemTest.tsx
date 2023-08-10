import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import QuotesListItem from "./QuotesListItem";

const mockStore = configureMockStore();
const store = mockStore({});

const item = {
  quantity: 1,
  decimalQty: 2,
  product: {
    code: "3200038",
  },
};

jest.mock("~root/Components/SwiperComponent");

describe("MaterialsListItem UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <QuotesListItem item={item} />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });
});
