import * as React from "react";
import { Provider } from "react-redux";
import ShallowRenderer from "react-test-renderer/shallow";
import configureMockStore from "redux-mock-store";
import ContactItem from "./ContactItem";

let realUseContext;
// Setup mock
beforeEach(() => {
  realUseContext = React.useContext;
  useContextMock = React.useContext = jest.fn();
});
// Cleanup mock
afterEach(() => {
  React.useContext = realUseContext;
});
const mockStore = configureMockStore();
const store = mockStore({
  cart: {
    codeOfContactDeleting: {},
  },
  branchList: {
    selectedOrderType: {},
  },
});

describe("Contact Item UI Testing", () => {
  const component = new ShallowRenderer().render(
    <Provider store={store}>
      <ContactItem item={{}} />
    </Provider>,
  );
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
